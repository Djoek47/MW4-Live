-- MW4 LIVE — Supabase schema. Paste into SQL Editor and run once.
create extension if not exists "pgcrypto";

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Operator',
  gamertag text, platform text check (platform in ('ps5','xbox','pc')),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1))); return new; end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as
$$ select coalesce((select is_admin from public.profiles where id = auth.uid()), false) $$;

-- Clips sent in for the broadcast. consent_* records exactly what the sender agreed to, and when.
create table if not exists public.clips (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references public.profiles(id) on delete cascade,
  title text not null, gamertag text not null,
  platform text not null check (platform in ('ps5','xbox','pc')),
  mode text, -- Multiplayer / Warzone / Ranked / Zombies / Campaign
  storage_path text, source_url text,
  consent_owner boolean not null,           -- "this is my own gameplay"
  consent_broadcast boolean not null,       -- "MW4 Live may show it on stream, in reels and on socials"
  consent_at timestamptz not null default now(),
  status text not null default 'pending' check (status in ('pending','approved','rejected','aired')),
  reject_reason text, aired_at timestamptz,
  week date not null default date_trunc('week', now() at time zone 'America/Toronto')::date,
  created_at timestamptz not null default now(),
  check (consent_owner and consent_broadcast),
  check (storage_path is not null or source_url is not null)
);
create index if not exists clips_week_idx on public.clips(week, status);

-- Clip of the Week: one vote per account per week, movable
create table if not exists public.votes (
  week date not null, voter_id uuid not null references public.profiles(id) on delete cascade,
  clip_id uuid not null references public.clips(id) on delete cascade,
  created_at timestamptz not null default now(), primary key (week, voter_id)
);
create or replace view public.clip_scores as
  select c.*, coalesce(v.n,0)::int as votes from public.clips c
  left join (select clip_id, count(*) n from public.votes group by clip_id) v on v.clip_id = c.id;
create or replace function public.cast_vote(p_clip uuid) returns void language plpgsql security definer set search_path = public as $$
declare c public.clips;
begin
  if auth.uid() is null then raise exception 'Sign in to vote'; end if;
  select * into c from public.clips where id = p_clip and status in ('approved','aired');
  if c.id is null then raise exception 'That clip is not up for votes'; end if;
  if c.submitted_by = auth.uid() then raise exception 'You cannot vote for your own clip'; end if;
  insert into public.votes(week, voter_id, clip_id) values (c.week, auth.uid(), p_clip)
  on conflict (week, voter_id) do update set clip_id = excluded.clip_id, created_at = now();
end $$;

-- Guests / creators asking for a seat
create table if not exists public.guest_applications (
  id uuid primary key default gen_random_uuid(),
  applicant_id uuid references public.profiles(id) on delete set null,
  name text not null, handle text not null, platform_url text not null, followers text,
  pitch text not null, availability text, contact text not null,
  consent_record boolean not null,          -- agrees the appearance is recorded and replayed / clipped
  status text not null default 'new' check (status in ('new','contacted','booked','declined','aired')),
  booked_for timestamptz, show_slug text, notes text,
  created_at timestamptz not null default now(),
  check (consent_record)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.clips enable row level security;
alter table public.votes enable row level security;
alter table public.guest_applications enable row level security;
create policy "profile self" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "profile update self" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and is_admin = (select is_admin from public.profiles where id = auth.uid()));
create policy "clips public approved" on public.clips for select using (status in ('approved','aired') or submitted_by = auth.uid() or public.is_admin());
create policy "clips submit" on public.clips for insert with check (submitted_by = auth.uid() and status = 'pending');
create policy "clips admin" on public.clips for update using (public.is_admin());
create policy "votes self" on public.votes for select using (voter_id = auth.uid() or public.is_admin());
create policy "guests apply" on public.guest_applications for insert with check (status = 'new' and (applicant_id is null or applicant_id = auth.uid()));
create policy "guests own" on public.guest_applications for select using (applicant_id = auth.uid() or public.is_admin());
create policy "guests admin" on public.guest_applications for update using (public.is_admin());

-- Storage: private clip uploads, 500 MB
insert into storage.buckets (id, name, public, file_size_limit) values ('clips','clips', false, 524288000) on conflict do nothing;
create policy "clip upload own folder" on storage.objects for insert with check (bucket_id = 'clips' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "clip read own or admin" on storage.objects for select using (bucket_id = 'clips' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin()));
