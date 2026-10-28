import Link from "next/link";
import { TwitchPlayer } from "@/components/Twitch";
import { NowNext } from "@/components/OnAir";
import { PilotBadge, PilotStrip } from "@/components/Pilot";
import { SocialRow } from "@/components/Mark";
import { Decree, RaysPanel, Star } from "@/components/Poster";
import { DAILY, SHOWS } from "@/lib/content";
import { TopClips } from "@/components/TopClips";

export default function Home() {
  return (
    <>
      {/* HERO — a poster: rays from the horizon, everything on the centre line */}
      <RaysPanel className="border-b-[6px] border-paper">
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-14 md:pt-16 md:pb-20 text-center">
          <div className="flex justify-center"><PilotBadge /></div>
          <p className="mt-8 flex items-center justify-center gap-3 kicker !text-amber !tracking-[.3em]"><Star className="size-4" />The People&apos;s Broadcast<Star className="size-4" /></p>
          <h1 className="display huge text-[4.2rem] md:text-[9rem] mt-4 [text-shadow:5px_5px_0_var(--deep)]">The war never<br />goes off air</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream/90">By decree, Modern Warfare 4 is broadcast 24 hours a day. Five live shows daily, comrades at the desk, your clips on screen. Replays are always labelled REPLAY, because the Ministry never lies about replays.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/watch" className="btn bg-amber text-paper hover:brightness-110"><span className="tally-dot" />Watch live</Link>
            <Link href="/submit" className="btn shadow-[inset_0_0_0_2px_var(--cream)] hover:bg-cream hover:text-tally">Submit your glorious clip</Link>
          </div>
          <div className="mt-12 mx-auto max-w-4xl frame-ink bg-paper"><TwitchPlayer /></div>
          <div className="mt-6 mx-auto max-w-4xl text-left text-paper"><NowNext /></div>
        </div>
      </RaysPanel>

      {/* TODAY'S GRID */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Decree kicker="Every day · Eastern time">The Five-Show Plan</Decree>
        <p className="text-center text-mute mt-3">Fulfilled daily. Ahead of schedule, mostly.</p>
        <div className="mt-8 flex overflow-x-auto border-[3px] border-paper bg-panel">
          {DAILY.map((s) => (
            <div key={s.time + s.show} className={`shrink-0 w-48 p-4 border-r-2 border-paper/80 last:border-r-0 ${s.kind === "live" ? "bg-tally text-cream" : ""}`}>
              <div className="flex items-center gap-2">
                {s.kind === "live" ? <Star className="size-3.5 text-amber" /> : <span className="size-2.5 bg-amber" />}
                <span className="tc text-xs opacity-80">{s.time}</span>
              </div>
              <p className="display text-xl mt-3">{s.show}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-4"><Link href="/schedule" className="display text-lg text-tally hover:underline">Full schedule →</Link></p>
      </section>

      {/* SHOWS — symmetrical: flagship in the centre */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Decree kicker="Programming">The Shows</Decree>
        <div className="mt-10 grid gap-4 md:grid-cols-3 items-stretch">
          {[SHOWS[1], SHOWS[0], SHOWS[2], SHOWS[3], SHOWS[5], SHOWS[4]].map((s) => {
            const flag = s.slug === "prime-time", base = s.slug === "call-up";
            return (
              <Link key={s.slug} href={`/shows#${s.slug}`}
                className={`group p-6 flex flex-col items-center text-center min-h-60 border-[3px] border-paper transition-transform hover:-translate-y-1 ${flag ? "rays-c text-cream md:row-span-2 justify-center" : base ? "bg-paper text-cream md:col-span-3 !min-h-0" : "bg-panel"}`}>
                {flag && <Star className="size-14 text-amber mb-4" />}
                <span className={`tc text-xs ${flag || base ? "text-cream/70" : "text-mute"}`}>{s.when} · {s.length}</span>
                <span className={`display mt-3 ${flag ? "text-6xl md:text-7xl [text-shadow:4px_4px_0_var(--deep)]" : "text-4xl"}`}>{s.name}</span>
                <span className={`mt-3 text-sm ${flag ? "text-cream/90 max-w-xs" : base ? "text-cream/70" : "text-mute"}`}>{s.pitch}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 21-DAY PLAN */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Decree kicker="Season zero">The 21-Day Plan</Decree>
        <p className="text-center text-mute mt-3 max-w-xl mx-auto">One flagship topic a night for three weeks. Then the people decide what stays: we keep what you watched and cut what you didn&apos;t.</p>
        <div className="mt-8 overflow-x-auto"><div className="min-w-[760px]"><PilotStrip /></div></div>
      </section>

      {/* THE PEOPLE'S VOTE + GUESTS (mirrored pair) */}
      <section className="mx-auto max-w-7xl px-4 pb-16 grid gap-6 lg:grid-cols-2">
        <div className="slate p-6 md:p-8 text-center">
          <p className="kicker">Clip of the week</p>
          <h2 className="display text-5xl mt-2">The People&apos;s Vote</h2>
          <p className="text-mute mt-2">One comrade, one vote. Counted exactly once. We checked.</p>
          <TopClips />
          <Link href="/clips" className="btn btn-live mt-6">Cast your vote</Link>
        </div>
        <div className="relative overflow-hidden border-[3px] border-paper rays-gold text-paper p-6 md:p-8 text-center flex flex-col items-center">
          <Star className="size-12 text-tally" />
          <p className="kicker !text-paper mt-3">The War Room</p>
          <h2 className="display text-5xl mt-2">Report to the desk, comrade</h2>
          <p className="mt-4 max-w-md font-medium">Creators, ranked grinders, Zombies speedrunners: come on live, show your gameplay, defend your take. Every guest leaves with a clip pack for their own channels.</p>
          <div className="mt-auto pt-6"><Link href="/guests" className="btn bg-paper text-cream hover:bg-tally">Apply as a guest</Link></div>
        </div>
      </section>

      {/* FOLLOW */}
      <section className="mx-auto max-w-4xl px-4 pb-24 text-center">
        <p className="banner-ribbon text-lg md:text-2xl">Follow the network</p>
        <p className="text-mute mt-4">Never miss a broadcast. The Ministry posts every schedule change here first.</p>
        <SocialRow className="mt-6 justify-center" />
      </section>
    </>
  );
}
