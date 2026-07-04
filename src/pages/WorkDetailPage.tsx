import { Link, useParams } from "react-router-dom";
import { findProject } from "@/data/projects";
import { ProjectPage } from "@/components/ProjectPage";

export function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? findProject(id) : undefined;

  if (!project) {
    return (
      <div className="page-in px-5 sm:px-6 lg:px-10 py-20 sm:py-28 text-center">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
          Error · 404
        </div>
        <h1 className="text-[clamp(28px,5vw,48px)] font-semibold tracking-tight">
          找不到這個作品
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-mute)]">
          連結可能已失效, 或這個作品還沒公開。
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 h-11 px-5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
        >
          ← Back to all works
        </Link>
      </div>
    );
  }

  return <ProjectPage project={project} />;
}
