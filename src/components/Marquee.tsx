/**
 * Marquee — v5 bold
 * 多色、可 reverse、size sm/md/lg、variant ink/coral/light/paper。
 * size=lg 用大字體 + 低 padding。
 */
import type { CSSProperties, ReactNode } from "react";

type Variant = "ink" | "light" | "coral" | "paper";
type Size = "sm" | "md" | "lg";

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  variant = "ink",
  size = "sm",
  className = "",
}: {
  items: (string | ReactNode)[];
  speed?: number;
  reverse?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const loop = [...items, ...items];
  const trackStyle: CSSProperties = {
    animationDuration: `${speed}s`,
    animationName: reverse ? "marquee-x-reverse" : "marquee-x",
  };

  const bg: Record<Variant, string> = {
    ink:   "bg-[var(--color-ink)]",
    light: "bg-[var(--color-paper-2)] border-y border-[var(--color-line)]",
    coral: "bg-[var(--color-coral)]",
    paper: "bg-[var(--color-paper)] border-y border-[var(--color-line)]",
  };
  const fg: Record<Variant, string> = {
    ink:   "text-[var(--color-paper)]",
    light: "text-[var(--color-ink)]",
    coral: "text-white",
    paper: "text-[var(--color-ink)]",
  };

  // 大字版本：使用 marquee-bigs (Sans) / marquee-bigs-serif
  const textClass =
    size === "lg" ? "marquee-bigs" :
    size === "md" ? "font-mono uppercase tracking-[0.2em] text-[14px] sm:text-[16px] font-semibold" :
                     "font-mono uppercase tracking-[0.18em] text-[12px] sm:text-[13px] font-medium";
  const py = size === "lg" ? "py-6 sm:py-8" : size === "md" ? "py-4" : "py-3.5";
  const gap = size === "lg" ? "gap-10 sm:gap-14" : size === "md" ? "gap-8" : "gap-8";

  return (
    <div className={`relative overflow-hidden ${bg[variant]} ${fg[variant]} ${className}`}>
      <div
        className={`flex ${gap} ${py} whitespace-nowrap will-change-transform marquee-track ${textClass}`}
        style={trackStyle}
      >
        {loop.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-8 shrink-0">
            <Slot content={t} i={i} variant={variant} />
            <Sep variant={variant} size={size} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Slot({ content, i, variant }: { content: ReactNode; i: number; variant: Variant }) {
  if (typeof content === "string") {
    const slot = i % 3;
    let accentClass: string;
    if (variant === "ink") {
      accentClass =
        slot === 1 ? "text-[var(--color-coral)]" :
        slot === 2 ? "text-[var(--color-amber)]" :
                     "text-[var(--color-accent-soft)]";
    } else if (variant === "coral") {
      accentClass =
        slot === 1 ? "text-[var(--color-paper)] opacity-90" :
        slot === 2 ? "text-[var(--color-amber)]" :
                     "text-white";
    } else {
      accentClass =
        slot === 1 ? "text-[var(--color-coral)]" :
        slot === 2 ? "text-[var(--color-coral-hover)]" :
                     "text-[var(--color-accent)]";
    }
    return <span className={accentClass}>{content}</span>;
  }
  return <>{content}</>;
}

function Sep({ variant, size }: { variant: Variant; size: Size }) {
  const accent =
    variant === "ink" ? "var(--color-amber)" :
    variant === "coral" ? "var(--color-paper)" :
                          "var(--color-coral)";
  if (size === "lg") {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden className="opacity-80">
        <circle cx="16" cy="16" r="6" fill={accent} />
      </svg>
    );
  }
  return <span aria-hidden className="opacity-80" style={{ color: accent }}>✦</span>;
}
