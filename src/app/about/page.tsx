import type { Metadata } from "next";
import { PageHead, SocialRow } from "@/components/Mark";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHead kicker="About the network" title={<>Fan-run.<br /><span className="text-amber">Always on.</span></>}
        sub="MW4 Live is an independent Modern Warfare 4 broadcast on YouTube and Twitch, built like a sports network: fixed shows, a real schedule, and the community on screen." />
      <div className="mx-auto max-w-4xl px-4 py-12 grid gap-12">
        <section className="grid gap-4">
          <h2 className="display text-4xl">How we run the channel</h2>
          <p className="text-mute">The propaganda look is a joke. The rules below are not.</p>
          <ul className="grid gap-3 text-mute">
            <li><b className="text-paper">LIVE means live.</b> When the tally says LIVE, a host is on air. Everything else carries a REPLAY or REEL tag on screen and in the title.</li>
            <li><b className="text-paper">Facts are labelled.</b> Confirmed news, our testing, and rumours are kept apart and marked as such.</li>
            <li><b className="text-paper">We only show what we have permission to show.</b> Our own gameplay, guests who agreed to appear, and clips sent in by their owners.</li>
          </ul>
        </section>
        <section id="rules" className="scroll-mt-32 grid gap-4">
          <h2 className="display text-4xl">Clip &amp; guest terms</h2>
          <ol className="grid gap-3 text-mute list-decimal pl-5">
            <li>Only send gameplay you recorded yourself. We remove anything that turns out to be someone else&apos;s.</li>
            <li>Sending a clip lets MW4 Live edit it and show it on our live streams, in replays and reels, and on our social accounts, credited to the gamertag you give.</li>
            <li>Guests agree their segment is recorded and may be replayed and clipped, credited to their handle.</li>
            <li>Changed your mind? Message us and we take the clip or segment out of the loop and our socials within 48 hours.</li>
            <li>No cheating, exploits shown as instructions, slurs, or commercial music. Those clips are declined.</li>
          </ol>
        </section>
        <section className="grid gap-4">
          <h2 className="display text-4xl">Contact</h2>
          <p className="text-mute">Bookings, takedowns, partnerships: DM us on any platform below or email <a className="text-paper underline decoration-tally" href="mailto:hello@mw4live.com">hello@mw4live.com</a>.</p>
          <SocialRow />
        </section>
        <p className="text-sm text-mute border-t border-rule pt-6">MW4 Live is an independent, fan-run broadcast. It is not affiliated with, endorsed or sponsored by Activision Publishing, Inc. or the Call of Duty franchise. Call of Duty and Modern Warfare are trademarks of Activision; all other trademarks belong to their owners.</p>
      </div>
    </>
  );
}
