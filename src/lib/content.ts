// MW4 LIVE — single source for the site. Keep broadcast/config.js schedule in step with DAILY below.

export const CHANNEL = process.env.NEXT_PUBLIC_TWITCH_CHANNEL || "mw4livetv";
/** YouTube channel ID (starts with UC…, from youtube.com/account_advanced). Empty = YouTube player off. */
export const YOUTUBE_CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID || "";
export type Platform = "twitch" | "youtube";
/** Which platforms the site shows. Set NEXT_PUBLIC_TWITCH_CHANNEL="" to turn Twitch off. */
export const platforms: Platform[] = [
  ...(CHANNEL ? (["twitch"] as const) : []),
  ...(YOUTUBE_CHANNEL_ID ? (["youtube"] as const) : []),
];
/** Default player when both are on: NEXT_PUBLIC_PRIMARY_PLATFORM=youtube|twitch */
export const PRIMARY: Platform = (process.env.NEXT_PUBLIC_PRIMARY_PLATFORM as Platform) && platforms.includes(process.env.NEXT_PUBLIC_PRIMARY_PLATFORM as Platform)
  ? (process.env.NEXT_PUBLIC_PRIMARY_PLATFORM as Platform) : platforms[0] ?? "twitch";
/** Day 1 of the 21-day pilot (Eastern). Change with NEXT_PUBLIC_PILOT_START=YYYY-MM-DD if launch moves. */
export const PILOT_START = process.env.NEXT_PUBLIC_PILOT_START || "2026-10-29";
export const PILOT_DAYS = 21;

export type Slot = { time: string; end: string; show: string; kind: "live" | "replay" | "reel" };

/** Same grid every day, Eastern Time. Live blocks are the shows you host; everything else is the loop. */
export const DAILY: Slot[] = [
  { time: "00:00", end: "09:00", show: "Overnight: Best of the Day", kind: "replay" },
  { time: "09:00", end: "10:00", show: "Morning Briefing", kind: "live" },
  { time: "10:00", end: "12:00", show: "Highlight Reel", kind: "reel" },
  { time: "12:00", end: "13:00", show: "The Intel Report", kind: "live" },
  { time: "13:00", end: "15:00", show: "Loadout Lab (Replay)", kind: "replay" },
  { time: "15:00", end: "16:00", show: "Community Call-Up", kind: "live" },
  { time: "16:00", end: "18:00", show: "Highlight Reel", kind: "reel" },
  { time: "18:00", end: "19:30", show: "The War Room", kind: "live" },
  { time: "19:30", end: "21:00", show: "War Room (Replay)", kind: "replay" },
  { time: "21:00", end: "23:00", show: "Prime Time: MW4", kind: "live" },
  { time: "23:00", end: "24:00", show: "Highlight Reel", kind: "reel" },
];

export const SHOWS = [
  { slug: "prime-time", name: "Prime Time: MW4", when: "Nightly 21:00", length: "2 h", flagship: true,
    pitch: "The main event. Reactions, best plays of the day, competitive breakdowns and the night's guest." },
  { slug: "war-room", name: "The War Room", when: "Daily 18:00", length: "90 min",
    pitch: "Interviews and debates. Creators and players at the desk, chat votes on who's right." },
  { slug: "intel-report", name: "The Intel Report", when: "Daily 12:00", length: "1 h",
    pitch: "Patches, weapons, maps. Confirmed changes on one side of the screen, speculation clearly labelled on the other." },
  { slug: "morning-briefing", name: "Morning Briefing", when: "Daily 09:00", length: "1 h",
    pitch: "What happened overnight, what's official, and today's lineup." },
  { slug: "call-up", name: "Community Call-Up", when: "Daily 15:00", length: "1 h",
    pitch: "Your clips on screen, your questions answered, your challenges played live." },
  { slug: "loadout-lab", name: "Loadout Lab", when: "Tests weekly, replays daily", length: "30 min",
    pitch: "We test builds with the same method every time and show the numbers, not hype." },
] as const;

/** Flagship topic for each day of the pilot. Days are filled with real footage, facts and guests — never invented. */
export const PILOT = [
  "Launch Week Report", "First 100 Hours", "Loadout Lab: Day One Meta", "The Map Room", "Community vs Community",
  "Clutch Night", "Week One Verdict",
  "Player Spotlight", "Myth or Meta?", "War Room Debate", "Ranked Watch", "Creator Interview Night", "Community Challenge", "Week Two Desk",
  "Has the Meta Changed?", "The Underrated Player", "Patch Watch", "The People Decide", "Community All-Stars", "MW4 Live Showcase", "The 21-Day Verdict",
] as const;

export const TICKER = [
  "★ ON AIR 24/7 — live shows 09:00 · 12:00 · 15:00 · 18:00 · 21:00 ET, labelled replays between",
  "★ MINISTRY OF HIGHLIGHTS REPORTS RECORD CLUTCH HARVEST",
  "★ THE PEOPLE'S VOTE CLOSES SUNDAY 23:59 ET. ONE COMRADE, ONE VOTE",
  "★ CAMPING DECLARED AN ENEMY OF THE PEOPLE (CHAT VOTE PENDING)",
  "★ REPLAYS ARE LABELLED REPLAY. GLORY TO HONESTY",
  "★ CREATORS: REPORT TO THE WAR ROOM — APPLY ON THE SITE",
  "★ FAN-RUN PARODY · NOT AFFILIATED WITH ACTIVISION OR ANY ACTUAL GOVERNMENT",
];

/** Update hrefs once each account exists. One handle everywhere. */
export const SOCIALS = [
  { id: "twitch", label: "Twitch", href: `https://www.twitch.tv/${CHANNEL}` },
  { id: "youtube", label: "YouTube", href: YOUTUBE_CHANNEL_ID ? `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}` : "https://www.youtube.com/@mw4livetv" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@mw4livetv" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/mw4livetv" },
  { id: "x", label: "X", href: "https://x.com/mw4livetv" },
  { id: "discord", label: "Discord", href: "https://discord.gg/REPLACE" },
] as const;

// ---------- time helpers (Eastern) ----------
export function etParts(d = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(d).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: Number(p.hour) * 60 + Number(p.minute) };
}
const m = (t: string) => { const [h, mm] = t.split(":").map(Number); return h * 60 + mm; };
export function nowAndNext(d = new Date()) {
  const { minutes } = etParts(d);
  const i = Math.max(0, DAILY.findIndex((s) => minutes >= m(s.time) && minutes < m(s.end)));
  const nextLive = [...DAILY.slice(i + 1), ...DAILY].find((s) => s.kind === "live")!;
  return { now: DAILY[i], next: DAILY[(i + 1) % DAILY.length], nextLive, progress: (minutes - m(DAILY[i].time)) / (m(DAILY[i].end) - m(DAILY[i].time)) };
}
/** 1-based pilot day for a given Eastern date, or 0 before / >21 after. */
export function pilotDay(date = etParts().date) {
  return Math.floor((Date.parse(date) - Date.parse(PILOT_START)) / 864e5) + 1;
}
export function pilotDate(day: number) {
  const d = new Date(Date.parse(PILOT_START) + (day - 1) * 864e5);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
}
