"use client";
import { useEffect, useState } from "react";
import { CHANNEL } from "@/lib/content";

/** Twitch's embed requires every parent hostname the page is served from; we pass the current one at runtime. */
function useHost() {
  const [h, setH] = useState<string | null>(null);
  useEffect(() => setH(location.hostname), []);
  return h;
}

export function TwitchPlayer({ className = "" }: { className?: string }) {
  const host = useHost();
  return (
    <div className={`relative aspect-video bg-black ${className}`}>
      {host ? (
        <iframe title="MW4 Live on Twitch" allowFullScreen className="absolute inset-0 size-full bg-black"
          src={`https://player.twitch.tv/?channel=${CHANNEL}&parent=${host}&muted=true&autoplay=true`} />
      ) : <div className="absolute inset-0 grid place-items-center text-mute tc text-xs">Connecting to the feed…</div>}
    </div>
  );
}

export function TwitchChat({ className = "" }: { className?: string }) {
  const host = useHost();
  if (!host) return <div className={`bg-panel ${className}`} />;
  return <iframe title="Twitch chat" className={`bg-panel ${className}`} src={`https://www.twitch.tv/embed/${CHANNEL}/chat?parent=${host}&darkpopout`} />;
}
