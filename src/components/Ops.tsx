/** OPS zone pieces: the MW4 tactical layer (black + yellow). */

/** Task Force Live — "operators" named after MW4's confirmed campaign theatres. Each one is a part of the channel. */
export const TASK_FORCE = [
  { call: "ALPHA", city: "SEOUL", code: "KOR", grid: "52S CG 2100 4900", role: "The desk", line: "Hosts, Prime Time and the War Room. Holding the line nightly." },
  { call: "BRAVO", city: "NEW YORK", code: "USA", grid: "18T WL 8600 0700", role: "Clip squad", line: "Reviews every submission and cuts the Highlight Reel." },
  { call: "CHARLIE", city: "PARIS", code: "FRA", grid: "31U DQ 5200 1100", role: "Guest liaison", line: "Books creators, sends links, runs the green room." },
  { call: "DELTA", city: "MUMBAI", code: "IND", grid: "43Q BV 7400 2400", role: "Loadout Lab", line: "Tests builds on the range. Shows the numbers, not the hype." },
  { call: "ECHO", city: "HAJIN", code: "DMZ", grid: "52T ?? CLASSIFIED", role: "Night watch", line: "Overnight replays and the loop. Always labelled REPLAY." },
] as const;

export function DogTag({ t }: { t: (typeof TASK_FORCE)[number] }) {
  return (
    <div className="relative shrink-0 w-64 snap-start rounded-[22px] bg-gradient-to-b from-[#d9d6cb] to-[#a9a597] text-[#0b0c0b] p-5 pt-8 shadow-[inset_0_2px_0_rgba(255,255,255,.6),inset_0_-3px_0_rgba(0,0,0,.25),0_14px_30px_-14px_rgba(0,0,0,.8)]">
      <span className="absolute left-1/2 -translate-x-1/2 top-3 size-3 rounded-full bg-[#0b0c0b]/80 shadow-[inset_0_1px_2px_rgba(0,0,0,.8)]" aria-hidden />
      <div className="flex items-center justify-between">
        <span className="stencil text-2xl">{t.call}</span>
        <span className="tc text-[11px] bg-[#0b0c0b] text-[#ffcd00] px-1.5 py-0.5">{t.code}</span>
      </div>
      <p className="tc text-[11px] mt-1 opacity-70">{t.city} · {t.grid}</p>
      <p className="display text-2xl mt-3">{t.role}</p>
      <p className="text-sm mt-1 leading-snug opacity-80">{t.line}</p>
    </div>
  );
}

/** Small label like a HUD readout: ▲ TEXT */
export function Readout({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`tc text-[11px] uppercase tracking-wider text-[#ffcd00] ${className}`}>▲ {children}</p>;
}
