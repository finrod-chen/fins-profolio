import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";
import { SectionLabel } from "./SectionLabel";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

/**
 * ProjectPage — detail view for a single work.
 * Document-style: not a magazine spread, just a long page with
 * metadata up top and the body below. Sidebar spec sheet.
 */
export function ProjectPage({ project }: { project: Project }) {
  useReveal();
  const pageTitle = `${project.title} — 作品`;

  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta name="description" content={project.tagline} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={project.tagline} />
      {project.screenshot && (
        <meta property="og:image" content={project.screenshot} />
      )}

      {/* breadcrumb */}
      <div className="px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-mute)] hover:text-[var(--color-accent)] transition-colors"
        >
          <span aria-hidden>←</span> 回到作品列表
        </Link>
      </div>

      {/* header */}
      <header
        className="px-5 sm:px-8 lg:px-12 mt-6 sm:mt-8"
        data-reveal
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="tag is-accent">{project.category}</span>
          <span className="tag">{project.year}</span>
          <span className="tag">{project.role}</span>
        </div>
        <h1 className="font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.2] tracking-tight text-[var(--color-ink)]">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[16px] sm:text-[17px] leading-[1.7] text-[var(--color-ink-2)]">
          {project.tagline}
        </p>
      </header>

      {/* cover image */}
      <div
        className="px-5 sm:px-8 lg:px-12 mt-10 sm:mt-12"
        data-reveal
      >
        <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden">
          <div className="ratio-21-9">
            <ProjectImage project={project} loading="eager" />
          </div>
        </div>
      </div>

      {/* body */}
      <div className="px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* sidebar spec sheet */}
        <aside className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-24 space-y-8">
            <div>
              <SectionLabel title="專案說明" />
              <p className="font-serif text-[16px] leading-[1.85] text-[var(--color-ink-2)] whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div>
              <div className="eyebrow mb-3">基本資料</div>
              <dl className="grid grid-cols-2 gap-y-4 gap-x-4 text-[13px]">
                <SpecRow k="年份" v={project.year} />
                <SpecRow k="角色" v={project.role} />
                <SpecRow k="狀態" v={statusLabel(project.status)} />
                <SpecRow k="分類" v={project.category} />
              </dl>
            </div>

            <div>
              <div className="eyebrow mb-3">技術</div>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {(project.url || project.repoUrl) && (
              <div className="flex flex-col gap-2.5">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between gap-2 h-11 px-4 bg-[var(--color-ink)] text-white text-[12px] font-medium hover:bg-[var(--color-accent)] transition-colors"
                  >
                    <span>前往網站</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between gap-2 h-11 px-4 border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-medium hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                  >
                    <span>原始碼</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* main column */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16">
          {project.gallery && project.gallery.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              data-reveal
            >
              {project.gallery.map((g, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden"
                >
                  <div className="ratio-4-3">
                    <img
                      src={g}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.notes && project.notes.length > 0 && (
            <section data-reveal>
              <SectionLabel title="筆記" />
              <div className="prose max-w-prose">
                {project.notes.map((n, i) => {
                  if (n.kind === "p") return <p key={i}>{n.text}</p>;
                  if (n.kind === "quote")
                    return (
                      <blockquote key={i}>
                        <p>{n.text}</p>
                      </blockquote>
                    );
                  if (n.kind === "ul")
                    return (
                      <ul key={i}>
                        {n.items.map((it, j) => (
                          <li key={j}>{it}</li>
                        ))}
                      </ul>
                    );
                  return null;
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-1 text-[14px] text-[var(--color-ink)] leading-snug">
        {v}
      </dd>
    </div>
  );
}

function statusLabel(s: Project["status"]) {
  if (s === "live") return "上線";
  if (s === "draft") return "進行中";
  return "歸檔";
}
