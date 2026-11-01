/** Seoul-at-night illustrations for the SOUTH zone. Original drawings, flat neon style. */
type P = { className?: string };

export const Ramyeon = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <path d="M38 4 L30 30 M46 6 L34 30" stroke="#f2c14e" strokeWidth="3" strokeLinecap="round" />
    <path d="M8 30 h48 a24 22 0 0 1 -48 0z" fill="#ff2d87" />
    <path d="M8 30 h48" stroke="#fff" strokeWidth="3" />
    <path d="M14 30 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0 q4 -8 8 0" fill="none" stroke="#ffe08a" strokeWidth="3" />
    <circle cx="22" cy="26" r="5" fill="#fff" /><circle cx="22" cy="26" r="2.2" fill="#ffb000" />
    <path d="M18 40 h28" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M22 54 h20 l-2 5 h-16z" fill="#c2177a" />
  </svg>
);

export const Kimchi = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <ellipse cx="32" cy="12" rx="12" ry="4" fill="#7a4a2a" />
    <path d="M20 12 q-14 10 -10 30 q4 16 22 16 q18 0 22 -16 q4 -20 -10 -30z" fill="#9b5d33" />
    <path d="M14 30 q18 8 36 0" stroke="#c98a5a" strokeWidth="3" fill="none" />
    <path d="M24 8 q8 -10 16 0" fill="#e0262c" /><path d="M28 6 q4 -6 8 0" fill="#6fcf6f" />
    <text x="32" y="47" textAnchor="middle" fontSize="11" fill="#ffe08a" fontFamily="Do Hyeon">김치</text>
  </svg>
);

export const Soju = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <rect x="27" y="4" width="10" height="8" rx="2" fill="#2fb36b" />
    <path d="M27 12 h10 v6 q8 4 8 12 v26 q0 4 -4 4 h-18 q-4 0 -4 -4 v-26 q0 -8 8 -12z" fill="#3ed68a" fillOpacity=".85" />
    <rect x="21" y="32" width="22" height="16" rx="2" fill="#fff" />
    <text x="32" y="44" textAnchor="middle" fontSize="10" fill="#1f7a4a" fontFamily="Do Hyeon">소주</text>
    <path d="M24 20 v8" stroke="#fff" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Lightstick = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <circle cx="32" cy="20" r="17" fill="#00e1ff" fillOpacity=".25" />
    <circle cx="32" cy="20" r="12" fill="#fff" stroke="#00e1ff" strokeWidth="3" />
    <path d="M32 26 l-6 -6 a4 4 0 0 1 6 -5 a4 4 0 0 1 6 5z" fill="#ff2d87" />
    <rect x="28" y="32" width="8" height="28" rx="3" fill="#b18cff" />
    <path d="M28 40 h8 M28 46 h8" stroke="#fff" strokeOpacity=".6" />
  </svg>
);

export const Mic = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <circle cx="24" cy="20" r="12" fill="#ffe600" />
    <path d="M17 14 l14 12 M14 20 l14 12 M20 10 l14 12" stroke="#20123a" strokeOpacity=".25" strokeWidth="2" />
    <path d="M32 28 l20 24 a4 4 0 0 1 -6 4 l-22 -22z" fill="#ff2d87" />
    <path d="M48 52 l6 6" stroke="#b18cff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Tteokbokki = ({ className = "size-20" }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden>
    <ellipse cx="32" cy="40" rx="26" ry="12" fill="#fff" />
    <ellipse cx="32" cy="38" rx="22" ry="9" fill="#e0262c" />
    {[[20, 36, -20], [30, 33, 15], [40, 37, -10], [28, 41, 30], [42, 32, 40]].map(([x, y, r], i) => (
      <rect key={i} x={x - 6} y={y - 2.5} width="12" height="5" rx="2.5" fill="#ffd2c0" transform={`rotate(${r} ${x} ${y})`} />
    ))}
    <path d="M46 10 l-8 26 M52 12 l-10 24" stroke="#f2c14e" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/** A floating row of the illustrations, for hero banners. */
export function SeoulParade({ className = "" }: P) {
  const items = [Ramyeon, Lightstick, Kimchi, Mic, Soju, Tteokbokki];
  return (
    <div className={`flex justify-center gap-4 md:gap-8 ${className}`} aria-hidden>
      {items.map((C, i) => (
        <span key={i} className="bob inline-block" style={{ animationDelay: `${i * 0.35}s`, ["--r" as string]: `${i % 2 ? 6 : -6}deg` }}>
          <C className="size-12 md:size-20 drop-shadow-[0_0_14px_rgba(255,45,135,.45)]" />
        </span>
      ))}
    </div>
  );
}
