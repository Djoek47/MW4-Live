"use client";
import { useEffect, useState } from "react";
import { weekClips, platformName, type Clip } from "@/lib/data";
import { PlatformIcon } from "./Icons";
import { isLive } from "@/lib/supabase";

/** Clip thumbnail. We don't have frames for link submissions, so it's a broadcast slate with the clip's own details. */
export function ClipSlate({ c, rank }: { c: Clip; rank?: number }) {
  return (
    <div className="relative aspect-video bg-panel-2 overflow-hidden scan">
      <div className="absolute inset-0 gridbg opacity-40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep/45" />
      {rank != null && <span className="absolute left-0 top-0 display text-5xl bg-tally text-on-tally px-3 pt-2 pb-1">{rank}</span>}
      <span className="absolute right-3 top-3 chyron text-[11px]"><span className="k steel"><PlatformIcon name={c.platform} className="size-3" />{platformName[c.platform]}</span><span className="v">{c.mode ?? "MW4"}</span></span>
      {c.status === "aired" && <span className="absolute left-3 bottom-3 chyron text-[11px]"><span className="k">Aired</span></span>}
    </div>
  );
}

export function TopClips() {
  const [clips, setClips] = useState<Clip[] | null>(null);
  useEffect(() => { weekClips().then((c) => setClips(c.slice(0, 3))); }, []);
  if (!clips) return <div className="mt-6 h-40" />;
  if (!clips.length) return <p className="mt-6 text-mute">No clips approved yet this week. Yours could be first.</p>;
  return (
    <>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {clips.map((c, i) => (
          <li key={c.id}><ClipSlate c={c} rank={i + 1} />
            <p className="font-semibold mt-2 leading-snug">{c.title}</p>
            <p className="text-sm text-mute">{c.gamertag} · <span className="tc">{c.votes}</span> votes</p></li>
        ))}
      </ol>
      {!isLive && <p className="mt-4 text-xs text-mute">Preview: sample clips. Real submissions appear once Supabase is connected.</p>}
    </>
  );
}
