import { useState } from "react";
import type { Project } from "@/types";
import styles from "./WorkCover.module.css";

/**
 * The preview image for a project, in order of preference:
 *   1. an explicit local screenshot
 *   2. the live site's OG image
 *   3. the project's title set on a plain surface
 *
 * A remote image that fails at runtime falls back to the title card, so a
 * removed OG image never leaves a broken icon behind.
 */
export function WorkCover({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const src = project.screenshot ?? project.ogImage;
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={styles.fallback}>
        <span className={styles.fallbackTitle}>{project.title}</span>
        <span className={styles.fallbackMeta}>{project.year}</span>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={src}
      alt={`${project.title} 的網站預覽`}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
