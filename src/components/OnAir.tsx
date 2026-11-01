"use client";
import { useEffect, useState } from "react";
import { nowAndNext, TICKER, type Slot } from "@/lib/content";

function useNow(ms = 30000) {
  const [t, setT] = useState<Date | null>(null);
  useEffect(() => { setT(new Date()); const i = setInterval(() => setT(new Date()), ms); return () => clearInterval(i); }, [ms]);
  return t;
}

export function KindTag({ kind, className = "" }: { kind: Slot["kind"]; className?: string }) {
  if (kind === "live") return <span className={`chyron text-xs ${className}`}><span className="k"><span className="tally-dot" />Live</span></span>;
  return <span className={`chyron text-xs ${className}`}><span className="k amber">{kind === "replay" ? "Replay" : "Reel"}</span></span>;
}

/** Thin bar under the nav: what's on now, what's next, and the ET clock. */
export function OnAirBar() {
  const t = useNow(1000);
  if (!t) return <div className="h-9 border-b border-rule bg-panel" />;
  const { now, next } = nowAndNext(t);
  return (
    <div className="h-9 border-b border-rule bg-panel text-sm flex items-stretch">
      <div className="flex items-center gap-3 px-4 min-w-0">
        <KindTag kind={now.kind} />
        <span className="display text-lg truncate">{now.show}</span>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-4 border-l border-rule text-mute min-w-0">
        <span className="kicker !text-mute !text-[.7rem]">Next</span><span className="tc text-xs">{next.time}</span><span className="truncate">{next.show}</span>
      </div>
      <div className="ml-auto flex items-center px-4 border-l border-rule tc text-xs text-mute">
        {t.toLocaleTimeString("en-US", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", second: "2-digit" })} ET
      </div>
    </div>
  );
}

export function Ticker() {
  return (
    <div className="h-8 bg-studio border-b border-rule flex items-center overflow-hidden text-[13px] font-semibold" aria-label="News ticker">
      <span className="shrink-0 h-full flex items-center px-3 bg-tally text-on-tally display text-base tracking-wider z-10">MW4 Live</span>
      <div className="overflow-hidden flex-1"><div className="ticker-track">{TICKER.map((x, i) => <span key={i}>{x}<span className="text-tally ml-14">///</span></span>)}</div></div>
    </div>
  );
}

/** Live/next-live status used on the homepage hero. */
export function NowNext() {
  const t = useNow();
  if (!t) return <div className="h-24" />;
  const { now, nextLive, progress } = nowAndNext(t);
  return (
    <div className="grid sm:grid-cols-2 gap-px bg-rule border border-rule">
      <div className="bg-panel p-4">
        <div className="flex items-center justify-between"><span className="kicker">On now</span><KindTag kind={now.kind} /></div>
        <p className="display text-3xl mt-2">{now.show}</p>
        <div className="mt-3 h-1 bg-panel-2"><div className="h-full bg-tally" style={{ width: `${Math.round(progress * 100)}%` }} /></div>
        <p className="tc text-xs text-mute mt-1.5">{now.time}–{now.end} ET</p>
      </div>
      <div className="bg-panel p-4">
        <span className="kicker !text-mute">Next live show</span>
        <p className="display text-3xl mt-2">{nextLive.show}</p>
        <p className="tc text-xs text-mute mt-4">{nextLive.time} ET</p>
      </div>
    </div>
  );
}
