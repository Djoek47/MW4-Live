"use client";
import { useEffect, useState } from "react";
import { CHANNEL, YOUTUBE_CHANNEL_ID, PRIMARY, platforms, type Platform } from "@/lib/content";

/** Twitch's embed requires every parent hostname the page is served from; we pass the current one at runtime. */
function useHost() {
  const [h, setH] = useState<string | null>(null);
  useEffect(() => setH(location.hostname), []);
  return h;
}

const SRC: Record<Platform, (host: string) => string> = {
  twitch: (host) => `https://player.twitch.tv/?channel=${CHANNEL}&parent=${host}&muted=true&autoplay=true`,
  // live_stream?channel= always shows the channel's current live broadcast (or its offline state)
  youtube: () => `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&mute=1`,
};

/** Shared across the page so the player and chat follow the same switch. */
let current: Platform = PRIMARY;
const subs = new Set<(p: Platform) => void>();
export function usePlatform() {
  const [p, setP] = useState<Platform>(current);
  useEffect(() => { subs.add(setP); return () => { subs.delete(setP); }; }, []);
  return [p, (n: Platform) => { current = n; subs.forEach((f) => f(n)); }] as const;
}

export function PlatformSwitch() {
  const [p, set] = usePlatform();
  if (platforms.length < 2) return null;
  return (
    <div role="tablist" aria-label="Watch on" className="inline-flex border-2 border-paper">
      {platforms.map((k) => (
        <button key={k} role="tab" aria-selected={p === k} onClick={() => set(k)}
          className={`display px-3 py-1 text-sm ${p === k ? "bg-tally text-cream" : "hover:bg-panel-2"}`}>{k === "twitch" ? "Twitch" : "YouTube"}</button>
      ))}
    </div>
  );
}

export function TwitchPlayer({ className = "" }: { className?: string }) {
  const host = useHost();
  const [p] = usePlatform();
  return (
    <div className={`relative aspect-video bg-black ${className}`}>
      {host ? (
        <iframe key={p} title={`MW4 Live on ${p === "twitch" ? "Twitch" : "YouTube"}`} allowFullScreen allow="autoplay; encrypted-media; picture-in-picture"
          className="absolute inset-0 size-full bg-black" style={{ colorScheme: "light" }} src={SRC[p](host)} />
      ) : <div className="absolute inset-0 grid place-items-center text-cream/60 tc text-xs">Connecting to the feed…</div>}
    </div>
  );
}

export function TwitchChat({ className = "" }: { className?: string }) {
  const host = useHost();
  const [p] = usePlatform();
  if (!host) return <div className={`bg-panel ${className}`} />;
  if (p === "youtube") return (
    <div className={`bg-panel grid place-items-center text-center p-8 ${className}`}>
      <div>
        <p className="display text-3xl">Chat lives on YouTube</p>
        <p className="text-mute mt-2 text-sm">YouTube only allows embedding chat for a single video, not a channel.</p>
        <a href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}/live`} target="_blank" rel="noreferrer" className="btn btn-live mt-5">Open live chat</a>
      </div>
    </div>
  );
  return <iframe title="Twitch chat" className={`bg-panel ${className}`} src={`https://www.twitch.tv/embed/${CHANNEL}/chat?parent=${host}&darkpopout`} />;
}

export function FollowLink({ className = "" }: { className?: string }) {
  const [p] = usePlatform();
  const href = p === "youtube" ? `https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}?sub_confirmation=1` : `https://www.twitch.tv/${CHANNEL}`;
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{p === "youtube" ? "Subscribe for live alerts" : "Follow for go-live alerts"}</a>;
}
