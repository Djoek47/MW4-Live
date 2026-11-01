"use client";
import { useState } from "react";
import { sb, isLive } from "@/lib/supabase";
import { useUser } from "@/lib/data";
import { Zone, PageHead } from "@/components/Mark";

const SEATS = [
  { t: "The War Room", d: "Sit at the desk for a 20-minute interview and one debate topic. 18:00 ET." },
  { t: "Guest Gameplay", d: "Share your screen or console; we call your match live with you. Any live block." },
  { t: "Prime Time Feature", d: "Bring your best plays of the week; we break them down together. 21:00 ET." },
];
const DEAL = [
  "You get a clip pack (vertical + horizontal) of your segment within 48 h, free to post on your own channels.",
  "Your handle sits in the chyron the whole time you're on and goes in every clip caption.",
  "We send the link, the questions and the run of show a day ahead. No surprise topics.",
  "Your appearance is recorded and may replay on the 24/7 loop. Want it pulled later? Ask and we remove it.",
];

export default function Guests() {
  const { user } = useUser();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");
  async function apply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const c = sb();
    if (!c) { setTimeout(() => setState("sent"), 500); return; }
    const { error } = await c.from("guest_applications").insert({
      applicant_id: user?.id ?? null, name: f.name, handle: f.handle, platform_url: f.platform_url, followers: f.followers,
      pitch: f.pitch, availability: f.availability, contact: f.contact, consent_record: true,
    });
    if (error) { setErr(error.message); setState("error"); } else setState("sent");
  }
  return (
    <Zone name="south">
      <PageHead zone="south" ko="출연 신청" kicker="출연 신청 · Guest desk" title={<>Your debut<br /><span className="neon-c">stage</span></>}
        sub="Streamers, creators, ranked players, Zombies grinders. Bring a take or a highlight; leave with a clip pack and new viewers." />
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="display text-4xl">Three seats</h2>
          <ul className="mt-5 grid gap-px bg-rule border border-rule">
            {SEATS.map((s) => <li key={s.t} className="bg-panel p-5"><p className="display text-2xl">{s.t}</p><p className="text-mute text-sm mt-1">{s.d}</p></li>)}
          </ul>
          <h2 className="display text-4xl mt-10">The deal</h2>
          <ol className="mt-5 grid gap-4">
            {DEAL.map((d, i) => <li key={i} className="flex gap-4"><span className="display text-3xl text-tally w-8 shrink-0">{i + 1}</span><span className="text-mute">{d}</span></li>)}
          </ol>
        </div>
        <div className="slate p-6 md:p-8">
          {state === "sent" ? (<><p className="display text-5xl">Request in</p><p className="text-mute mt-3">We reply within 24 hours with open slots. Check your DMs on the contact you gave.</p></>) : (
            <form onSubmit={apply} className="grid gap-5">
              <h2 className="display text-4xl">Request a seat</h2>
              {!isLive && <p className="border border-amber/60 bg-amber/25 px-4 py-2 text-sm text-paper">Preview mode: nothing is saved.</p>}
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="grid gap-1.5"><span className="l">Name on air</span><input name="name" required className="field" /></label>
                <label className="grid gap-1.5"><span className="l">Handle</span><input name="handle" required className="field" placeholder="@yourhandle" /></label>
                <label className="grid gap-1.5"><span className="l">Main channel URL</span><input name="platform_url" type="url" required className="field" placeholder="https://twitch.tv/…" /></label>
                <label className="grid gap-1.5"><span className="l">Followers (approx.)</span><input name="followers" className="field" placeholder="Any size is fine" /></label>
              </div>
              <label className="grid gap-1.5"><span className="l">What do you want to bring?</span>
                <textarea name="pitch" required rows={3} className="field" placeholder="Your take, your best play, a challenge you want to run…" /></label>
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="grid gap-1.5"><span className="l">When are you free? (ET)</span><input name="availability" className="field" placeholder="Weeknights after 18:00" /></label>
                <label className="grid gap-1.5"><span className="l">Best contact</span><input name="contact" required className="field" placeholder="Discord, X or email" /></label>
              </div>
              <label className="flex gap-3 items-start text-sm"><input type="checkbox" required className="mt-1 accent-[#e10600]" />
                I agree my appearance is recorded and may be replayed and clipped by MW4 Live, with my handle credited. I can ask for removal later.</label>
              {state === "error" && <p role="alert" className="text-tally font-semibold">{err}</p>}
              <button disabled={state === "sending"} className="btn btn-live w-fit">{state === "sending" ? "Sending…" : "Request a seat"}</button>
            </form>
          )}
        </div>
      </div>
    </Zone>
  );
}
