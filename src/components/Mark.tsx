import Link from "next/link";
import { PlatformIcon } from "./Icons";
import { SOCIALS } from "@/lib/content";
import { Star } from "./Poster";

export function Mark({ className = "text-2xl" }: { className?: string }) {
  return <span className={`mark ${className}`}><b>MW4</b><span>LIVE</span></span>;
}

/** The state seal (public/brand/seal.svg, built by brand/seal.py). */
export function Seal({ className = "size-12" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/seal.svg" alt="" className={`seal shrink-0 ${className}`} />;
}

/** Header/footer lockup: seal + wordmark. The tagline drops under the mark on phones so the row fits 360px. */
export function Lockup({ big = false }: { big?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <Seal className={big ? "size-16" : "size-10 sm:size-11"} />
      <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 leading-none">
        <Mark className={big ? "text-3xl" : "text-xl sm:text-[26px]"} />
        <span className={`kicker !tracking-[.18em] !text-mute ${big ? "" : "hidden lg:inline"} mt-1 sm:mt-0 !text-[.68rem]`}>The People&apos;s Broadcast</span>
      </span>
    </span>
  );
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
