# MW4 LIVE — Stream PC setup (Windows + Elgato + OBS, 24/7 for 21 days)

Target: one Windows PC that never stops streaming to Twitch. Live shows go out from it; between shows it
switches itself to the replay loop / highlight reels / schedule card.

## 0. Before you start (15 min)
- [ ] Clone this repo to **`C:\MW4-Live`** (the OBS file points there). Other path? Run
      `python broadcast\obs\build_scenes.py D:/YourPath` and import the new `MW4_Live.json`.
- [ ] Install: **OBS Studio** (latest), **VLC** (64-bit — the OBS VLC source needs it), **Elgato 4K Capture Utility** or drivers for your model,
      **Advanced Scene Switcher** plugin (OBS forums, free) for the automatic schedule, **ffmpeg** + **Python 3** (montage tool).
- [ ] Windows: Power plan → *High performance*, sleep **Never**, display off ok. Windows Update → set *Active hours* to cover your live blocks and
      **pause updates for 3 weeks** (Settings › Windows Update › Pause). A forced reboot mid-pilot is the #1 way 24/7 channels die.
- [ ] Wired Ethernet, not Wi-Fi. Run a speed test: you need ~10 Mbps **upload** sustained for 1080p60 at 6000 kbps.

## 1. Signal chain
```
PS5/Xbox ──HDMI──► Elgato ──HDMI passthrough──► your TV/monitor (zero-lag play)
                     └─USB──► Stream PC ► OBS "Elgato (Console)"
Host cam + mic ─────────────► OBS "Host Cam" / "Host Mic"
Guests ─► VDO.Ninja link ───► OBS "Guest (VDO.Ninja)"   (or Discord call + Window Capture)
media/loop  media/reels ────► VLC sources for off-air hours
```
PC gameplay instead of console: use the **LIVE · PC** scene (Game Capture). If you game on the same PC that streams,
expect lower performance; console + Elgato is the cleaner setup for a 24/7 rig.

## 2. Import the scenes (5 min)
OBS › **Scene Collection › Import** › `C:\MW4-Live\broadcast\obs\MW4_Live.json` › Finish › select **MW4 Live**.
Then open each device source once and pick the real device:
- *Elgato (Console)* → your Elgato device, 1920×1080, audio: *Capture audio only* or *Output desktop audio (WaveOut)*.
- *Host Cam* → webcam. *Host Mic* → mic.
If import complains about a source, the overlay URLs are all `file:///C:/MW4-Live/broadcast/overlays/<page>` — add them as Browser sources at 1920×1080.

| Scene | When |
|---|---|
| 24/7 · REPLAY LOOP | Overnight / between shows. Plays `media/loop` shuffled with a REPLAY tag |
| 24/7 · HIGHLIGHT REEL | Plays `media/reels` (output of the montage tool) |
| 24/7 · SCHEDULE CARD | 2–3 min between loop blocks so new viewers know when you're live |
| LIVE · STARTING SOON | 5-min countdown (`&min=5` in the URL) |
| LIVE · CONSOLE / PC / DESK | Main show |
| LIVE · INTERVIEW | Host + guest split screen |
| LIVE · GUEST GAMEPLAY | Guest's gameplay full screen (their consent required, see ops/GUESTS.md) |
| LIVE · CHALLENGE | Scoreboard on top of gameplay |
| LIVE · BRB / ENDING | Breaks and sign-off |

## 3. OBS settings for 24/7 stability
- **Settings › Stream**: Service *Twitch*, *Connect Account* (recommended) or stream key.
- **Settings › Output** (Advanced): Encoder **NVIDIA NVENC H.264** (or AMD/QuickSync), Rate control **CBR**, Bitrate **6000 Kbps**,
  Keyframe **2 s**, Preset *Quality*. Audio 160 kbps.
- **Settings › Video**: Base & Output 1920×1080, **60 fps** (drop to 30 if the PC struggles; browser overlays run at 30).
- **Settings › Advanced › Automatically Reconnect**: ON, retry delay 2 s, max retries 0 (unlimited).
- **Settings › Advanced › Process Priority**: *Above Normal*.
- **Settings › General**: *Automatically record when streaming* ON with a 2 GB-ish split (Output › Recording › Automatic File Splitting by time, 60 min).
  These files are your raw material for clips and next-day replays.

## 4. Make it run itself (Advanced Scene Switcher)
Tools › Advanced Scene Switcher › **Macros**. Create one macro per row of `config.js › schedule`:
- *Condition*: Date › time is `21:00` (repeat daily). *Action*: Switch scene → `LIVE · STARTING SOON`.
- After each live block: Condition *time = end of show* → scene `24/7 · SCHEDULE CARD`, wait 3 min → `24/7 · REPLAY LOOP`.
- **Restart macro** (once a day at 06:00, a dead hour): Action *Stop streaming*, wait 20 s, *Start streaming*, scene `24/7 · REPLAY LOOP`.
  Twitch limits a single broadcast's length (historically 48 h), so a planned daily restart avoids a surprise cut and gives you clean daily VODs.
- Safety macro: if *Streaming = stopped* for 60 s and it's not 06:00 → *Start streaming*.

You're still the one who goes live; the macro just puts the countdown up so you can't miss it.

## 5. Twitch rules that matter for 24/7 (read these)
- **Label replays honestly.** Twitch has acted against 24/7 channels that looped old footage while presenting it as live
  (it treated this as cheating its rewards systems). Our loop scenes carry an on-screen *REPLAY / HIGHLIGHT REEL* tag — also
  put **`[REPLAY]`** at the start of the stream title during loop hours (Advanced Scene Switcher can't edit the title; do it from
  the Twitch app or Stream Manager, or keep one title like *"MW4 LIVE 24/7 — live shows 12, 18, 21 ET · replays between"*).
- **Do not run Drops-enabled campaigns on the loop.** Only tag Drops when you are actually live.
- **Only loop your own content** or content you have written permission for. Never restream other creators' channels.
- **Music**: no commercial music anywhere. Use royalty-free beds you have a licence for (put `bed.mp3` in `media/music`).
  Turn in-game music off / keep licensed tracks out — Twitch mutes VODs and can strike live.

## 6. Guests (VDO.Ninja, free)
1. Send the guest: `https://vdo.ninja/?push=MW4GUEST1&webcam&quality=1` (change MW4GUEST1 per guest so links aren't reused).
2. Your OBS *Guest (VDO.Ninja)* source already views `?view=MW4GUEST1`. Different code? edit the URL.
3. Guest wants to show their gameplay: send `https://vdo.ninja/?push=MW4GUEST1&screenshare&quality=0` instead.
4. Mute your own Twitch tab to avoid echo; guests use headphones.
Discord fallback: join a voice/video call, Window Capture the Discord window, crop to the guest tile.

## 7. Updating graphics during a show
Edit `broadcast/config.js` (show name, guest name, scoreboard, ticker). Overlays reload within 60 s, or right-click the browser
source › **Refresh** for instant. Interview question: edit the URL `interview.html?q=Your question`.

## 8. Daily checklist (5 min, every morning)
- [ ] Stream still up? Twitch Stream Manager health = green, no dropped frames spike in OBS stats.
- [ ] Copy yesterday's best recording segments → `media/loop` (keep the folder ~6–10 h total, delete old ones).
- [ ] Run the montage tool on `media/clips-inbox` → new reel in `media/reels`.
- [ ] Update `config.js`: today's guest, ticker facts (confirmed only), score reset.
- [ ] Disk space > 100 GB free (recordings grow ~2.5 GB/h at 6000 kbps).
