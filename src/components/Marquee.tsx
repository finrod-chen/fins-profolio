/**
 * Marquee — v4 active
 * 多色三件組，可選 reverse / dark。
 * speed: 跑完一圈的秒數（越大越慢）。
 * variant: "ink" (深色背景 + 桃 / 桃黃 / 藍), "light" (paper 底 + 三色字), "coral" (桃底 + 紙白字)
 */
import type { CSSProperties } from "react";

type Variant = "ink" | "light" | "coral";

export function Marquee({
  items,
  speed = 40,
  reverse = false,
  variant = "ink",
  className = "",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  variant?: Variant;
  className?: string;
}) {
  const loop = [...items, ...items];
  const trackStyle: CSSProperties = {
    animationDuration: `${speed}s`,
    animationName: reverse ? "marquee-x-reverse" : "marquee-x",
  };

  // Per-variant palette
  const bg: Record<Variant, string> = {
    ink:   "bg-[var(--color-ink)]",
    light: "bg-[var(--color-paper-2)] border-y border-[var(--color-line)]",
    coral: "bg-[var(--color-coral)]",
  };
  const fg: Record<Variant, string> = {
    ink:   "text-[var(--color-paper)]",
    light: "text-[var(--color-ink)]",
    coral: "text-white",
  };
  // 隨 i 輪流三色：藍 / 桃 / 桃黃 (ink & light)；coral 變體用 paper 與 deep
  const accentClass = (i: number): string => {
    const slot = i % 3;
    if (variant === "ink") {
      return slot === 0 ? "text-[var(--color-accent-soft)]"
           : slot === 1 ? "text-[var(--color-coral)]"
           :              "text-[var(--color-amber)]";
    }
    if (variant === "coral") {
      return slot === 0 ? "text-white"
           : slot === 1 ? "text-[var(--color-paper)] opacity-90"
           :              "text-[var(--color-amber)]";
    }
    // light
    return slot === 0 ? "text-[var(--color-accent)]"
         : slot === 1 ? "text-[var(--color-coral)]"
         :              "text-[var(--color-coral-hover)]";
  };

  return (
    <div
      className={`relative overflow-hidden ${bg[variant]} ${fg[variant]} ${className}`}
    >
      <div
        className="flex gap-8 py-3.5 whitespace-nowrap will-change-transform marquee-track font-mono uppercase tracking-[0.18em] text-[12px] sm:text-[13px] font-medium"
        style={trackStyle}
      >
        {loop.map((t, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 shrink-0"
          >
            <span className={i % 3 === 0 ? "" : accentClass(i)}>{t}</span>
            <span aria-hidden className={`${accentClass(i)} opacity-80`}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
