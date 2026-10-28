import type { Metadata } from "next";
import { TwitchChat, TwitchPlayer } from "@/components/Twitch";
import { NowNext } from "@/components/OnAir";
import { PilotBadge } from "@/components/Pilot";
import { CHANNEL } from "@/lib/content";

export const metadata: Metadata = { title: "Watch live" };

export default function Watch() {
  return (
    <div className="mx-auto max-w-[110rem] px-4 py-6">
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="slate p-1.5"><TwitchPlayer /></div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <PilotBadge />
            <a href={`https://www.twitch.tv/${CHANNEL}`} target="_blank" rel="noreferrer" className="btn btn-line !py-2 !text-sm">Open on Twitch · follow for alerts</a>
          </div>
          <div className="mt-4"><NowNext /></div>
          <div className="mt-4 grid sm:grid-cols-3 gap-px bg-rule border border-rule text-sm">
            {[["!clip", "Clip the last 30 seconds"], ["!q your question", "Send a question to the desk"], ["!vote 1/2", "Vote in the on-screen poll"]].map(([c, d]) => (
              <div key={c} className="bg-panel p-4"><p className="tc text-tally">{c}</p><p className="text-mute mt-1">{d}</p></div>))}
          </div>
        </div>
        <TwitchChat className="w-full h-[70vh] xl:h-[calc(100vh-11rem)] border border-rule" />
      </div>
    </div>
  );
}
