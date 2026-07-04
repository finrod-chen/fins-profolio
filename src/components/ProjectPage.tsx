import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";
import { SectionLabel } from "./SectionLabel";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";

/**
 * ProjectPage — editorial "spread" detail.
 * Left page: cover image + metadata spec sheet (sticky).
 * Right page: rich content (description, notes, gallery).
 *
 * The layout reads like a magazine article: picture on one side,
 * long-form on the other.
 */
export function ProjectPage({ project }: { project: Project }) {
  useReveal();
  const pageTitle = `${project.title} — FIN / Works`;
  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta name="description" content={project.tagline} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={project.tagline} />
      {project.screenshot && <meta property="og:image" content={project.screenshot} />}

      {/* breadcrumb */}
      <div className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--color-mute)] hover:text-[var(--color-accent-deep)] transition-colors"
        >
          <span aria-hidden>←</span> All Works
        </Link>
      </div>

      {/* spread header */}
      <header className="px-5 sm:px-8 lg:px-12 mt-8 sm:mt-10" data-reveal>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="tag is-accent">{project.category}</span>
          <span className="tag">{project.year}</span>
          <span className="tag">{project.role}</span>
        </div>
        <h1 className="font-display text-[clamp(40px,8vw,96px)] font-medium leading-[1.02] tracking-tight text-[var(--color-ink)]">
          {project.title}
        </h1>
        {project.tagline && (
          <p className="mt-5 max-w-3xl font-display italic text-[clamp(18px,2vw,24px)] leading-[1.4] text-[var(--color-ink-2)]">
            {project.tagline}
          </p>
        )}
      </header>

      {/* cover image — full bleed */}
      <div className="px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16" data-reveal>
        <div className="border border-[var(--color-ink)]/15 bg-[var(--color-paper-2)] overflow-hidden">
          <div className="ratio-21-9">
            <ProjectImage project={project} loading="eager" />
          </div>
        </div>
      </div>

      {/* spread body */}
      <div className="px-5 sm:px-8 lg:px-12 mt-16 sm:mt-20 pb-20 sm:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* LEFT PAGE — sticky metadata */}
        <aside className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-28 space-y-10">
            <div>
              <SectionLabel label="Overview" />
              <p className="font-display text-[17px] leading-[1.7] text-[var(--color-ink-2)] whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div>
              <div className="mag-eyebrow mb-4">Spec Sheet</div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-6 text-[13px]">
                <SpecRow k="Year" v={project.year} />
                <SpecRow k="Role" v={project.role} />
                <SpecRow k="Status" v={project.status.toUpperCase()} />
                <SpecRow k="Category" v={project.category} />
              </dl>
            </div>

            <div>
              <div className="mag-eyebrow mb-4">Stack</div>
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
                    className="inline-flex items-center justify-between gap-2 h-12 px-5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-[var(--color-accent)] transition-colors"
                  >
                    <span>Visit site</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-between gap-2 h-12 px-5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    <span>Source</span>
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT PAGE — content */}
        <div className="lg:col-span-8 space-y-12 sm:space-y-16">
          {project.gallery && project.gallery.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              data-reveal
            >
              {project.gallery.map((g, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-ink)]/15 bg-[var(--color-paper-2)] overflow-hidden"
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
              <SectionLabel label="Notes" />
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
      <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-1.5 font-display text-[18px] leading-[1.2] text-[var(--color-ink)] tracking-tight">
        {v}
      </dd>
    </div>
  );
}
