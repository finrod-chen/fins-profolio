import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";

/**
 * ProjectCard — two layouts:
 *   - "default"  : vertical card with image on top, metadata below
 *   - "featured" : horizontal card with image left, text right
 *
 * No status badge, no typewriter stamp. Status is a single dot.
 */
export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "featured";
}) {
  if (variant === "featured") return <FeaturedCard project={project} />;
  return <DefaultCard project={project} index={index} />;
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="lift group block border border-[var(--color-line)] bg-[var(--color-paper)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative ratio-3-2 lg:ratio-3-2 bg-[var(--color-paper-2)] overflow-hidden lg:border-r border-b lg:border-b-0 border-[var(--color-line)]">
          <ProjectImage project={project} loading="lazy" />
          <StatusBadge status={project.status} />
        </div>
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="tag is-accent">{project.category}</span>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-mute)]">
              {project.year}
            </span>
          </div>
          <h3 className="font-serif text-[clamp(24px,3vw,36px)] font-semibold leading-[1.2] tracking-tight text-[var(--color-ink)]">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-ink-2)] max-w-prose">
            {project.tagline}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-[var(--color-accent-hover)] font-medium">
            閱讀全文 <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DefaultCard({ project }: { project: Project; index: number }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="lift group block border border-[var(--color-line)] bg-[var(--color-paper)]"
    >
      <div className="relative ratio-3-2 bg-[var(--color-paper-2)] overflow-hidden border-b border-[var(--color-line)]">
        <ProjectImage project={project} loading="lazy" />
        <StatusBadge status={project.status} />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
            {project.category}
          </span>
          <span aria-hidden className="text-[var(--color-line)]">·</span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
            {project.year}
          </span>
        </div>
        <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold leading-[1.25] tracking-tight text-[var(--color-ink)]">
          {project.title}
        </h3>
        <p className="mt-2 text-[13px] text-[var(--color-ink-2)] leading-[1.6] line-clamp-2">
          {project.tagline}
        </p>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; color: string }> = {
    live: { label: "上線", color: "var(--color-success)" },
    draft: { label: "進行中", color: "var(--color-warn)" },
    archived: { label: "歸檔", color: "var(--color-mute)" },
  };
  const item = map[status];

  return (
    <span
      className="absolute top-3 left-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.18em] uppercase bg-white/90 backdrop-blur-sm px-2 h-6 text-[var(--color-ink-2)]"
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: item.color }}
      />
      {item.label}
    </span>
  );
}
