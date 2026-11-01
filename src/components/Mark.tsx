import Link from "next/link";
import { PlatformIcon } from "./Icons";
import { SOCIALS } from "@/lib/content";
import { Star } from "./Poster";
import { SeoulParade } from "./Seoul";

export type ZoneName = "ops" | "north" | "south";

export function Mark({ className = "text-2xl" }: { className?: string }) {
  return <span className={`mark ${className}`}><b>MW4</b><span>LIVE</span></span>;
}

/** The unit patch — main logo (public/brand/patch.svg, built by brand/patch.py). */
export function Patch({ className = "size-12" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/patch.svg" alt="" className={`patch shrink-0 ${className}`} />;
}

/** The North's state seal (public/brand/seal.svg). Used on the propaganda pages only. */
export function Seal({ className = "size-12" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/seal.svg" alt="" className={`seal shrink-0 ${className}`} />;
}

/** Header/footer lockup: patch + wordmark. The tagline hides on small screens so the row fits 360px. */
export function Lockup({ big = false }: { big?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <Patch className={big ? "size-16" : "size-10 sm:size-11"} />
      <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 leading-none">
        <Mark className={big ? "text-3xl" : "text-xl sm:text-[26px]"} />
        <span className={`kicker !tracking-[.18em] !text-mute ${big ? "" : "hidden lg:inline"} mt-1 sm:mt-0 !text-[.68rem]`}>24/7 · <span className="ko !tracking-normal">생방송</span></span>
      </span>
    </span>
  );
}

/** Wrap a page (or a section) in a zone: it swaps the whole colour set. */
export function Zone({ name, children, className = "" }: { name: ZoneName; children: React.ReactNode; className?: string }) {
  return <div data-zone={name} className={className}>{children}</div>;
}

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {SOCIALS.map((s) => (
        <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
          className="size-11 grid place-items-center border-2 border-paper hover:bg-tally hover:text-on-tally transition-colors">
          <PlatformIcon name={s.id} className="size-[18px]" />
        </a>
      ))}
    </div>
  );
}

type Head = { kicker: string; title: React.ReactNode; sub?: React.ReactNode; zone?: ZoneName; ko?: string };

/** Page header in the style of its zone. `ko` = a short Korean line (shown in South and North). */
export function PageHead({ kicker, title, sub, zone = "north", ko }: Head) {
  if (zone === "ops") return (
    <header className="ops-hero relative overflow-hidden border-b-[3px] border-[#ffcd00]">
      <div className="hazard h-2" />
      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="hud border border-[#ffcd00]/30 px-5 py-8 md:px-10 md:py-12">
          <p className="tc text-[11px] text-[#ffcd00] flex flex-wrap gap-x-5 gap-y-1"><span>▲ {kicker.toUpperCase()}</span><span className="opacity-60">GRID 52S DG 3381 4529</span><span className="opacity-60">CH-24/7</span></p>
          <h1 className="display huge text-6xl md:text-8xl mt-4 text-[#f2efe4]">{title}</h1>
          {sub && <p className="text-[#f2efe4]/75 text-lg mt-4 max-w-2xl">{sub}</p>}
        </div>
      </div>
      <div className="h-4 ticks opacity-70" />
    </header>
  );
  if (zone === "south") return (
    <header className="south-hero relative overflow-hidden">
      {ko && <p aria-hidden className="ko absolute inset-x-0 -top-6 md:-top-10 text-center text-[7rem] md:text-[13rem] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.08)] select-none">{ko}</p>}
      <div className="relative mx-auto max-w-5xl px-4 pt-14 pb-10 md:pt-20 text-center">
        <p className="caption cyan text-sm md:text-base">{kicker}</p>
        <h1 className="display huge text-6xl md:text-8xl mt-5 neon">{title}</h1>
        {sub && <p className="text-[#fff6fb]/85 text-lg mt-5 max-w-2xl mx-auto">{sub}</p>}
        <SeoulParade className="mt-10" />
      </div>
      <div className="h-1 bg-gradient-to-r from-[#ff2d87] via-[#b18cff] to-[#00e1ff]" />
    </header>
  );
  return (
    <header className="relative overflow-hidden rays text-cream border-b-[6px] border-paper">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep/60" />
      <div className="relative mx-auto max-w-5xl px-4 py-14 md:py-20 text-center">
        <div className="flex justify-center mb-5"><Seal className="size-20 md:size-24" /></div>
        <p className="kicker !text-amber !tracking-[.3em] flex items-center justify-center gap-3"><Star className="size-4" />{kicker}<Star className="size-4" /></p>
        <h1 className="display huge text-6xl md:text-8xl mt-4 [text-shadow:5px_5px_0_var(--deep)]">{title}</h1>
        {ko && <p className="ko text-2xl md:text-3xl text-amber mt-3">{ko}</p>}
        {sub && <p className="text-cream/90 text-lg mt-5 max-w-2xl mx-auto">{sub}</p>}
      </div>
    </header>
  );
}

export { Link };
