import type { Project } from "@/types";

export function SitePlaceholder({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const accent = project.accent ?? "var(--color-accent)";
  const title = project.title;
  // Limit CJK width aggressively (full-width chars consume ~2x)
  const hasCJK = [...title].some((ch) => ch.charCodeAt(0) > 0x2e7f);
  const displayTitle = title.slice(0, hasCJK ? 5 : 8);
  const titleFontSize = hasCJK ? 36 : 56;

  const lines = Array.from({ length: 6 }, (_, i) => i * 14 + 8);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden
      >
        {/* page bg */}
        <rect x="0" y="0" width="400" height="250" fill="var(--color-paper-2)" />

        {/* blueprint grid */}
        <defs>
          <pattern
            id={`grid-${project.id}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(15, 23, 42, 0.06)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="400"
          height="250"
          fill={`url(#grid-${project.id})`}
        />

        {/* browser chrome */}
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
          {project.id}
        </text>

        {/* accent + lines */}
        <rect x="22" y="44" width="40" height="4" fill={accent} />
        <rect x="22" y="56" width="120" height="2" fill="var(--color-ink)" opacity="0.5" />
        <rect x="22" y="62" width="80" height="2" fill="var(--color-ink)" opacity="0.3" />

        {/* big colorful disc (副色裝飾) */}
        <circle cx="320" cy="120" r="56" fill={accent} opacity="0.16" />
        <circle cx="320" cy="120" r="36" fill={accent} opacity="0.28" />
        <circle cx="320" cy="120" r="14" fill={accent} />

        {/* amber/coral 副色斑點 (根據 id 字串 hash 決定) */}
        {(() => {
          const h = project.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
          const dot = (cx: number, cy: number, r: number, color: string) => (
            <circle cx={cx} cy={cy} r={r} fill={color} />
          );
          return h % 3 === 0
            ? dot(290, 60, 6, "var(--color-amber)")
            : h % 3 === 1
            ? dot(355, 175, 8, "var(--color-coral)")
            : dot(60, 220, 6, "var(--color-amber)");
        })()}

        {/* title (Chinese-safe) */}
        <text
          x="22"
          y="156"
          fontFamily="'Noto Sans TC', 'PingFang TC', sans-serif"
          fontWeight="700"
          fontSize={titleFontSize}
          fill="var(--color-ink)"
          letterSpacing="-1"
        >
          {displayTitle}
        </text>
        <text
          x="22"
          y="178"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="var(--color-mute)"
          letterSpacing="1"
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
        <line
          x1="370"
          y1="30"
          x2="370"
          y2="120"
          stroke="var(--color-ink)"
          strokeWidth="0.5"
          opacity="0.5"
        />

        {/* corner stamp */}
        <text
          x="378"
          y="240"
          textAnchor="end"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="var(--color-mute)"
          letterSpacing="1"
        >
          PREVIEW · 1:1
        </text>
      </svg>
    </div>
  );
}
