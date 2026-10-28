"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { castVote, myVote, weekClips, useUser, type Clip } from "@/lib/data";
import { ClipSlate } from "@/components/TopClips";
import { PageHead } from "@/components/Mark";
import { isLive } from "@/lib/supabase";

export default function ClipsPage() {
  const { user } = useUser();
  const [clips, setClips] = useState<Clip[]>([]);
  const [mine, setMine] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  useEffect(() => { weekClips().then(setClips); myVote().then(setMine); }, []);

  async function vote(c: Clip) {
    if (!user) { location.href = "/login?next=/clips"; return; }
    const err = await castVote(c.id);
    if (err) { setMsg(err); return; }
    setClips((cs) => cs.map((x) => x.id === c.id ? { ...x, votes: x.votes + 1 } : x.id === mine ? { ...x, votes: x.votes - 1 } : x).sort((a, b) => b.votes - a.votes));
    setMine(c.id); setMsg(`Vote locked in for “${c.title}”. You can move it any time this week.`);
  }

  return (
    <>
      <PageHead kicker="Clip of the week" title={<>The People&apos;s<br /><span className="text-amber">Vote</span></>}
        sub="Every approved clip plays in the Highlight Reel. The top three are named Heroes of the Week and open Saturday's Prime Time. One comrade, one vote, movable until Sunday 23:59 ET. Results are not decided in advance. We know that's unusual." />
      <div className="mx-auto max-w-7xl px-4 py-12">
        {!isLive && <p className="mb-8 border border-amber/60 bg-amber/25 px-4 py-2 text-sm text-paper">Preview mode: sample clips with made-up gamertags. Connect Supabase to go live.</p>}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <p className="text-mute">{clips.length} clips in this week&apos;s vote</p>
          <Link href="/submit" className="btn btn-live">Send a clip</Link>
        </div>
        {msg && <p role="status" className="mb-6 panel px-4 py-3 text-sm">{msg}</p>}
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((c, i) => (
            <li key={c.id} className="panel">
              <ClipSlate c={c} rank={i < 3 ? i + 1 : undefined} />
              <div className="p-4">
                <p className="font-semibold leading-snug">{c.title}</p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="text-sm text-mute">{c.gamertag}</span>
                  <button onClick={() => vote(c)} aria-pressed={mine === c.id}
                    className={`btn !py-1.5 !px-3 !text-sm ${mine === c.id ? "btn-live" : "btn-line"}`}>
                    <span className="tc">{c.votes}</span>{mine === c.id ? "★ Your vote" : "Vote"}</button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
