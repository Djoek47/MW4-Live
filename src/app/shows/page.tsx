import type { Metadata } from "next";
import Link from "next/link";
import { SHOWS } from "@/lib/content";
import { Zone, PageHead } from "@/components/Mark";

export const metadata: Metadata = { title: "Shows" };

/** Variety-show caption stickers: Korean word + what it means. */
const STICKER: Record<string, [string, string, string]> = {
  "prime-time": ["대박!", "Daebak: jackpot", ""], "war-room": ["토론", "Debate", "pink"], "intel-report": ["속보", "Breaking", "cyan"],
  "morning-briefing": ["좋은 아침", "Good morning", ""], "call-up": ["여러분!", "Everyone!", "pink"], "loadout-lab": ["실험", "Experiment", "cyan"],
};

const FORMAT: Record<string, string[]> = {
  "prime-time": ["Cold open: the play of the day", "Tonight's topic, with tonight's guest", "Community clips on the big screen", "Chat poll and verdict", "What's on tomorrow"],
  "war-room": ["Guest intro and their story", "Five fixed questions", "The debate: one hot take, two sides", "Chat votes who won", "Where to follow the guest"],
  "intel-report": ["Confirmed: official notes, read and explained", "Tested: what we measured in game", "Unconfirmed: rumours, clearly labelled", "What it means for your loadout"],
  "morning-briefing": ["Overnight in 5 minutes", "Official updates", "Today's guests and challenge", "Clip of the morning"],
  "call-up": ["Your clips, ranked live", "Viewer questions", "The daily community challenge"],
  "loadout-lab": ["Same method every test: range, TTK, recoil", "Numbers on screen", "Verdict: keep, tweak or bin"],
};

export default function Shows() {
  return (
    <Zone name="south">
      <PageHead zone="south" ko="방송 라인업" kicker="오늘의 방송 · Tonight's lineup" title={<>Six shows.<br /><span className="neon-c">One network.</span></>} sub="Same format every time, like your favourite variety show: you always know which segment is next. 화이팅!" />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-6">
        {SHOWS.map((s, i) => (
          <article key={s.slug} id={s.slug} className={`scroll-mt-32 grid md:grid-cols-[1.2fr_1fr] gap-px bg-rule border border-rule ${i === 0 ? "border-t-tally border-t-[3px]" : ""}`}>
            <div className="bg-panel p-6 md:p-8">
              <span className="chyron text-xs"><span className={`k ${i === 0 ? "" : "steel"}`}>{s.when}</span><span className="v">{s.length}</span></span>
              <h2 className="display text-5xl md:text-6xl mt-5">{s.name}</h2>
              <p className="mt-3"><span className={`caption ${STICKER[s.slug][2]}`} title={STICKER[s.slug][1]}>{STICKER[s.slug][0]}</span> <span className="text-xs text-mute ml-2">{STICKER[s.slug][1]}</span></p>
              <p className="text-mute text-lg mt-3 max-w-xl">{s.pitch}</p>
            </div>
            <div className="bg-studio p-6 md:p-8">
              <p className="kicker !text-mute">Run of show</p>
              <ol className="mt-4 grid gap-3">
                {FORMAT[s.slug].map((f, k) => <li key={f} className="flex gap-3"><span className="tc text-tally text-sm w-6">{String(k + 1).padStart(2, "0")}</span><span>{f}</span></li>)}
              </ol>
            </div>
          </article>
        ))}
        <div className="flex gap-3 mt-4"><Link href="/schedule" className="btn btn-live">See today&apos;s schedule</Link><Link href="/guests" className="btn btn-line">Be on a show</Link></div>
      </div>
    </Zone>
  );
}
