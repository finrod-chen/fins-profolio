/**
 * SectionLabel — editorial magazine-style section divider.
 * Centered label flanked by full-width rules. Optional numerals
 * (volume/issue) live in a side row.
 */
export function SectionLabel({
  label,
  meta,
  numeral,
}: {
  label: string;
  meta?: string;
  numeral?: string;
}) {
  return (
    <div data-reveal>
      <div className="mag-section-label">
        <span>{numeral ?? "§"}</span>
        <span className="rule" />
        <span>{label}</span>
      </div>
      {meta && (
        <div className="eyebrow -mt-3 mb-12 opacity-70">{meta}</div>
      )}
    </div>
  );
}
