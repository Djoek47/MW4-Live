/** Five-point star, the poster's punctuation. */
export function Star({ className = "size-6", fill = "currentColor" }: { className?: string; fill?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden><path fill={fill} d="M12 1.5l3.09 7.26 7.86.68-5.97 5.18 1.8 7.68L12 18.27 5.22 22.3l1.8-7.68L1.05 9.44l7.86-.68z" /></svg>;
}

/** Centred heading with a star either side. Symmetry is the whole aesthetic. */
export function Decree({ kicker, children, className = "" }: { kicker?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`text-center ${className}`}>
      {kicker && <p className="kicker !text-tally">{kicker}</p>}
      <div className="mt-2 flex items-center justify-center gap-4 md:gap-6">
        <Star className="size-6 md:size-9 text-amber shrink-0" />
        <h2 className="display text-5xl md:text-7xl">{children}</h2>
        <Star className="size-6 md:size-9 text-amber shrink-0" />
      </div>
    </div>
  );
}

/** Red sunburst panel with cream type: used for page heads and the hero. */
export function RaysPanel({ children, className = "", origin = "bottom" }: { children: React.ReactNode; className?: string; origin?: "bottom" | "center" }) {
  return (
    <div className={`relative overflow-hidden text-cream ${origin === "center" ? "rays-c" : "rays"} ${className}`}>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep/60" />
      <div className="relative">{children}</div>
    </div>
  );
}
