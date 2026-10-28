// MW4 LIVE — broadcast control file.
// Edit this file, then right-click a browser source in OBS > "Refresh" (or wait: overlays auto-reload every 60s).
window.MW4 = {
  channel: "MW4 LIVE",
  tagline: "THE PEOPLE'S BROADCAST",
  handle: "@MW4LiveTV",          // change to your real handle on every platform
  site: "mw4live.com",           // change once the domain is bought

  // What's on air right now (used by lower third + live frame)
  nowShow: "PRIME TIME: MW4",
  host: { name: "CICENTOS", role: "HOST" },
  guest: { name: "GUEST NAME", role: "CREATOR · @handle" },

  // Scoreboard (Community Challenge / 1v1 segments)
  score: { left: "MW4 LIVE", leftScore: 0, right: "CHALLENGER", rightScore: 0, label: "FIRST TO 5" },

  // Ticker items — confirmed facts only. Prefix opinion with "TAKE:" and rumours with "UNCONFIRMED:"
  ticker: [
    "★ THE PEOPLE'S BROADCAST — ON AIR 24/7 FOR 21 DAYS",
    "★ MINISTRY OF HIGHLIGHTS REPORTS RECORD CLUTCH HARVEST",
    "★ SUBMIT YOUR GLORIOUS CLIP: MW4LIVE.COM/SUBMIT",
    "★ THE PEOPLE'S VOTE CLOSES SUNDAY 23:59 ET",
    "★ FAN-RUN PARODY · NOT AFFILIATED WITH ACTIVISION OR ANY ACTUAL GOVERNMENT",
  ],

  // Daily grid, Eastern Time. type: live | replay | reel
  schedule: [
    { time: "09:00", show: "MORNING BRIEFING", type: "live" },
    { time: "10:00", show: "HIGHLIGHT REEL", type: "reel" },
    { time: "12:00", show: "THE INTEL REPORT", type: "live" },
    { time: "13:00", show: "LOADOUT LAB (REPLAY)", type: "replay" },
    { time: "15:00", show: "COMMUNITY CALL-UP", type: "live" },
    { time: "16:00", show: "HIGHLIGHT REEL", type: "reel" },
    { time: "18:00", show: "THE WAR ROOM", type: "live" },
    { time: "21:00", show: "PRIME TIME: MW4", type: "live" },
    { time: "23:00", show: "OVERNIGHT: BEST OF THE DAY", type: "replay" },
  ],
};
