"use client";
import { useEffect, useState } from "react";
import { DAILY, PILOT, PILOT_DAYS, etParts, nowAndNext, pilotDay, pilotDate } from "@/lib/content";
import { KindTag } from "@/components/OnAir";
import { Zone, PageHead } from "@/components/Mark";

export default function Schedule() {
  const [today, setToday] = useState<number | null>(null);
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => { setToday(pilotDay(etParts().date)); setNow(nowAndNext().now.time); }, []);
  const start = Math.min(Math.max(today ?? 1, 1), PILOT_DAYS);
  const days = Array.from({ length: 7 }, (_, i) => start + i).filter((d) => d <= PILOT_DAYS);
  const [sel, setSel] = useState<number | null>(null);
  const day = sel ?? start;

  return (
    <Zone name="ops">
      <PageHead zone="ops" kicker="Broadcast guide · Eastern time" title={<>Mission<br /><span className="text-[#ffcd00]">schedule</span></>}
        sub="Five live shows a day. Everything between them is a labelled replay or the Highlight Reel, so there's something on whenever you tune in." />
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div role="tablist" className="flex overflow-x-auto border border-rule">
          {days.map((d) => (
            <button key={d} role="tab" aria-selected={d === day} onClick={() => setSel(d)}
              className={`shrink-0 px-5 py-3 text-left border-r border-rule last:border-0 ${d === day ? "bg-tally text-on-tally" : "bg-panel hover:bg-panel-2"}`}>
              <span className="tc text-[11px] opacity-80 block">{d === today ? "Today" : `Day ${d}`}</span>
              <span className="display text-xl">{pilotDate(d)}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 slate p-6"><p className="kicker">Prime Time flagship · Day {day}</p><p className="display text-5xl mt-2">{PILOT[day - 1]}</p></div>
        <ul className="mt-6 border border-rule divide-y divide-rule">
          {DAILY.map((s) => {
            const on = day === today && s.time === now;
            return (
              <li key={s.time} className={`grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 px-4 py-4 ${on ? "bg-panel-2" : s.kind === "live" ? "bg-panel" : ""}`}>
                <span className="tc text-sm text-mute">{s.time}<span className="block text-[11px] opacity-60">–{s.end}</span></span>
                <span className={`display text-2xl ${s.kind === "live" ? "" : "text-mute"}`}>
                  {s.show === "Prime Time: MW4" ? <>Prime Time: <span className="text-tally">{PILOT[day - 1]}</span></> : s.show}
                  {on && <span className="ml-3 align-middle chyron text-[11px]"><span className="k steel">Now</span></span>}
                </span>
                <KindTag kind={s.kind} />
              </li>
            );
          })}
        </ul>
        <p className="text-sm text-mute mt-6">Times are targets, not promises. If a live show moves, the channel shows the schedule card with the new time, and we post it on X and Discord first.</p>
      </div>
    </Zone>
  );
}
