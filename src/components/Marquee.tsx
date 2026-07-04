/**
 * Marquee — a single-row, slow-scrolling strip of text used as a
 * section divider. Pure CSS animation, pauses on hover, and
 * respects the user's reduced-motion preference.
 */
export function Marquee({
  items,
  speed = 36,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  // duplicate to make the loop seamless
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-ink)] text-[var(--color-paper)] ${className}`}
    >
      <div
        className="flex gap-12 py-4 whitespace-nowrap will-change-transform marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12 font-mono text-[12px] sm:text-[14px] tracking-[0.18em] uppercase">
            <span>{t}</span>
            <span className="text-[var(--color-accent)]" aria-hidden>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-x linear infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
