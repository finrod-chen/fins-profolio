import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { categories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

/**
 * ProjectGrid — renders the full grid, with category filtering
 * and a "featured" first slot that spans 2 columns on desktop.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | Project["category"]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const filters: ("All" | Project["category"])[] = ["All", ...categories];

  return (
    <section id="works" className="px-5 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-16 sm:pb-24">
      <SectionLabel index="02" label="Selected Works" meta={`${filtered.length} / ${projects.length} entries`} />

      {/* filter chips */}
      <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-5 sm:mx-0 px-5 sm:px-0 scrollbar-none">
        {filters.map((c) => {
          const isActive = c === active;
          const count = c === "All" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`shrink-0 inline-flex items-center gap-2 h-9 px-3.5 border text-[12px] font-mono uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                  : "bg-[var(--color-paper)] text-[var(--color-ink-2)] border-[var(--color-line)] hover:border-[var(--color-ink)]"
              }`}
            >
              <span>{c}</span>
              <span className={isActive ? "text-[var(--color-paper)]/70" : "text-[var(--color-mute)]"}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--color-line)] py-16 text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-2">
            No entries
          </div>
          <p className="text-[14px] text-[var(--color-ink-2)]">這個分類目前還沒有作品。</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              variant={i === 0 && active === "All" ? "wide" : "default"}
            />
          ))}
        </div>
      )}
    </section>
  );
}
