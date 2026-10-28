"use client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { sb, isLive } from "./supabase";

export type Profile = { id: string; display_name: string; gamertag: string | null; platform: string | null; is_admin: boolean };
export type Clip = {
  id: string; title: string; gamertag: string; platform: "ps5" | "xbox" | "pc"; mode: string | null;
  storage_path: string | null; source_url: string | null; status: "pending" | "approved" | "rejected" | "aired";
  votes: number; week: string; created_at: string; submitted_by?: string; reject_reason?: string | null;
};
export type GuestApp = {
  id: string; name: string; handle: string; platform_url: string; followers: string | null; pitch: string;
  availability: string | null; contact: string; status: "new" | "contacted" | "booked" | "declined" | "aired";
  booked_for: string | null; show_slug: string | null; created_at: string;
};

export const platformName = { ps5: "PS5", xbox: "Xbox", pc: "PC" } as const;
export const MODES = ["Multiplayer", "Ranked", "Warzone", "Zombies", "Campaign"] as const;

// ---------- preview-mode sample data (no Supabase env) — clearly fake, never shown when live ----------
const day = 864e5;
const sample: [string, string, Clip["platform"], string, number, Clip["status"]][] = [
  ["1v4 clutch on the last tick of Hardpoint", "SampleOperator", "ps5", "Ranked", 214, "aired"],
  ["Throwing knife across the whole map", "PreviewPlayer", "xbox", "Multiplayer", 188, "approved"],
  ["Final circle, three squads, one plate left", "DemoSquadLead", "pc", "Warzone", 161, "approved"],
  ["Round 30 with a starting pistol", "TestRunner", "ps5", "Zombies", 97, "approved"],
  ["Longshot through two windows", "ExampleTag", "xbox", "Multiplayer", 64, "approved"],
  ["Spawn-flip that won the series", "PlaceholderPro", "pc", "Ranked", 41, "pending"],
];
export const SAMPLE_CLIPS: Clip[] = sample.map(([title, gamertag, platform, mode, votes, status], i) => ({
  id: `s${i}`, title, gamertag, platform, mode, votes, status, storage_path: null, source_url: null,
  week: "2026-10-26", created_at: new Date(Date.now() - (i + 1) * day / 3).toISOString(), submitted_by: i === 1 ? "demo" : "x",
}));
export const SAMPLE_GUESTS: GuestApp[] = [
  { id: "g1", name: "Sample Creator", handle: "@samplecreator", platform_url: "https://twitch.tv/", followers: "12k", pitch: "Ranked grinder, wants to debate the SMG meta.", availability: "Weeknights", contact: "discord: sample", status: "new", booked_for: null, show_slug: null, created_at: new Date().toISOString() },
  { id: "g2", name: "Preview Guest", handle: "@previewguest", platform_url: "https://youtube.com/", followers: "4k", pitch: "Zombies speedrunner, can show a live attempt.", availability: "Weekends", contact: "email", status: "booked", booked_for: new Date(Date.now() + day).toISOString(), show_slug: "war-room", created_at: new Date().toISOString() },
];

const DEMO_USER = { id: "demo", email: "preview@mw4.live" } as unknown as User;
const DEMO_PROFILE: Profile = { id: "demo", display_name: "Preview Admin", gamertag: "PreviewAdmin", platform: "ps5", is_admin: true };

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const c = sb();
    if (!c) { setUser(DEMO_USER); setProfile(DEMO_PROFILE); setLoading(false); return; }
    const load = async (u: User | null) => {
      setUser(u);
      if (u) { const { data } = await c.from("profiles").select("*").eq("id", u.id).single(); setProfile(data as Profile); }
      else setProfile(null);
      setLoading(false);
    };
    c.auth.getUser().then(({ data }) => load(data.user));
    const { data: sub } = c.auth.onAuthStateChange((_e, s) => load(s?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);
  return { user, profile, loading, demo: !isLive };
}

export async function weekClips(): Promise<Clip[]> {
  const c = sb(); if (!c) return SAMPLE_CLIPS.filter((x) => x.status !== "pending");
  const { data } = await c.from("clip_scores").select("*").in("status", ["approved", "aired"])
    .gte("week", new Date(Date.now() - 7 * day).toISOString().slice(0, 10)).order("votes", { ascending: false });
  return (data as Clip[]) ?? [];
}
export async function myVote(): Promise<string | null> {
  const c = sb(); if (!c) return null;
  const { data } = await c.from("votes").select("clip_id").order("created_at", { ascending: false }).limit(1).maybeSingle();
  return data?.clip_id ?? null;
}
export async function castVote(id: string): Promise<string | null> {
  const c = sb(); if (!c) return null;
  const { error } = await c.rpc("cast_vote", { p_clip: id });
  return error?.message ?? null;
}
