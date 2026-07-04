import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";

/**
 * ProjectCard — editorial magazine card. Three layouts:
 *   - "feature" : wide spread, image left, prose right
 *   - "standard": vertical card, image on top, prose below
 *   - "minimal" : text-only row (used in dense grids)
 *
 * Status is a single small dot — no fake telemetry, no badges.
 */
export function ProjectCard({
  project,
  variant = "standard",
}: {
  project: Project;
  index: number;
  variant?: "feature" | "standard" | "minimal";
}) {
  if (variant === "feature") return <FeatureCard project={project} />;
  if (variant === "minimal") return <MinimalCard project={project} />;
  return <StandardCard project={project} />;
}

function StandardCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="lift group block border border-[var(--color-ink)]/15 bg-[var(--color-paper)]"
    >
      <div className="relative ratio-3-2 bg-[var(--color-paper-2)] overflow-hidden border-b border-[var(--color-ink)]/15">
        <ProjectImage project={project} loading="lazy" />
        <StatusDot status={project.status} pos="tr" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="eyebrow">{project.category}</span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            {project.year}
          </span>
        </div>
        <h3 className="mt-3 font-display text-[22px] sm:text-[26px] font-medium leading-[1.1] tracking-tight text-[var(--color-ink)]">
          {project.title}
        </h3>
        <p className="mt-2 text-[14px] text-[var(--color-ink-2)] leading-[1.6] line-clamp-3">
          {project.tagline}
        </p>
        <div className="mt-5 flex items-center justify-between text-[11px] font-mono tracking-[0.16em] uppercase text-[var(--color-mute)]">
          <span>Open ↗</span>
          <span>{project.role}</span>
        </div>
      </div>
    </Link>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="lift group block border border-[var(--color-ink)]/15 bg-[var(--color-paper)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative ratio-3-2 lg:ratio-21-9 bg-[var(--color-paper-2)] overflow-hidden lg:border-r border-b lg:border-b-0 border-[var(--color-ink)]/15">
          <ProjectImage project={project} loading="lazy" />
          <StatusDot status={project.status} pos="tl" />
        </div>
        <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="eyebrow">Editor's pick · {project.category}</span>
          </div>
          <h3 className="font-display text-[clamp(28px,3.4vw,46px)] font-medium leading-[1.05] tracking-tight text-[var(--color-ink)]">
            {project.title}
          </h3>
          <p className="mt-4 text-[16px] leading-[1.65] text-[var(--color-ink-2)] max-w-prose">
            {project.tagline}
          </p>
          <div className="mt-6 flex items-center gap-4 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--color-mute)]">
            <span>{project.year}</span>
            <span aria-hidden>—</span>
            <span>{project.role}</span>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.16em] uppercase text-[var(--color-accent-deep-2)]">
            <span>Read the spread</span>
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MinimalCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="group block py-7 border-b border-[var(--color-line)] transition-colors hover:bg-[var(--color-paper-2)]"
    >
      <div className="flex items-baseline gap-5 px-1">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] w-10 shrink-0">
          {project.year}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-[clamp(20px,2.4vw,26px)] font-medium leading-[1.15] tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep-2)] transition-colors">
            {project.title}
          </h3>
          <p className="mt-1 text-[13px] text-[var(--color-mute)] line-clamp-1">
            {project.tagline}
          </p>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] w-28 text-right shrink-0">
          {project.category}
        </span>
        <StatusDot status={project.status} />
      </div>
    </Link>
  );
}

function StatusDot({
  status,
  pos,
}: {
  status: Project["status"];
  pos?: "tr" | "tl";
}) {
  const map: Record<Project["status"], { label: string; color: string }> = {
    live: { label: "Live", color: "var(--color-accent)" },
    draft: { label: "WIP", color: "var(--color-warn)" },
    archived: { label: "Archive", color: "var(--color-mute)" },
  };
  const item = map[status];
  const posClass =
    pos === "tl"
      ? "top-3 left-3"
      : pos === "tr"
        ? "top-3 right-3"
        : "";

  return (
    <span
      className={`absolute ${posClass} inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-paper)] bg-[var(--color-ink)]/85 px-2 h-6 backdrop-blur-sm`}
      aria-label={item.label}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: item.color }}
      />
      {item.label}
    </span>
  );
}
