import { useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { categories } from "@/data/projects";
import { Badge } from "@/components/arc/badge/badge";
import { ChipGroup } from "@/components/arc/chip-group/chip-group";
import { CtaLink } from "@/components/CtaLink";
import { WorkCover } from "@/components/WorkCover";
import { ScrambleText } from "@/components/ScrambleText";
import styles from "./WorkDeck.module.css";

const statusBadge: Record<Project["status"], { label: string; tone: "success" | "warning" | "neutral" }> = {
  live: { label: "上線", tone: "success" },
  draft: { label: "進行中", tone: "warning" },
  archived: { label: "歸檔", tone: "neutral" },
};

const options = [{ value: "All", label: "全部" }, ...categories.map((c) => ({ value: c, label: c }))];

/**
 * Width of each card as a share of the deck, in percent. The current card is
 * wide, the ones after it fan out narrower and narrower like page edges, and
 * the ones already passed fold away to nothing. Whatever the fan leaves over
 * goes to the current card, so the row always fills the deck.
 */
const FAN = [18, 9, 5, 3, 2];

function sharesFor(count: number, active: number): number[] {
  const after = Math.min(FAN.length, count - 1 - active);
  const fan = FAN.slice(0, after);
  const main = 100 - fan.reduce((sum, w) => sum + w, 0);
  return Array.from({ length: count }, (_, i) => {
    if (i === active) return main;
    if (i > active && i - active <= after) return fan[i - active - 1];
    return 0;
  });
}

const pad = (n: number) => String(n).padStart(2, "0");
const SWIPE = 40;

/**
 * The works as a horizontal deck: one card open, the rest stacked to its
 * right as narrowing slices. Arrows, the arrow keys, a click on a slice or a
 * swipe moves through it, and each change animates the widths.
 *
 * Every card renders its full content, links included, so the prerendered
 * page lists every work and every product link. Cards that are not open are
 * inert: out of the tab order and hidden from assistive tech until opened.
 */
export function WorkDeck({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(0);
  const swipeFrom = useRef<number | null>(null);

  const list = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );
  const shares = sharesFor(list.length, active);
  const current = list[active];

  const go = (index: number) => setActive(Math.max(0, Math.min(list.length - 1, index)));

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(active - 1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") swipeFrom.current = event.clientX;
  };
  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const from = swipeFrom.current;
    swipeFrom.current = null;
    if (from === null) return;
    const dx = event.clientX - from;
    if (dx <= -SWIPE) go(active + 1);
    else if (dx >= SWIPE) go(active - 1);
  };

  return (
    <section className={styles.section} aria-labelledby="works-heading">
      <div className={styles.head}>
        <div className={styles.titleBlock}>
          <p className="label">Works</p>
          <h2 id="works-heading" className={styles.heading}>
            <ScrambleText lines={["作品"]} onView />
          </h2>
        </div>
        <div className={styles.controls}>
          <p className={`mono ${styles.counter}`} aria-hidden="true">
            <span className={styles.counterNow}>{pad(active + 1)}</span> / {pad(list.length)}
          </p>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="上一個作品"
          >
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(active + 1)}
            disabled={active >= list.length - 1}
            aria-label="下一個作品"
          >
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={styles.filter}>
        <ChipGroup
          label="作品分類"
          options={options}
          value={[filter]}
          onValueChange={(next) => {
            setFilter(next.at(-1) ?? "All");
            setActive(0);
          }}
        />
      </div>

      {/* Announces the open work when it changes, for screen readers. */}
      <p className="sr-only" aria-live="polite">
        {current ? `第 ${active + 1} 個，共 ${list.length} 個：${current.title}` : ""}
      </p>

      <ol
        className={styles.deck}
        aria-label="作品，用左右鍵切換"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipeFrom.current = null)}
      >
        {list.map((project, index) => {
          const state = index === active ? "active" : index < active ? "past" : "next";
          const status = statusBadge[project.status];
          return (
            <li
              key={project.id}
              className={styles.card}
              data-state={state}
              data-offset={index - active}
              style={{ "--share": `${shares[index]}%` } as CSSProperties}
            >
              <div className={styles.media}>
                <WorkCover project={project} priority={index === 0} />
              </div>

              {state === "next" && (
                <button
                  type="button"
                  tabIndex={-1}
                  className={styles.slice}
                  onClick={() => go(index)}
                  aria-label={`打開 ${project.title}`}
                >
                  <span className={`mono ${styles.sliceNumber}`}>{pad(index + 1)}</span>
                  <span className={styles.sliceTitle}>{project.title}</span>
                </button>
              )}

              <div className={styles.info} inert={state !== "active"}>
                <p className={styles.meta}>
                  <span className={`mono ${styles.index}`}>{pad(index + 1)}</span>
                  <Badge tone="neutral" size="sm">
                    {project.category}
                  </Badge>
                  <Badge tone={status.tone} size="sm">
                    {status.label}
                  </Badge>
                  <span className={`mono ${styles.year}`}>{project.year}</span>
                </p>
                <h3 className={styles.title}>
                  <Link to={`/work/${project.id}`}>{project.title}</Link>
                </h3>
                <p className={styles.tagline}>{project.tagline}</p>
                <ul className={styles.stack}>
                  {project.stack.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.actions}>
                  <CtaLink href={`/work/${project.id}`} kind="primary">
                    看作品
                  </CtaLink>
                  {project.url && (
                    <a className={styles.visit} href={project.url} target="_blank" rel="noopener noreferrer">
                      {project.linkLabel ?? "前往網站"}
                      <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles.progress} aria-hidden="true">
        {list.map((project, index) => (
          <span key={project.id} className={styles.tick} data-on={index <= active} />
        ))}
      </div>
    </section>
  );
}
