import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { OnAirBar, Ticker } from "@/components/OnAir";
import { Lockup, SocialRow } from "@/components/Mark";
import { ThemeToggle, themeScript } from "@/components/ThemeToggle";
import { NavAuth } from "@/components/NavAuth";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mw4live.com"),
  title: { default: "MW4 Live — the Modern Warfare 4 network, on air 24/7", template: "%s · MW4 Live" },
  description: "A 24/7 Modern Warfare 4 channel on YouTube and Twitch: five live shows a day, creator interviews, community clips and labelled replays in between.",
  openGraph: { images: ["/brand/og-1200x630.png"] },
};

const nav = [
  { href: "/watch", label: "Watch" },
  { href: "/schedule", label: "Schedule" },
  { href: "/shows", label: "Shows" },
  { href: "/clips", label: "Clips" },
  { href: "/guests", label: "Guests" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 bg-studio/95 backdrop-blur border-b-2 border-paper">
          <div className="border-b border-rule">
            <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4 sm:gap-6">
              <Link href="/" aria-label="MW4 Live home" className="shrink-0"><Lockup /></Link>
              <nav className="hidden md:flex gap-6">
                {nav.map((n) => <Link key={n.href} href={n.href} className="display text-lg tracking-wide text-mute hover:text-paper">{n.label}</Link>)}
              </nav>
              <div className="ml-auto flex items-center gap-2">
                <Link href="/submit" className="btn btn-live !py-2 !px-4 !text-sm hidden sm:inline-flex">Send a clip</Link>
                <ThemeToggle />
                <NavAuth />
              </div>
            </div>
            <nav className="md:hidden flex gap-5 overflow-x-auto px-4 pb-2">
              {nav.map((n) => <Link key={n.href} href={n.href} className="display text-base text-mute shrink-0">{n.label}</Link>)}
            </nav>
          </div>
          <OnAirBar />
        </header>
        <main className="flex-1">{children}</main>
        <Ticker />
        <footer className="bg-asphalt text-cream [&_.text-mute]:text-cream/60 [&_a]:border-cream/40">
          <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <Lockup big />
              <p className="mt-4 text-mute max-w-md">The People&apos;s Broadcast of Modern Warfare 4. Live shows every day, replays clearly labelled in between, and the community on screen.</p>
              <SocialRow className="mt-5" />
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="kicker !text-mute mb-1">Network</p>
              {nav.map((n) => <Link key={n.href} href={n.href} className="hover:text-tally">{n.label}</Link>)}
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="kicker !text-mute mb-1">Channel</p>
              <Link href="/about" className="hover:text-tally">About &amp; contact</Link>
              <Link href="/about#rules" className="hover:text-tally">Clip &amp; guest terms</Link>
              <Link href="/admin" className="hover:text-tally">Control room</Link>
            </div>
          </div>
          <p className="mx-auto max-w-7xl px-4 pb-10 text-xs text-mute">
            MW4 Live is an independent, fan-run broadcast. The &ldquo;People&apos;s Republic of MW4&rdquo; is a joke: it has no flag, no leader and no territory beyond the comment section. MW4 Live is not affiliated with, endorsed or sponsored by Activision Publishing, Inc. or the Call of Duty franchise. Call of Duty and Modern Warfare are trademarks of Activision; all other trademarks belong to their owners.
          </p>
        </footer>
      </body>
    </html>
  );
}
