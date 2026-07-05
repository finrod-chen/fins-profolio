import type { CSSProperties } from "react";

/**
 * StatCard — v5
 * 大字數 + 右上角彩色 disc + rail。
 */
export function StatCard({
  n,
  label,
  rail = "var(--color-accent)",
  hint,
}: {
  n: string | number;
  label: string;
  rail?: string;
  hint?: string;
}) {
  return (
    <div
      className="stat-card group relative cursor-default"
      style={{ "--rail": rail } as CSSProperties}
    >
      <div
        aria-hidden
        className="absolute top-3 right-3 w-3 h-3 rounded-full"
        style={{ background: rail }}
      />
      <div className="stat-number tabular-nums">{n}</div>
      <div className="stat-label">{label}</div>
      {hint && (
        <div className="mt-2 text-[12px] text-[var(--color-ink-2)] leading-relaxed">{hint}</div>
      )}
    </div>
  );
}
