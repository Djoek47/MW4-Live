import Link from "next/link";
import { PlatformSwitch, TwitchPlayer } from "@/components/Twitch";
import { NowNext } from "@/components/OnAir";
import { PilotBadge, PilotStrip } from "@/components/Pilot";
import { Seal, SocialRow, Zone } from "@/components/Mark";
import { Star } from "@/components/Poster";
import { Kimchi, Lightstick, Mic, Ramyeon, Soju } from "@/components/Seoul";
import { DogTag, Readout, TASK_FORCE } from "@/components/Ops";
import { DAILY, SHOWS } from "@/lib/content";
import { TopClips } from "@/components/TopClips";

export default function Home() {
  return (
    <Zone name="ops">
      {/* ▲ OPS HERO — the feed in a HUD frame */}
      <section className="ops-hero relative overflow-hidden border-b-[3px] border-[#ffcd00]">
        <div className="hazard h-2" />
        <div className="mx-auto max-w-7xl px-4 py-10 md:py-14 grid gap-10 lg:grid-cols-[1fr_1.3fr] items-center">
          <div>
            <PilotBadge />
            <Readout className="mt-8">Live ops · CH-24/7 · <span className="ko normal-case">생방송</span></Readout>
            <h1 className="mt-3 leading-[.86]">
              <span className="stencil block text-[5.5rem] md:text-[9rem] text-[#ffcd00]">MW4</span>
              <span className="display block text-5xl md:text-7xl text-[#f2efe4]">The war never<br />goes off air</span>
            </h1>
            <p className="text-lg text-[#f2efe4]/75 mt-6 max-w-md">Modern Warfare 4, 24 hours a day. Five live shows daily, creators at the desk, your clips on screen, and replays always labelled as replays.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/watch" className="btn bg-[#ffcd00] text-[#0b0c0b] hover:bg-[#ffdd3c]"><span className="tally-dot" />Watch live</Link>
              <Link href="/schedule" className="btn shadow-[inset_0_0_0_2px_#f2efe4] text-[#f2efe4] hover:bg-[#f2efe4] hover:text-[#0b0c0b]">Mission schedule</Link>
            </div>
          </div>
          <div>
            <div className="mb-3 flex items-center justify-between text-[#f2efe4] [&_[role=tablist]]:border-[#ffcd00]">
              <Readout>Feed · Eastern time</Readout><PlatformSwitch />
            </div>
            <div className="hud border border-[#ffcd00]/40 p-2 bg-black"><TwitchPlayer /></div>
            <div className="mt-3"><NowNext /></div>
          </div>
        </div>
        <div className="h-4 ticks opacity-70" />
      </section>

      {/* ★ | DMZ | ♥ — the split peninsula */}
      <section className="grid lg:grid-cols-[1fr_auto_1fr]">
        {/* NORTH: the People's Vote */}
        <Zone name="north" className="relative overflow-hidden">
          <div className="absolute inset-0 rays opacity-[.12]" aria-hidden />
          <div className="relative px-4 md:px-10 py-14 text-center max-w-2xl mx-auto">
            <div className="flex justify-center"><Seal className="size-20" /></div>
            <p className="kicker mt-5 flex items-center justify-center gap-2"><Star className="size-3.5 text-amber" />North of the line<Star className="size-3.5 text-amber" /></p>
            <h2 className="display text-5xl md:text-6xl mt-2">The People&apos;s Vote</h2>
            <p className="ko text-2xl text-tally mt-1">인민의 투표</p>
            <p className="text-mute mt-3">Send your clip. The people vote. One comrade, one vote, counted exactly once. We checked.</p>
            <TopClips />
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/clips" className="btn btn-live">Cast your vote</Link>
              <Link href="/submit" className="btn btn-line">Submit a clip</Link>
            </div>
          </div>
        </Zone>

        {/* The line */}
        <div className="hazard lg:w-16 h-14 lg:h-auto relative" aria-label="Demilitarized zone">
          <span className="absolute inset-0 grid place-items-center">
            <span className="bg-[#0b0c0b] text-[#ffcd00] stencil text-lg px-3 py-1 lg:[writing-mode:vertical-rl] lg:py-4 lg:px-1.5 whitespace-nowrap">DMZ · <span className="ko">비무장지대</span> · 38°N</span>
          </span>
        </div>

        {/* SOUTH: tonight in Seoul */}
        <Zone name="south" className="relative overflow-hidden">
          <div className="relative px-4 md:px-10 py-14 text-center max-w-2xl mx-auto">
            <div className="flex justify-center gap-3" aria-hidden><Lightstick className="size-14 bob" /><Mic className="size-14 bob [animation-delay:.4s]" /><Ramyeon className="size-14 bob [animation-delay:.8s]" /></div>
            <p className="caption mt-5 text-sm">South of the line ♥</p>
            <h2 className="display text-5xl md:text-6xl mt-3 neon">Tonight&apos;s lineup</h2>
            <p className="ko text-2xl neon-c mt-1">오늘의 방송</p>
            <ul className="mt-6 grid gap-2 text-left">
              {SHOWS.map((s, i) => (
                <li key={s.slug}><Link href={`/shows#${s.slug}`} className="panel flex items-center gap-4 px-4 py-3 hover:bg-panel-2">
                  <span className={`caption ${["", "pink", "cyan"][i % 3]} !text-xs shrink-0`}>{s.when.replace("Daily ", "").replace("Nightly ", "")}</span>
                  <span className="display text-2xl">{s.name}</span>
                </Link></li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/guests" className="btn btn-live">Debut on the show</Link>
              <Link href="/shows" className="btn btn-line">See every show</Link>
            </div>
            <div className="mt-8 flex justify-center gap-4 opacity-90" aria-hidden><Kimchi className="size-12" /><Soju className="size-12" /></div>
          </div>
        </Zone>
      </section>

      {/* ▲ TODAY'S GRID — mission timeline */}
      <section className="border-t-[3px] border-[#ffcd00]">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="kicker">Every day · Eastern time</p><h2 className="display text-5xl md:text-6xl mt-2">Today&apos;s operations</h2></div>
            <Link href="/schedule" className="display text-lg text-accent hover:underline">Full mission schedule →</Link>
          </div>
          <div className="mt-8 flex overflow-x-auto border border-rule hud">
            {DAILY.map((s) => (
              <div key={s.time + s.show} className={`shrink-0 w-48 p-4 border-r border-rule last:border-r-0 ${s.kind === "live" ? "bg-tally text-on-tally" : "bg-panel"}`}>
                <div className="flex items-center gap-2">
                  <span className={`size-2.5 ${s.kind === "live" ? "bg-on-tally" : "bg-amber"}`} />
                  <span className="tc text-xs opacity-80">{s.time}</span>
                </div>
                <p className="display text-xl mt-3">{s.show}</p>
                <p className="tc text-[10px] mt-2 opacity-60 uppercase">{s.kind === "live" ? "Live" : s.kind === "reel" ? "Highlight reel" : "Replay"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ▲ TASK FORCE */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4">
          <p className="kicker">Joint operators · every lobby</p>
          <h2 className="display text-5xl md:text-6xl mt-2">Task Force Live</h2>
          <p className="text-mute mt-3 max-w-2xl">MW4 sends its operators from Seoul to New York, Paris and Mumbai. So does the channel: five squads, one network.</p>
        </div>
        <div className="mt-8 flex gap-5 overflow-x-auto px-4 md:px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-6 snap-x">
          {TASK_FORCE.map((t) => <DogTag key={t.call} t={t} />)}
        </div>
      </section>

      {/* ▲ 21-DAY CAMPAIGN */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="kicker">Season zero</p><h2 className="display text-5xl md:text-6xl mt-2">The 21-day campaign</h2></div>
          <p className="text-mute max-w-md">One flagship topic a night for three weeks. Then we keep what you watched and cut what you didn&apos;t.</p>
        </div>
        <div className="mt-8 overflow-x-auto"><div className="min-w-[760px]"><PilotStrip /></div></div>
      </section>

      {/* FOLLOW */}
      <section className="mx-auto max-w-7xl px-4 pb-24">
        <div className="hud border border-rule p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between bg-panel">
          <div><p className="kicker">Never miss the drop</p><h2 className="display text-4xl md:text-5xl mt-2">Follow the network</h2></div>
          <SocialRow />
        </div>
      </section>
    </Zone>
  );
}
