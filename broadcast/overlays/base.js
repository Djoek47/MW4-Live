// Shared helpers for every overlay. Auto-reloads so edits to config.js show up without touching OBS.
// (skipped on the countdown card so the timer doesn't reset)
if (!/type=starting/.test(location.search)) setTimeout(() => location.reload(), 60000);
const M = window.MW4;
const $ = (s) => document.querySelector(s);
function bug() { return `<div class="bug"><span class="mark">MW4</span><span class="word">LIVE</span></div>`; }
function etNow() { return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Toronto" })); }
function mins(t) { const [h, m] = t.split(":").map(Number); return h * 60 + m; }
// Returns {current, next[]} from the schedule based on Eastern Time
function slots() {
  const n = etNow(), cur = n.getHours() * 60 + n.getMinutes(), s = M.schedule;
  let i = s.findIndex((x, k) => cur >= mins(x.time) && (k === s.length - 1 || cur < mins(s[k + 1].time)));
  if (i < 0) i = s.length - 1; // after midnight, before first slot = overnight
  return { current: s[i], next: [1, 2, 3].map((d) => s[(i + d) % s.length]) };
}
function clock(el) { const f = () => (el.textContent = etNow().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " ET"); f(); setInterval(f, 1000); }
