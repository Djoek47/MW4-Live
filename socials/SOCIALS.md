# MW4 LIVE — Socials kit

**Handle everywhere:** `mw4livetv` (check it's free on all six before registering any; fallback `mw4livenet`).
If you change it, update `src/lib/content.ts › SOCIALS` and `broadcast/config.js › handle`.

Voice: a deadpan state broadcaster that is obsessed with Call of Duty. Jokes go in headlines and captions;
schedules, rules and calls to action stay plain. Never: real leaders, real flags or emblems, jokes about Korean
people, or anything that reads as endorsing an actual regime. The target is propaganda *style*, not a country.

## Assets (`brand/out/`, re-render with `python brand/render.py`)
| Platform | Profile picture | Banner / extras |
|---|---|---|
| Twitch | `avatar-1000x1000.png` (the state seal) | `twitch_banner-1200x480.png`, offline screen `twitch_offline-1920x1080.png`, panels `panel_*-320x100.png` |
| YouTube | `avatar-1000x1000.png` | `youtube_banner-2560x1440.png` (text sits in the 1546×423 safe zone) |
| X | `avatar-400x400.png` | `x_banner-1500x500.png` (logo offset right of the profile photo) |
| TikTok / Instagram | `avatar-400x400.png` | Reel/short end card `vertical_endcard-1080x1920.png` |
| Discord | `discord_icon-512x512.png` | `discord_banner-960x540.png` (needs Boost level 2 for a server banner) |
| Link previews | — | `og-1200x630.png` (already wired into the website) |

## Bios
**Twitch (About panel, 300 chars max):**
The People's Broadcast of Modern Warfare 4. On air 24/7: live shows at 09, 12, 15, 18 and 21 ET, labelled replays and community highlight reels in between. Send your clips, join the War Room, vote in the People's Vote. Fan-run parody, not affiliated with Activision.

**YouTube:**
The People's Broadcast of Modern Warfare 4. Full shows, interviews and the week's best community plays, archived from our 24/7 Twitch channel. New highlight reels daily. Fan-run, not affiliated with Activision or any actual government.

**X (160):**
★ The People's Broadcast of MW4 ★ Live 24/7 on Twitch · shows 09·12·15·18·21 ET · send your clips · fan-run parody, not affiliated w/ Activision

**TikTok (80):** ★ The People's Broadcast of MW4 ★ Full shows live on Twitch 24/7

**Instagram (150):** ★ The People's Broadcast of MW4 ★ 24/7 on Twitch · daily highlight reels · send your clips via the link · fan-run parody

## Launch posts (Day 1, Oct 29)
**X — pinned:**
> ATTENTION COMRADES.
> The People's Broadcast of Modern Warfare 4 begins today and does not stop for 21 days.
> Live shows 09 · 12 · 15 · 18 · 21 ET. Replays are labelled REPLAY. The Ministry does not lie about replays.
> twitch.tv/mw4livetv

**X — 21:00 go-live:** `🔴 PRIME TIME IS LIVE. Tonight: Launch Week Report. Your best clips on screen, chat decides the verdict. twitch.tv/mw4livetv`

**X — clip call (daily, 11:00):** `The Ministry of Highlights is accepting clips. Best play of the week opens Saturday's Prime Time. Submit → mw4live.com/submit`

**TikTok / Reels caption template:** `[WHAT HAPPENS] — clip by @[gamertag] ★ Full show live 24/7 on Twitch (link in bio) #MW4 #ModernWarfare4 #CallofDuty #CODclips`
Always credit the player, and only post clips sent in through the site form or your own.

**Instagram story (Day 1):** offline-screen image + sticker "LIVE NOW" + link sticker to Twitch.

## Discord server structure
```
📢 INFORMATION
  #announcements      (go-live pings, schedule changes — only staff post)
  #schedule           (pin the Five-Show Plan image daily)
  #rules
🎬 THE MINISTRY OF HIGHLIGHTS
  #clip-submissions   (link to mw4live.com/submit; plain uploads also fine — reviewer moves them to the site)
  #peoples-vote       (staff post the week's top 10 every Thursday)
  #aired-clips        (bot / staff post when a clip airs, credit the player)
🎙 THE WAR ROOM
  #guest-requests     (point to mw4live.com/guests)
  #questions-for-the-desk
💬 COMMUNITY
  #general  #loadouts  #lfg  #memes
🔊 VOICE
  Green Room (guests wait here before going on)  ·  LFG 1  ·  LFG 2
```
Roles: `@Ministry` (staff), `@Guest`, `@Hero of the Week` (top clip winner, 7 days), `@Comrade` (default).
Bot: set up **Nightbot or StreamElements** on Twitch for `!clip`, `!q`, `!schedule`, `!discord`, `!submit` (the website's Watch page advertises these).

### Suggested Twitch chat commands (Nightbot)
| Command | Response |
|---|---|
| `!schedule` | Live shows 09 · 12 · 15 · 18 · 21 ET. Everything else is a labelled replay. Full plan: mw4live.com/schedule |
| `!submit` | Submit your glorious clip: mw4live.com/submit — top votes open Saturday's Prime Time |
| `!discord` | Report to the Discord, comrade: discord.gg/REPLACE |
| `!q` | (StreamElements "queue" or a mod copies questions to the desk) |
| `!clip` | Nightbot `$(twitch clip)` variable — requires connecting Nightbot to Twitch with clip permissions |
