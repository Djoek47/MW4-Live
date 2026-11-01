import type { Metadata } from "next";
import { FollowLink, PlatformSwitch, TwitchChat, TwitchPlayer } from "@/components/Twitch";
import { NowNext } from "@/components/OnAir";
import { PilotBadge } from "@/components/Pilot";

export const metadata: Metadata = { title: "Watch live" };

export default function Watch() {
  return (
    <div className="mx-auto max-w-[110rem] px-4 py-6">
      <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
        <div>
          <div className="slate p-1.5"><TwitchPlayer /></div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3"><PilotBadge /><PlatformSwitch /></div>
            <FollowLink className="btn btn-line !py-2 !text-sm" />
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
