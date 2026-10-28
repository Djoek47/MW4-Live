"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { sb, isLive } from "@/lib/supabase";
import { useUser, SAMPLE_CLIPS, SAMPLE_GUESTS, platformName, type Clip, type GuestApp } from "@/lib/data";

type Tab = "clips" | "guests";
const GUEST_STATES: GuestApp["status"][] = ["new", "contacted", "booked", "aired", "declined"];

export default function Admin() {
  const { profile, loading } = useUser();
  const [tab, setTab] = useState<Tab>("clips");
  const [clips, setClips] = useState<Clip[]>([]);
  const [guests, setGuests] = useState<GuestApp[]>([]);
  const [i, setI] = useState(0);

  const load = useCallback(async () => {
    const c = sb();
    if (!c) { setClips(SAMPLE_CLIPS.filter((x) => x.status === "pending").concat(SAMPLE_CLIPS.slice(1, 3).map((x) => ({ ...x, id: x.id + "p", status: "pending" as const })))); setGuests(SAMPLE_GUESTS); return; }
    const [a, b] = await Promise.all([
      c.from("clip_scores").select("*").eq("status", "pending").order("created_at"),
      c.from("guest_applications").select("*").order("created_at", { ascending: false }),
    ]);
    setClips((a.data as Clip[]) ?? []); setGuests((b.data as GuestApp[]) ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const review = useCallback(async (status: "approved" | "rejected", reason?: string) => {
    const clip = clips[i]; if (!clip) return;
    await sb()?.from("clips").update({ status, reject_reason: reason ?? null }).eq("id", clip.id);
    setClips((cs) => cs.filter((x) => x.id !== clip.id)); setI((n) => Math.max(0, Math.min(n, clips.length - 2)));
  }, [clips, i]);

  // Keyboard: A approve · R reject · J/K next/prev
  useEffect(() => {
    if (tab !== "clips") return;
    const k = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName.match(/INPUT|TEXTAREA|SELECT/)) return;
      if (e.key === "a") review("approved"); if (e.key === "r") review("rejected", "Not a fit for air");
      if (e.key === "j") setI((n) => Math.min(n + 1, clips.length - 1)); if (e.key === "k") setI((n) => Math.max(n - 1, 0));
    };
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [tab, clips.length, review]);

  async function setGuest(g: GuestApp, status: GuestApp["status"]) {
    await sb()?.from("guest_applications").update({ status }).eq("id", g.id);
    setGuests((gs) => gs.map((x) => x.id === g.id ? { ...x, status } : x));
  }

  async function clipUrl(c: Clip) {
    if (c.source_url) return window.open(c.source_url, "_blank");
    const s = await sb()?.storage.from("clips").createSignedUrl(c.storage_path!, 3600);
    if (s?.data) window.open(s.data.signedUrl, "_blank");
  }

  if (loading) return null;
  if (!profile?.is_admin) return <div className="mx-auto max-w-xl px-4 py-24"><h1 className="display text-6xl">Staff only</h1><Link href="/login?next=/admin" className="btn btn-live mt-6">Sign in</Link></div>;
  const cur = clips[i];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {!isLive && <p className="mb-6 border border-amber/60 bg-amber/25 px-4 py-2 text-sm text-paper">Preview mode: sample queue, actions aren&apos;t saved.</p>}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="kicker">Control room</p><h1 className="display text-6xl mt-2">Run the network</h1></div>
        <div role="tablist" className="flex border border-rule">
          {([["clips", `Clip queue · ${clips.length}`], ["guests", `Guests · ${guests.filter((g) => g.status === "new").length} new`]] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`px-4 py-2 display text-lg ${tab === k ? "bg-tally text-white" : "text-mute"}`}>{l}</button>))}
        </div>
      </div>

      {tab === "clips" ? (
        !cur ? <p className="mt-10 panel p-8 text-mute">Queue is empty. Nice.</p> : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="slate p-6">
              <p className="tc text-xs text-mute">{i + 1} / {clips.length} · sent {new Date(cur.created_at).toLocaleString("en-US", { timeZone: "America/Toronto" })} ET</p>
              <p className="display text-5xl mt-3">{cur.title}</p>
              <p className="mt-3 text-mute">{cur.gamertag} · {platformName[cur.platform]} · {cur.mode}</p>
              <ul className="mt-6 grid gap-2 text-sm">
                {["Gameplay is the sender's (gamertag on screen matches)", "No commercial music / we can mute it", "No slurs, cheats or exploit tutorials", "Worth airing: clear, under ~60 s"].map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-tally">□</span>{c}</li>))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => clipUrl(cur)} className="btn btn-line">Open clip</button>
                <button onClick={() => review("approved")} className="btn btn-live">Approve <kbd className="tc text-xs opacity-70">A</kbd></button>
                <button onClick={() => review("rejected", "Not a fit for air")} className="btn btn-line">Reject <kbd className="tc text-xs opacity-70">R</kbd></button>
              </div>
            </div>
            <ol className="panel divide-y divide-rule max-h-[28rem] overflow-auto">
              {clips.map((c, k) => <li key={c.id}><button onClick={() => setI(k)} className={`w-full text-left px-4 py-3 ${k === i ? "bg-panel-2" : ""}`}><span className="font-semibold block truncate">{c.title}</span><span className="text-xs text-mute">{c.gamertag}</span></button></li>)}
            </ol>
          </div>
        )
      ) : (
        <div className="mt-8 grid gap-4">
          {guests.map((g) => (
            <div key={g.id} className="panel p-5 grid md:grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="display text-3xl">{g.name} <span className="text-mute text-xl">{g.handle}</span></p>
                <p className="text-sm text-mute mt-1"><a href={g.platform_url} target="_blank" rel="noreferrer" className="underline">{g.platform_url}</a> · {g.followers ?? "?"} followers · free {g.availability ?? "?"} · {g.contact}</p>
                <p className="mt-3">{g.pitch}</p>
              </div>
              <select value={g.status} onChange={(e) => setGuest(g, e.target.value as GuestApp["status"])} className="field !w-40 h-fit">
                {GUEST_STATES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          ))}
          {!guests.length && <p className="panel p-8 text-mute">No guest requests yet.</p>}
        </div>
      )}
      <p className="mt-10 text-xs text-mute">Shortcuts: A approve · R reject · J/K next/prev. Make yourself staff in Supabase: <span className="tc">update profiles set is_admin = true where id = &apos;…&apos;;</span></p>
    </div>
  );
}
