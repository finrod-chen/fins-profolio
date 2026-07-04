import { useMemo, useState } from "react";
import type { Project } from "@/types";
import { categories } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionLabel } from "./SectionLabel";

/**
 * ProjectGrid — editorial "spread" layout.
 *
 * - First card (or first in active filter) gets a wide spread.
 * - Subsequent cards cycle: 2-col, 3-col, 2-col, minimal-row, ...
 * - Each "minimal" row is a beat — like a chapter divider, not a
 *   downgrade.
 * - Category filter is now a row of mono caps that adds/removes
 *   items, but defaults to "All".
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | Project["category"]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const filters: ("All" | Project["category"])[] = ["All", ...categories];

  return (
    <section
      id="works"
      className="px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-20 sm:pb-32"
    >
      <SectionLabel label="Selected Works" meta={`${filtered.length} entries`} />

      {/* Filter chips */}
      <div
        className="flex items-center gap-3 mb-12 sm:mb-16 overflow-x-auto pb-2 -mx-5 sm:mx-0 px-5 sm:px-0"
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
              className={`shrink-0 inline-flex items-center gap-2 h-9 px-4 border text-[11px] font-mono uppercase tracking-[0.18em] transition-colors ${
                isActive
                  ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
                  : "bg-transparent text-[var(--color-ink-2)] border-[var(--color-ink)]/30 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              <span>{c}</span>
              <span
                className={
                  isActive
                    ? "text-[var(--color-paper)]/70"
                    : "text-[var(--color-mute)]"
                }
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--color-ink)]/20 py-20 text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-2">
            Nothing here, yet
          </div>
          <p className="text-[14px] text-[var(--color-ink-2)] max-w-md mx-auto">
            這個分類目前還沒有作品。
          </p>
        </div>
      ) : (
        <div className="space-y-10 sm:space-y-14">
          {/* feature spread */}
          <div
            data-reveal
            data-reveal-delay="1"
          >
            <ProjectCard
              project={filtered[0]}
              index={0}
              variant="feature"
            />
          </div>

          {/* mixed editorial grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filtered.slice(1).map((p, i) => {
              const isMinimal = (i + 1) % 4 === 0; // every 4th is a beat
              return (
                <li
                  key={p.id}
                  className={isMinimal ? "sm:col-span-2 lg:col-span-3" : ""}
                  data-reveal
                  data-reveal-delay={String((i % 6) + 1)}
                >
                  <ProjectCard
                    project={p}
                    index={i + 1}
                    variant={isMinimal ? "minimal" : "standard"}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
