/**
 * SectionLabel — v4 active
 * 左 pill + 右 meta (opschip) + 右下裝飾小元素。
 * tone: "blue" (預設) / "coral" / "amber" / "ink" / "plain"
 */
import type { ReactNode } from "react";

const toneClass: Record<string, string> = {
  blue:  "is-blue",
  coral: "is-coral",
  amber: "is-amber",
  ink:   "is-ink",
  plain: "is-out",
};

export function SectionLabel({
  title,
  meta,
  tone = "blue",
  icon,
}: {
  title: string;
  meta?: ReactNode;
  tone?: "blue" | "coral" | "amber" | "ink" | "plain";
  icon?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-8 sm:mb-10">
      <div className="flex items-center gap-3 min-w-0">
        {icon && <span className="text-[var(--color-accent)] font-mono text-[13px]">{icon}</span>}
        <span className={`chip ${toneClass[tone]} shrink-0`}>{title}</span>
        <span aria-hidden className="hidden sm:block h-px w-12 sm:w-24 bg-[var(--color-line)]" />
      </div>
      {meta && (
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-mute)] shrink-0">
          {meta}
        </span>
      )}
    </div>
  );
}
