/**
 * SectionLabel — minimal document-style section header.
 * H2 serif title left + mono meta right + a single hairline below.
 */
export function SectionLabel({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      {meta && <span className="section-meta">{meta}</span>}
    </div>
  );
}
