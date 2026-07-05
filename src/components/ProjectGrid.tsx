import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { categories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

/**
 * ProjectGrid — list view with category filter.
 *
 * Layout:
 *   - First card spans full width (feature).
 *   - Remaining cards in a 2/3-col grid.
 *   - Filter chips above the grid.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | Project["category"]>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects]
  );

  const filters: ("All" | Project["category"])[] = ["All", ...categories];

  return (
    <section id="works" className="px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
      <SectionLabel
        title="作品集"
        meta={`${filtered.length} / ${projects.length} 個`}
        tone="blue"
        icon="◣"
      />

      {/* filter chips */}
      <div
        className="flex items-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-5 sm:mx-0 px-5 sm:px-0"
        data-reveal
      >
        {filters.map((c) => {
          const isActive = c === active;
          const count =
            c === "All"
              ? projects.length
              : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={`shrink-0 chip transition-colors ${
                isActive
                  ? "is-blue !text-[var(--color-accent-hover)]"
                  : "is-out hover:border-[var(--color-ink)]"
              }`}
            >
              <span>{c}</span>
              <span className={`font-mono ${isActive ? "opacity-60" : "opacity-50"}`}>
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--color-line)] py-16 text-center">
          <p className="text-[14px] text-[var(--color-ink-2)]">
            這個分類目前還沒有作品。
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* feature spread — first card */}
          <div data-reveal>
            <ProjectCard
              project={filtered[0]}
              index={0}
              variant="featured"
            />
          </div>

          {/* standard 3-col grid for remaining */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.slice(1).map((p, i) => (
              <li
                key={p.id}
                data-reveal
                data-reveal-delay={String((i % 5) + 1)}
              >
                <ProjectCard
                  project={p}
                  index={i + 1}
                  variant="default"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
