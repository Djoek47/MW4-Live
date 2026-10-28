# MW4 LIVE — 21-day runbook (Oct 29 – Nov 18, 2026)

## Tonight (Oct 28) — go-live checklist
- [ ] **Stream PC**: follow `broadcast/SETUP.md` §0–3. Import scenes, pick devices, test a 10-min private stream (Twitch › Stream Manager › test with `?bandwidthtest=true` on the key).
- [ ] **Loop content exists**: at least **3–4 h** of your own MW4 gameplay recordings in `media/loop`. Without it the 24/7 loop has nothing to play. Record tonight if needed.
- [ ] **Music**: one licensed/royalty-free bed in `media/music/bed.mp3`.
- [ ] **Twitch**: avatar, banner, offline screen, panels, bio (`socials/SOCIALS.md`). Category: Call of Duty (MW4). Tags: English, 24/7, Community. Title template below.
- [ ] **Register the 6 handles** (Twitch, YouTube, TikTok, Instagram, X, Discord) and update links in `src/lib/content.ts`.
- [ ] **Website**: review locally, then deploy (see README "Deploy"). Supabase optional for Day 1 — without it the site shows preview data and forms don't save, so connect it before you announce clip submissions.
- [ ] **Guests**: confirm Day 1–3 guests by DM using the template below; send each their VDO.Ninja link.
- [ ] **Advanced Scene Switcher** macros set for the daily grid + 06:00 restart.

### Stream titles (change in Stream Manager)
- Live: `🔴 LIVE · PRIME TIME: [TOPIC] · The People's Broadcast of MW4 · Day [N]/21`
- Loop: `[REPLAY] Best of Day [N] · next live show [TIME] ET · MW4 24/7`

## The daily loop (one person)
| ET | What | Time |
|---|---|---|
| 08:30 | Check stream health, update `config.js` (guest, ticker), approve overnight clips in /admin | 20 min |
| 09:00 | **Morning Briefing** live (can be 30 min desk-only) | 30–60 |
| 10:00 | Cut 2 shorts from yesterday's Prime Time recording, schedule on TikTok/Reels/Shorts | 45 |
| 12:00 | **Intel Report** live | 60 |
| 13:00 | Run `python montage/make_reel.py --vertical --move` on approved clips → new reel + shorts | 15 |
| 15:00 | **Community Call-Up** live (clips + chat questions) | 60 |
| 18:00 | **War Room** live with guest | 90 |
| 21:00 | **Prime Time** live — the flagship | 120 |
| 23:00 | Copy best segments of today's recordings → `media/loop`; prune old loop files; log the day's numbers | 20 |

That's ~8 h/day on air. **Be honest with yourself after week 1**: if five live shows a day isn't sustainable, keep Prime Time + War Room live and let the other slots become reels. The site schedule and `config.js` are the only two places to change.

## 21-day flagship plan
| Day | Date | Prime Time topic | Notes |
|---|---|---|---|
| 1 | Thu Oct 29 | Launch Week Report | Your verdict after 6 days of the game. Only confirmed facts on the Intel side. |
| 2 | Fri Oct 30 | First 100 Hours | What the community loves / hates; chat poll |
| 3 | Sat Oct 31 | Loadout Lab: Day One Meta | Show your test method on screen |
| 4 | Sun Nov 1 | The Map Room | Routes + spawns on 2–3 maps |
| 5 | Mon Nov 2 | Community vs Community | Debate night: modes/weapons, chat votes |
| 6 | Tue Nov 3 | Clutch Night | First People's Vote top 3 |
| 7 | Wed Nov 4 | Week One Verdict | Publish baseline numbers |
| 8 | Thu Nov 5 | Player Spotlight | |
| 9 | Fri Nov 6 | Myth or Meta? | |
| 10 | Sat Nov 7 | War Room Debate | Two guests, one take |
| 11 | Sun Nov 8 | Ranked Watch | |
| 12 | Mon Nov 9 | Creator Interview Night | Biggest guest you can book |
| 13 | Tue Nov 10 | Community Challenge | Scoreboard scene, rules posted 24 h before |
| 14 | Wed Nov 11 | Week Two Desk | Compare to baseline |
| 15 | Thu Nov 12 | Has the Meta Changed? | Re-run Day 3 tests |
| 16 | Fri Nov 13 | The Underrated Player | |
| 17 | Sat Nov 14 | Patch Watch | Confirmed vs rumoured, split screen |
| 18 | Sun Nov 15 | The People Decide | Viewers vote on the programme for week 4 |
| 19 | Mon Nov 16 | Community All-Stars | Best clips of the pilot |
| 20 | Tue Nov 17 | MW4 Live Showcase | Longest show, multiple guests |
| 21 | Wed Nov 18 | The 21-Day Verdict | Publish the numbers, what's next |


## Guest outreach (DM template)
> Hey [name] — I'm running MW4 Live, a 24/7 Modern Warfare 4 channel on Twitch styled as a (very fake) state broadcaster. Want to come on [show] on [date/time ET] for ~20 min? We'd talk [their thing] and you can show gameplay if you like. You get a clip pack of your segment within 48 h to post on your own channels, and your handle is on screen the whole time.
> Heads up: segments are recorded and can replay on the 24/7 loop. If you ever want yours pulled, say so and it's gone.
> Link to join is just a browser tab, no install. Interested?

When they say yes, get it **in writing** (DM is fine) that they agree to: live appearance, recording, replays, clips on MW4 Live socials. Log it in /admin (guest status → booked) or a note in the guest's Discord thread. **Never put another streamer's broadcast on your channel without that written yes.**

## Rights rules (non-negotiable)
1. Loop only your own recordings, consenting guests, and clips sent through the site (the form records consent + timestamp).
2. No commercial music. Mute clips that have it (`--mute` in the montage tool) or decline them.
3. Replays always say REPLAY on screen and in the title. No Drops tagging while the loop is running.
4. Takedown request → remove from `media/loop`, `media/reels` and socials within 48 h.
5. Parody theme: fictional state only. No real leaders, flags, emblems, or jokes about Korean people.
6. Before running ads/sponsors on the channel, read Activision's current terms for gameplay videos and streaming and confirm commercial use is allowed. I haven't verified those terms for MW4.

## Metrics log (fill nightly; the pilot verdict depends on it)
| Day | Avg viewers (live) | Avg viewers (loop) | Peak | New followers | Chat msgs | Clips in | Shorts views | Hours you worked |
|---|---|---|---|---|---|---|---|---|
| 1 | | | | | | | | |

Twitch Stream Manager › Analytics gives viewers/followers per stream; compare **live vs loop** viewers. Signal you want by Day 21: returning chatters by name, clip submissions without being asked, loop viewers > 0 overnight.
