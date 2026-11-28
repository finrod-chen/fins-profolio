import { projects } from "@/data/projects";
import styles from "./StackTicker.module.css";

/** Every tool the works were built with, once each, in first-seen order. */
const tools = [...new Set(projects.flatMap((p) => p.stack))];

/**
 * A slow, endless strip of the tools behind the works. The list is drawn
 * twice so the loop has no seam; the copy is hidden from assistive tech.
 * It pauses under the pointer and stands still under reduced motion.
 */
export function StackTicker() {
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {tools.map((tool) => (
        <li key={tool} className={styles.item}>
          {tool}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.ticker} aria-label="用過的工具">
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
