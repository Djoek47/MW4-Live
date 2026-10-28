"use client";
import { useEffect, useState } from "react";
import { PILOT, PILOT_DAYS, pilotDay, pilotDate } from "@/lib/content";

export function usePilotDay() {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => setD(pilotDay()), []);
  return d;
}

/** "Day 4 of 21 · Tonight: The Map Room" — or countdown before Day 1. */
export function PilotBadge() {
  const d = usePilotDay();
  if (d === null) return <span className="h-8" />;
  if (d < 1) return <span className="chyron text-sm"><span className="k steel">Starts</span><span className="v">{pilotDate(1)} · Day 1 of {PILOT_DAYS}</span></span>;
  if (d > PILOT_DAYS) return <span className="chyron text-sm"><span className="k steel">Pilot complete</span><span className="v">21 days on air</span></span>;
  return <span className="chyron text-sm"><span className="k">Day {d}/{PILOT_DAYS}</span><span className="v">Tonight: {PILOT[d - 1]}</span></span>;
}

/** 21 cells, one per day. Past days dim, today lit. */
export function PilotStrip() {
  const d = usePilotDay() ?? 0;
  return (
    <ol className="grid grid-cols-7 gap-px bg-rule border border-rule">
      {PILOT.map((t, i) => {
        const n = i + 1, state = n < d ? "past" : n === d ? "today" : "next";
        return (
          <li key={t} className={`p-3 min-h-28 flex flex-col ${state === "today" ? "bg-tally text-white" : "bg-panel"} ${state === "past" ? "opacity-45" : ""}`}>
            <span className="tc text-[11px] opacity-80">D{String(n).padStart(2, "0")} · {pilotDate(n)}</span>
            <span className="display text-lg md:text-xl mt-auto leading-[.95]">{t}</span>
          </li>
        );
      })}
    </ol>
  );
}
