import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";

/**
 * ProjectCard — v4 active
 * 三變體：
 *   - "default"  直式卡，數字 + 圖 + meta (default grid 用)
 *   - "featured" 橫式卡，圖左/文字右；第一張置頂用
 *   - "minimal"  極簡：僅文字與卡片色，左色條 (推薦)
 */
export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "featured" | "minimal";
}) {
  if (variant === "featured") return <FeaturedCard project={project} index={index} />;
  if (variant === "minimal")  return <MinimalCard project={project} index={index} />;
  return <DefaultCard project={project} index={index} />;
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const map: Record<Project["status"], { label: string; bg: string; ring: string }> = {
    live:     { label: "上線",   bg: "var(--color-success)",   ring: "rgba(4,120,87,0.18)" },
    draft:    { label: "進行中", bg: "var(--color-warn)",      ring: "rgba(180,83,9,0.18)" },
    archived: { label: "歸檔",   bg: "var(--color-mute)",      ring: "rgba(107,114,128,0.18)" },
  };
  const item = map[status];
  return (
    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] uppercase bg-white/90 backdrop-blur px-2 h-6 text-[var(--color-ink-2)]"
      style={{ boxShadow: `0 0 0 4px ${item.ring}` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.bg }} />
      {item.label}
    </span>
  );
}

function NumberStamp({ index }: { index: number }) {
  // 雙位數字 (01-99)，serif 顯示，給「刊物檔案編號」感
  const num = String(index + 1).padStart(2, "0");
  return (
    <span className="font-mono text-[11px] tracking-[0.18em] text-[var(--color-mute)]">
      #{num}
    </span>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="hover-lift group block border border-[var(--color-ink)] bg-[var(--color-paper)] overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="relative ratio-4-3 lg:ratio-auto lg:h-full lg:col-span-3 bg-[var(--color-paper-2)] overflow-hidden border-b lg:border-b-0 lg:border-r border-[var(--color-line)]">
          <div className="hover-img absolute inset-0">
            <ProjectImage project={project} loading="lazy" />
          </div>
          <StatusBadge status={project.status} />
          <span className="absolute top-3 right-3 z-10 sticker is-coral">
            Featured
          </span>
        </div>
        <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <NumberStamp index={index} />
            <span className="opacity-40">·</span>
            <span className="tag is-accent">{project.category}</span>
            <span className="opacity-40">·</span>
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-mute)]">
              {project.year}
            </span>
          </div>
          <h3 className="font-serif text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)]">
            {project.title}
          </h3>
          <p className="mt-3 text-[15px] leading-[1.7] text-[var(--color-ink-2)] max-w-prose">
            {project.tagline}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-[var(--color-accent-hover)] font-medium">
            閱讀全文
            <span className="hover-arrow" aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function DefaultCard({ project, index }: { project: Project; index: number }) {
  // 三色輪替左條，活躍感來自色而非排版
  const rail =
    index % 3 === 0 ? "var(--color-accent)" :
    index % 3 === 1 ? "var(--color-coral)" :
                       "var(--color-amber)";

  return (
    <Link
      to={`/work/${project.id}`}
      className="hover-lift group block border border-[var(--color-line)] bg-[var(--color-paper)] overflow-hidden relative"
    >
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ background: rail }}
      />
      <div className="relative ratio-3-2 bg-[var(--color-paper-2)] overflow-hidden border-b border-[var(--color-line)]">
        <div className="hover-img absolute inset-0">
          <ProjectImage project={project} loading="lazy" />
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2.5">
          <NumberStamp index={index} />
          <span aria-hidden className="text-[var(--color-line)]">·</span>
          <span className="tag">{project.category}</span>
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
        <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-[var(--color-mute)]">
          <span>看細節</span>
          <span className="hover-arrow" aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

function MinimalCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      to={`/work/${project.id}`}
      className="hover-lift group block bg-[var(--color-paper)] p-5 sm:p-6 border border-[var(--color-line)] relative"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <NumberStamp index={index} />
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
          {project.year}
        </span>
      </div>
      <h3 className="font-serif text-[clamp(20px,2vw,24px)] font-semibold leading-[1.2] tracking-tight text-[var(--color-ink)]">
        {project.title}
      </h3>
      <p className="mt-2 text-[13px] text-[var(--color-ink-2)] leading-[1.6] line-clamp-2">
        {project.tagline}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="chip is-blue">{project.category}</span>
        <span className="hover-arrow text-[var(--color-accent)]" aria-hidden>↗</span>
      </div>
    </Link>
  );
}
