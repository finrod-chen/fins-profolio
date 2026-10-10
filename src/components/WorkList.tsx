import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { categories } from "@/data/projects";
import { Badge } from "@/components/arc/badge/badge";
import { ChipGroup } from "@/components/arc/chip-group/chip-group";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { Button } from "@/components/arc/button/button";
import { WorkCover } from "@/components/WorkCover";
import styles from "./WorkList.module.css";

const statusBadge: Record<Project["status"], { label: string; tone: "success" | "warning" | "neutral" }> = {
  live: { label: "上線", tone: "success" },
  draft: { label: "進行中", tone: "warning" },
  archived: { label: "歸檔", tone: "neutral" },
};

/** The category facets, with "全部" as the cleared state. */
const options = [
  { value: "All", label: "全部" },
  ...categories.map((c) => ({ value: c, label: c })),
];

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <section className={styles.section} aria-labelledby="works-heading">
      <div className={styles.head}>
        <h2 id="works-heading" className={styles.heading}>
          作品
        </h2>
        <p className={styles.count}>
          {filtered.length} / {projects.length} 個
        </p>
      </div>

      <div className={styles.filter}>
        <ChipGroup
          label="作品分類"
          options={options}
          value={[active]}
          // Single select: clearing the chip falls back to every project.
          onValueChange={(next) => setActive(next.at(-1) ?? "All")}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="這個分類還沒有作品"
          description="換一個分類，或看看全部的作品。"
          action={
            <Button variant="secondary" onClick={() => setActive("All")}>
              看全部作品
            </Button>
          }
          label="沒有符合的作品"
        />
      ) : (
        <ul className={styles.grid}>
          {filtered.map((project, index) => {
            const status = statusBadge[project.status];
            return (
              <li key={project.id} className={styles.cell}>
                <Link to={`/work/${project.id}`} className={styles.card}>
                  <span className={styles.cover}>
                    <WorkCover project={project} priority={index === 0} />
                  </span>
                  <span className={styles.body}>
                    <span className={styles.meta}>
                      <Badge tone="neutral" size="sm">
                        {project.category}
                      </Badge>
                      <Badge tone={status.tone} size="sm">
                        {status.label}
                      </Badge>
                      <span className={styles.year}>{project.year}</span>
                    </span>
                    <span className={styles.title}>{project.title}</span>
                    <span className={styles.tagline}>{project.tagline}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
