/**
 * Marquee — single-row scrolling text strip, used as a section
 * divider. Monochrome (ink on paper-2). Pauses on hover;
 * respects prefers-reduced-motion.
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
      className={`relative overflow-hidden border-y border-[var(--color-line)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] ${className}`}
    >
      <div
        className="flex gap-10 py-3 whitespace-nowrap will-change-transform marquee-track font-mono uppercase tracking-[0.18em] text-[12px]"
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-10"
          >
            <span>{t}</span>
            <span aria-hidden className="text-[var(--color-accent)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
