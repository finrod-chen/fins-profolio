import type { Project } from "@/types";
import { ProjectImage } from "./ProjectImage";
import { SectionLabel } from "./SectionLabel";
import { Link } from "react-router-dom";

/**
 * ProjectPage — the detail view for a single work.
 * Mobile: stacked. Desktop: two-column with a sticky meta sidebar.
 */
export function ProjectPage({ project }: { project: Project }) {
  const pageTitle = `${project.title} — FIN / Works`;
  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta name="description" content={project.tagline} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={project.tagline} />
      {project.screenshot && <meta property="og:image" content={project.screenshot} />}
      {/* breadcrumb / top bar */}
      <div className="px-5 sm:px-6 lg:px-10 pt-8 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.14em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)]"
        >
          <span aria-hidden>←</span> All Works
        </Link>
      </div>

      {/* title */}
      <header className="px-5 sm:px-6 lg:px-10 mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="tag is-accent">{project.category}</span>
          <span className="tag">{project.year}</span>
          <span className="tag">{project.role}</span>
        </div>
        <h1 className="text-[clamp(36px,7vw,80px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          {project.title}
        </h1>
        <p className="mt-4 max-w-3xl text-[16px] sm:text-[18px] text-[var(--color-ink-2)]">
          {project.tagline}
        </p>
      </header>

      {/* hero screenshot */}
      <div className="px-5 sm:px-6 lg:px-10 mt-8 sm:mt-10">
        <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden">
          <div className="ratio-16-9">
            <ProjectImage project={project} loading="eager" />
          </div>
        </div>
      </div>

      {/* body */}
      <div className="px-5 sm:px-6 lg:px-10 mt-10 sm:mt-14 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* sticky meta — sidebar on desktop, top of body on mobile */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-8">
            <div>
              <SectionLabel index="01" label="Overview" />
              <p className="text-[15px] leading-[1.7] text-[var(--color-ink-2)] whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-y-5 gap-x-4 text-[13px]">
              <SpecRow k="Year" v={project.year} />
              <SpecRow k="Role" v={project.role} />
              <SpecRow k="Status" v={project.status.toUpperCase()} />
              <SpecRow k="Category" v={project.category} />
            </dl>

            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-2">
                Stack
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {(project.url || project.repoUrl) && (
              <div className="flex flex-col sm:flex-row gap-2.5">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
                  >
                    Visit site <span aria-hidden>↗</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
                  >
                    Source <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* main column */}
        <div className="lg:col-span-8 space-y-10 sm:space-y-12">
          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {project.gallery.map((g, i) => (
                <div key={i} className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden">
                  <div className="ratio-4-3">
                    <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {project.notes && project.notes.length > 0 && (
            <section>
              <SectionLabel index="02" label="Notes" />
              <div className="prose-like space-y-4 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--color-ink-2)]">
                {project.notes.map((n, i) => {
                  if (n.kind === "p") return <p key={i}>{n.text}</p>;
                  if (n.kind === "quote")
                    return (
                      <blockquote
                        key={i}
                        className="border-l-2 border-[var(--color-accent)] bg-[var(--color-paper-2)] pl-4 pr-3 py-2.5 italic text-[var(--color-ink)]"
                      >
                        {n.text}
                      </blockquote>
                    );
                  if (n.kind === "ul")
                    return (
                      <ul key={i} className="list-none p-0 space-y-2 my-4">
                        {n.items.map((it, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 pl-3 border-l-2 border-[var(--color-accent)]"
                          >
                            <span className="text-[var(--color-ink)]">{it}</span>
                          </li>
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
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-1 text-[var(--color-ink-2)] font-medium">{v}</dd>
    </div>
  );
}
