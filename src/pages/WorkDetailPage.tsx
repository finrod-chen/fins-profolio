import { Link, useParams } from "react-router-dom";
import type { Project } from "@/types";
import { findProject } from "@/data/projects";
import { Badge } from "@/components/arc/badge/badge";
import { Breadcrumb } from "@/components/arc/breadcrumb/breadcrumb";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { InViewTitle } from "@/components/arc/in-view-title/in-view-title";
import { ActionLink } from "@/components/arc/blocks/hero-section/hero-content";
import { WorkCover } from "@/components/WorkCover";
import styles from "./WorkDetailPage.module.css";

const statusLabel: Record<Project["status"], string> = {
  live: "上線",
  draft: "進行中",
  archived: "歸檔",
};

export function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? findProject(id) : undefined;

  if (!project) {
    return (
      <div className="page band">
        <title>找不到這個作品 · Finrod Chen</title>
        <EmptyState
          title="找不到這個作品"
          description="連結可能已經失效，或這個作品還沒公開。"
          label="找不到作品"
          action={
            <Link to="/" className={styles.backLink}>
              回到作品列表
            </Link>
          }
        />
      </div>
    );
  }

  const facts = [
    { label: "年份", value: project.year },
    { label: "角色", value: project.role },
    { label: "狀態", value: statusLabel[project.status] },
    { label: "分類", value: project.category },
  ];

  return (
    <article className="page">
      <title>{`${project.title} · 作品`}</title>
      <meta name="description" content={project.tagline} />
      <meta property="og:title" content={`${project.title} · 作品`} />
      <meta property="og:description" content={project.tagline} />
      {project.screenshot && <meta property="og:image" content={project.screenshot} />}

      <header className={styles.header}>
        <Breadcrumb
          ariaLabel="頁面路徑"
          items={[
            { label: "作品", href: "/" },
            { label: project.category },
            { label: project.title },
          ]}
        />
        <InViewTitle as="h1" variant="blur" text={project.title} className={styles.title} />
        <p className={styles.tagline}>{project.tagline}</p>
        <div className={styles.badges}>
          <Badge tone={project.status === "live" ? "success" : "neutral"}>
            {statusLabel[project.status]}
          </Badge>
          <Badge tone="neutral">{project.category}</Badge>
          <span className={styles.year}>{project.year}</span>
        </div>
      </header>

      <figure className={styles.cover}>
        <WorkCover project={project} priority />
      </figure>

      <div className={styles.columns}>
        <div className={styles.bodyColumn}>
          <div className="prose">
            <p>{project.description}</p>
            {project.notes?.map((note, index) => {
              if (note.kind === "p") return <p key={index}>{note.text}</p>;
              if (note.kind === "quote")
                return (
                  <blockquote key={index}>
                    <p>{note.text}</p>
                  </blockquote>
                );
              return (
                <ul key={index}>
                  {note.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            })}
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <ul className={styles.gallery}>
              {project.gallery.map((src) => (
                <li key={src} className={styles.galleryItem}>
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className={styles.side} aria-labelledby="work-facts">
          <div className={styles.sideSticky}>
            <div>
              <h2 id="work-facts" className={styles.sideHeading}>
                基本資料
              </h2>
              <dl className={styles.group}>
                {facts.map((fact) => (
                  <div key={fact.label} className={styles.row}>
                    <dt className={styles.rowLabel}>{fact.label}</dt>
                    <dd className={styles.rowValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className={styles.sideHeading}>技術</h2>
              <ul className={styles.stack}>
                {project.stack.map((item) => (
                  <li key={item}>
                    <Badge tone="neutral" size="sm">
                      {item}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>

            {(project.url || project.repoUrl) && (
              <div className={styles.actions}>
                {project.url && (
                  <ActionLink
                    kind="primary"
                    action={{ label: "前往網站", href: project.url, external: true }}
                  />
                )}
                {project.repoUrl && (
                  <ActionLink
                    kind="secondary"
                    action={{ label: "原始碼", href: project.repoUrl, external: true }}
                  />
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
