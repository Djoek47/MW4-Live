# MW4 LIVE — The People's Broadcast

A 24/7 Modern Warfare 4 channel on YouTube and/or Twitch, styled as a (fictional, very fake) state broadcaster.
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
2. **Env** (`.env.local` and Vercel, see `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
   - Streaming, one or both: `NEXT_PUBLIC_TWITCH_CHANNEL` (login name), `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` (the `UC…` ID). Both set → viewers get a Twitch/YouTube switch; `NEXT_PUBLIC_PRIMARY_PLATFORM` picks the default. Chat embeds on Twitch only (YouTube doesn't allow channel-level chat embeds).
   - `NEXT_PUBLIC_PILOT_START` (YYYY-MM-DD): Day 1 of the pilot. Move it if launch moved, so the site doesn't claim days that didn't air.
3. **Vercel**: import `Djoek47/MW4-Live`, framework Next.js (auto). Add the env vars. Deploy. Add the domain.
4. Sign in once, then make yourself staff: `update profiles set is_admin = true where id = (select id from auth.users where email = 'YOU');`

The Twitch embed passes the current hostname as `parent` automatically, so it works on localhost, Vercel previews and the real domain.

### Editing content
`src/lib/content.ts`: schedule, shows, 21-day topics, ticker, social links.
Keep `broadcast/config.js › schedule` in step with it (that one drives the on-stream graphics).

## Theme: three zones (`data-zone` in `src/app/globals.css`)
| Zone | Pages | Look |
|---|---|---|
| **Ops** | site frame, home, watch, schedule, about | Modern Warfare black + yellow: HUD brackets, hazard stripes, stencil type, grid coordinates, Task Force dog tags |
| **North** | clips, submit (and the left half of the home DMZ) | Propaganda poster parody: rays, gold stars, the state seal, "Ministry" copy |
| **South** | shows, guests (and the right half of the home DMZ) | Seoul at night: K-pop neon, lightsticks, variety-show caption stickers, ramyeon / kimchi / soju / tteokbokki |

The header toggle lights every zone up (day) or down (night); default is night because the frame is MW4 black.
Logos: unit patch `public/brand/patch.svg` (main logo, favicon, avatars; `python brand/patch.py`), state seal `public/brand/seal.svg` (North pages; `python brand/seal.py`). Re-render avatars with `python brand/render.py`.
No Activision logo or key art is used: the look borrows the game's colours and its Korea setting, not its trademarks.
Rules: the North is a fictional state (no real leaders, flags or emblems); the South celebrates pop culture, it doesn't mock it. Buttons, forms and rules stay plain.

MW4 Live is fan-run and not affiliated with Activision.
