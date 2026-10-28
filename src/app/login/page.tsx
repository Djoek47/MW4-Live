"use client";
import { useState } from "react";
import { sb } from "@/lib/supabase";
import { Mark } from "@/components/Mark";

export default function Login() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  const redirect = () => `${location.origin}${new URLSearchParams(location.search).get("next") ?? "/clips"}`;
  async function email(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const c = sb(); if (!c) { setSent(true); return; }
    const { error } = await c.auth.signInWithOtp({ email: String(new FormData(e.currentTarget).get("email")), options: { emailRedirectTo: redirect() } });
    if (error) setErr(error.message); else setSent(true);
  }
  const oauth = async (provider: "twitch" | "discord" | "google") => { await sb()?.auth.signInWithOAuth({ provider, options: { redirectTo: redirect() } }); };
  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <Mark className="text-3xl" />
      <h1 className="display text-6xl mt-6">Sign in</h1>
      <p className="text-mute mt-2">One account to send clips, vote, and request a guest seat.</p>
      <div className="mt-8 grid gap-3">
        <button onClick={() => oauth("twitch")} className="btn bg-[#9146FF] text-white">Continue with Twitch</button>
        <button onClick={() => oauth("discord")} className="btn bg-[#5865F2] text-white">Continue with Discord</button>
        <button onClick={() => oauth("google")} className="btn btn-line">Continue with Google</button>
      </div>
      <p className="my-6 text-sm text-mute">or get a link by email</p>
      {sent ? <p className="font-semibold text-tally">Check your inbox for the sign-in link.</p> : (
        <form onSubmit={email} className="flex gap-2"><input name="email" type="email" required placeholder="you@example.com" className="field" /><button className="btn btn-live shrink-0">Send</button></form>
      )}
      {err && <p role="alert" className="mt-3 text-tally">{err}</p>}
    </div>
  );
}
