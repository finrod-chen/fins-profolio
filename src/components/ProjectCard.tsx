import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";

/**
 * ProjectCard — used inside the grid.
 * Mobile: stacked, image on top, metadata below.
 * Desktop: image on top, metadata sits in a "spec sheet" footer.
 */
export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "wide";
}) {
  const wide = variant === "wide";

  return (
    <Link
      to={`/work/${project.id}`}
      className={`lift group block border border-[var(--color-line)] bg-[var(--color-paper)] ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      {/* screenshot */}
      <div className={`relative ${wide ? "ratio-16-9" : "ratio-16-10"} bg-[var(--color-paper-2)] overflow-hidden border-b border-[var(--color-line)]`}>
        <ProjectImage project={project} loading="lazy" />

        {/* index stamp */}
        <div className="absolute top-3 left-3 stamp bg-[var(--color-paper)]/90 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")} · {project.year}
        </div>

        {/* status */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={project.status} />
        </div>

        {/* hover arrow */}
        <div className="absolute bottom-3 right-3 w-9 h-9 grid place-items-center bg-[var(--color-paper)] border border-[var(--color-ink)] opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[14px] leading-none">↗</span>
        </div>
      </div>

      {/* meta */}
      <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight leading-tight truncate">
            {project.title}
          </h3>
          <p className="mt-1 text-[13px] sm:text-[14px] text-[var(--color-mute)] line-clamp-2">
            {project.tagline}
          </p>
        </div>
        <div className="hidden sm:block shrink-0 text-right">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
            Category
          </div>
          <div className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--color-ink-2)] mt-0.5">
            {project.category}
          </div>
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; tone: "live" | "draft" | "off" }> = {
    live: { label: "Live", tone: "live" },
    draft: { label: "WIP", tone: "draft" },
    archived: { label: "Archive", tone: "off" },
  };
  const item = map[status];

  return (
    <span
      className="font-mono text-[9px] tracking-[0.18em] uppercase inline-flex items-center gap-1.5 px-2 h-6 border"
      style={{
        borderColor: "var(--color-ink)",
        background: "var(--color-paper)",
        color: "var(--color-ink-2)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background:
            item.tone === "live"
              ? "var(--color-success)"
              : item.tone === "draft"
              ? "var(--color-warn)"
              : "var(--color-mute)",
        }}
      />
      {item.label}
    </span>
  );
}
