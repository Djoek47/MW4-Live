"use client";
import { useState } from "react";
import Link from "next/link";
import { sb, isLive } from "@/lib/supabase";
import { useUser, platformName, MODES } from "@/lib/data";
import { PageHead } from "@/components/Mark";

export default function SubmitPage() {
  const { user, loading } = useUser();
  const [mode, setMode] = useState<"file" | "link">("link");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;
    const f = new FormData(e.currentTarget);
    setState("sending");
    const c = sb();
    if (!c) { setTimeout(() => setState("sent"), 500); return; }
    try {
      let storage_path: string | null = null;
      const file = f.get("file") as File | null;
      if (mode === "file" && file?.size) {
        if (file.size > 500 * 1024 * 1024) throw new Error("That file is over 500 MB. Trim it or paste a link.");
        storage_path = `${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const up = await c.storage.from("clips").upload(storage_path, file);
        if (up.error) throw up.error;
      }
      const { error } = await c.from("clips").insert({
        submitted_by: user.id, title: f.get("title"), gamertag: f.get("gamertag"), platform: f.get("platform"), mode: f.get("mode"),
        storage_path, source_url: mode === "link" ? f.get("url") : null, consent_owner: true, consent_broadcast: true,
      });
      if (error) throw error;
      setState("sent");
    } catch (x) { setErr((x as Error).message); setState("error"); }
  }

  return (
    <>
      <PageHead kicker="Ministry of Highlights" title={<>Submit your<br /><span className="text-amber">glorious clip</span></>}
        sub="We review every clip. Approved ones run in the Highlight Reel around the clock, the best make Prime Time, and the week's top vote-getter opens Saturday's show." />
      <div className="mx-auto max-w-3xl px-4 py-12">
        {loading ? null : !user ? (
          <div className="panel p-8"><p className="display text-4xl">Sign in first</p>
            <p className="text-mute mt-2">So we can credit you on screen and tell you when your clip airs.</p>
            <Link href="/login?next=/submit" className="btn btn-live mt-6">Sign in</Link></div>
        ) : state === "sent" ? (
          <div className="slate p-8"><p className="display text-5xl">Clip received</p>
            <p className="text-mute mt-3">It&apos;s in the review queue. Approved clips usually air within a day; watch for your gamertag in the chyron.</p>
            <div className="mt-6 flex gap-3"><Link href="/clips" className="btn btn-live">See this week&apos;s clips</Link><button onClick={() => setState("idle")} className="btn btn-line">Send another</button></div></div>
        ) : (
          <form onSubmit={submit} className="grid gap-6">
            {!isLive && <p className="border border-amber/60 bg-amber/25 px-4 py-2 text-sm text-paper">Preview mode: the form works but nothing is saved.</p>}
            <label className="grid gap-1.5"><span className="l">What happens?</span>
              <input name="title" required maxLength={90} className="field" placeholder="1v4 clutch on the last tick of Hardpoint" /></label>
            <div className="grid sm:grid-cols-3 gap-5">
              <label className="grid gap-1.5"><span className="l">Platform</span>
                <select name="platform" className="field">{Object.entries(platformName).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
              <label className="grid gap-1.5"><span className="l">Mode</span>
                <select name="mode" className="field">{MODES.map((m) => <option key={m}>{m}</option>)}</select></label>
              <label className="grid gap-1.5"><span className="l">Gamertag shown on air</span>
                <input name="gamertag" required className="field" placeholder="Activision ID or gamertag" /></label>
            </div>
            <div>
              <div className="flex gap-5 mb-2">
                {(["link", "file"] as const).map((k) => <button key={k} type="button" onClick={() => setMode(k)}
                  className={`display text-lg ${mode === k ? "text-paper underline decoration-tally decoration-2 underline-offset-4" : "text-mute"}`}>{k === "link" ? "Paste a link" : "Upload a file"}</button>)}
              </div>
              {mode === "link"
                ? <input name="url" type="url" required className="field" placeholder="YouTube, TikTok, Twitch clip, Xbox or PlayStation share link" />
                : <input name="file" type="file" required accept="video/mp4,video/quicktime,video/webm" className="field file:mr-4 file:border-0 file:bg-tally file:px-3 file:py-1.5 file:font-bold file:text-white" />}
              <p className="text-xs text-mute mt-1.5">Under 60 seconds works best. No commercial music on top — we mute it or skip the clip.</p>
            </div>
            <fieldset className="grid gap-3 border border-rule p-4">
              <legend className="kicker px-2">Permission</legend>
              <label className="flex gap-3 items-start text-sm"><input type="checkbox" required className="mt-1 accent-[#e10600]" />
                This is my own gameplay. I&apos;m not sending someone else&apos;s stream or video.</label>
              <label className="flex gap-3 items-start text-sm"><input type="checkbox" required className="mt-1 accent-[#e10600]" />
                MW4 Live may edit this clip and show it on its live broadcasts (YouTube and Twitch), replays, highlight reels and social accounts, credited to my gamertag. I can ask for it to be removed at any time.</label>
            </fieldset>
            {state === "error" && <p role="alert" className="text-tally font-semibold">{err}</p>}
            <button disabled={state === "sending"} className="btn btn-live w-fit">{state === "sending" ? "Sending…" : "Send it in"}</button>
          </form>
        )}
      </div>
    </>
  );
}
