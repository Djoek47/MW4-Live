# MW4 LIVE — The People's Broadcast

A 24/7 Modern Warfare 4 channel on Twitch, styled as a (fictional, very fake) state broadcaster.
21-day pilot: **Oct 29 – Nov 18, 2026**. Live shows 09 · 12 · 15 · 18 · 21 ET, labelled replays and highlight reels in between.

| Folder | What | Start here |
|---|---|---|
| `broadcast/` | OBS overlays (browser sources), scene collection, stream-PC setup | `broadcast/SETUP.md` |
| `montage/` | ffmpeg highlight-reel + vertical-shorts builder | `python montage/make_reel.py --help` |
| `brand/` | Avatars, banners, offline screen, panels for every platform | `brand/out/`, re-render: `python brand/render.py` |
| `socials/` | Bios, launch posts, Discord layout, chat commands | `socials/SOCIALS.md` |
| `ops/` | Tonight's checklist, daily loop, 21-day plan, guest consent, rights rules | `ops/RUNBOOK.md` |
| `src/`, `supabase/` | Website (Next.js 15, Tailwind 4, Supabase) | below |

## Website
Pages: `/` home with live Twitch player · `/watch` player + chat · `/schedule` Five-Show Plan by pilot day · `/shows` formats ·
`/clips` the People's Vote · `/submit` clip upload with recorded consent · `/guests` guest applications · `/about` terms + disclaimer ·
`/admin` control room (clip review with A/R/J/K keys, guest booking board) · `/login` Twitch/Discord/Google/email.

```bash
npm install
npm run dev        # http://localhost:3000 — runs in preview mode (sample data) without env vars
```

### Go live
1. **Supabase**: new project → SQL Editor → run `supabase/schema.sql`. Auth › Providers: Email, Twitch, Discord, Google.
   Auth › URL config: site URL = your domain; add `http://localhost:3000/**` and `https://*.vercel.app/**` to redirects.
2. **Env** (`.env.local` and Vercel): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_TWITCH_CHANNEL`, `NEXT_PUBLIC_SITE_URL`.
3. **Vercel**: import `Djoek47/MW4-Live`, framework Next.js (auto). Add the env vars. Deploy. Add the domain.
4. Sign in once, then make yourself staff: `update profiles set is_admin = true where id = (select id from auth.users where email = 'YOU');`

The Twitch embed passes the current hostname as `parent` automatically, so it works on localhost, previews and the real domain.

### Editing content
`src/lib/content.ts`: schedule, shows, 21-day topics, ticker, social links.
Keep `broadcast/config.js › schedule` in step with it (that one drives the on-stream graphics).

## Theme
Socialist-realist poster parody: cream paper, poster red, gold stars, sunburst rays, strict symmetry, deadpan "Ministry" copy.
Rules: fictional state only, no real leaders/flags/emblems, jokes aim at propaganda style, never at Korean people. Functional text (buttons, forms, rules) stays plain.

MW4 Live is fan-run and not affiliated with Activision.
