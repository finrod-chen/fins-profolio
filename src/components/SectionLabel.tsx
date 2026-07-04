/**
 * SectionLabel — a small "spec sheet" style label that sits
 * above section headings. Numbered, monospaced, hairline-ruled.
 */
export function SectionLabel({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4 md:mb-6">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        § {index}
      </span>
      <span className="h-px flex-1 bg-[var(--color-line)]" />
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink-2)]">
        {label}
      </span>
      {meta && (
        <>
          <span className="h-px w-6 bg-[var(--color-line)]" />
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            {meta}
          </span>
        </>
      )}
    </div>
  );
}
