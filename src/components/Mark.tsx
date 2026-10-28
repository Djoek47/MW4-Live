import Link from "next/link";
import { PlatformIcon } from "./Icons";
import { SOCIALS } from "@/lib/content";
import { Star } from "./Poster";

export function Mark({ className = "text-2xl" }: { className?: string }) {
  return <span className={`mark ${className}`}><b>MW4</b><span>LIVE</span></span>;
}

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIALS.map((s) => (
        <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
          className="size-11 grid place-items-center border-2 border-paper hover:bg-tally hover:text-cream transition-colors">
          <PlatformIcon name={s.id} className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}

export function PageHead({ kicker, title, sub }: { kicker: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden rays text-cream border-b-[6px] border-paper">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep/60" />
      <div className="relative mx-auto max-w-5xl px-4 py-14 md:py-20 text-center">
        <p className="kicker !text-amber !tracking-[.3em] flex items-center justify-center gap-3"><Star className="size-4" />{kicker}<Star className="size-4" /></p>
        <h1 className="display huge text-6xl md:text-8xl mt-4 [text-shadow:5px_5px_0_var(--deep)]">{title}</h1>
        {sub && <p className="text-cream/90 text-lg mt-5 max-w-2xl mx-auto">{sub}</p>}
      </div>
    </header>
  );
}

export { Link };
