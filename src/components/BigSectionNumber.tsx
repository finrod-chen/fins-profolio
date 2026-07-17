import type { ReactNode } from "react";

/**
 * BigSectionNumber — 章節編號 + 標題。
 * 編號大字藍 50px+，標題 serif。
 */
export function BigSectionNumber({
  number,
  label,
  title,
  tone = "accent",
  right,
}: {
  number: string;
  label: string;
  title: ReactNode;
  tone?: "accent" | "coral" | "amber" | "ink";
  right?: ReactNode;
}) {
  const toneCls: Record<string, string> = {
    accent: "text-[var(--color-accent)]",
    coral:  "text-[var(--color-coral)]",
    amber:  "text-[var(--color-amber)]",
    ink:    "text-[var(--color-ink)]",
  };
  return (
    <header className="flex items-end justify-between gap-6 mb-10 sm:mb-14 flex-wrap">
      <div className="flex items-end gap-4 sm:gap-6 min-w-0">
        <span className={`chapter-number ${toneCls[tone]} text-[clamp(56px,8vw,120px)]`}>
          {number}
        </span>
        <span className="pb-3">
          <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
            {label}
          </span>
          <h2 className="font-serif font-semibold leading-[1.05] tracking-tight text-[var(--color-ink)] text-[clamp(28px,3.4vw,48px)]">
            {title}
          </h2>
        </span>
      </div>
      {right && <div className="pb-3">{right}</div>}
    </header>
  );
}
