/**
 * Marquee — a single-row, slow-scrolling strip of text used as
 * a section divider. Two-color (corallo on indigo) for editorial
 * energy. Pauses on hover; respects reduced-motion.
 */
export function Marquee({
  items,
  speed = 50,
  className = "",
}: {
  items: string[];
  speed?: number;
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden border-y border-[var(--color-indigo)] bg-[var(--color-indigo)] text-[var(--color-paper)] ${className}`}
    >
      <div
        className="flex gap-12 py-4 whitespace-nowrap will-change-transform marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 font-display italic text-[14px] sm:text-[16px] tracking-[0.04em] text-[var(--color-accent-tint]"
          >
            <span>{t}</span>
            <span aria-hidden className="text-[var(--color-accent)] not-italic">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
