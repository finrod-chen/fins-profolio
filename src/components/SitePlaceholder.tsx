import type { Project } from "@/types";

/**
 * SitePlaceholder — when a real screenshot is not provided, we render
 * a minimal, "industrial-blueprint" SVG placeholder that always fits
 * the project, so the grid never looks empty or broken.
 */
export function SitePlaceholder({ project, className = "" }: { project: Project; className?: string }) {
  const accent = project.accent ?? "var(--color-ink)";
  const title = project.title.toUpperCase();
  const slug = project.id.toUpperCase();
  // CJK characters are full-width — detect any char above the CJK radicals
  // block so we can limit length and shrink the font to avoid overflow.
  const hasCJK = [...title].some((ch) => ch.charCodeAt(0) > 0x2e7f);
  const displayTitle = title.slice(0, hasCJK ? 4 : 7);
  const titleFontSize = hasCJK ? 52 : 64;
  // Deterministic "noise" lines for a blueprint feel
  const lines = Array.from({ length: 6 }, (_, i) => i * 14 + 8);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden
      >
        {/* paper */}
        <rect x="0" y="0" width="400" height="250" fill="var(--color-paper-2)" />

        {/* blueprint grid */}
        <defs>
          <pattern id={`grid-${project.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(10,10,10,0.06)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="400" height="250" fill={`url(#grid-${project.id})`} />

        {/* fake window chrome */}
        <rect x="0" y="0" width="400" height="22" fill="var(--color-paper-3)" />
        <circle cx="12" cy="11" r="3" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
        <circle cx="24" cy="11" r="3" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
        <circle cx="36" cy="11" r="3" fill="none" stroke="var(--color-ink)" strokeWidth="1" />
        <text
          x="200"
          y="15"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="8"
          fill="var(--color-ink-2)"
          letterSpacing="1"
        >
          {`${slug}.SITE`}
        </text>

        {/* accent block */}
        <rect x="22" y="44" width="40" height="6" fill={accent} />
        <rect x="22" y="56" width="120" height="2" fill="var(--color-ink)" opacity="0.4" />
        <rect x="22" y="62" width="80" height="2" fill="var(--color-ink)" opacity="0.25" />

        {/* big mark */}
        <text
          x="22"
          y="150"
          fontFamily="Inter, sans-serif"
          fontWeight="800"
          fontSize={titleFontSize}
          fill="var(--color-ink)"
          letterSpacing="-2"
        >
          {displayTitle}
        </text>
        <text
          x="22"
          y="170"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="var(--color-mute)"
          letterSpacing="1.4"
        >
          {`// ${project.category.toUpperCase()} · ${project.year}`}
        </text>

        {/* measurement lines */}
        {lines.map((y, i) => (
          <line
            key={i}
            x1="360"
            y1={y + 30}
            x2="380"
            y2={y + 30}
            stroke="var(--color-ink)"
            strokeWidth="0.5"
            opacity="0.5"
          />
        ))}
        <line x1="370" y1="30" x2="370" y2="120" stroke="var(--color-ink)" strokeWidth="0.5" opacity="0.5" />

        {/* corner stamp */}
        <text
          x="378"
          y="240"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="var(--color-mute)"
          letterSpacing="1.2"
        >
          PLACEHOLDER · 1:1
        </text>
      </svg>
    </div>
  );
}
