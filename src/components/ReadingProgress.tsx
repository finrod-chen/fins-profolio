import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import styles from "./ReadingProgress.module.css";

/**
 * A hairline across the top of the window that fills as the article is
 * read: empty when its top reaches the top of the window, full when its end
 * comes into view. Written straight to the element's transform on scroll,
 * so reading never re-renders the page. It reports position, so it stays
 * under reduced motion too, just without easing.
 */
export function ReadingProgress({ target }: { target: RefObject<HTMLElement | null> }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = target.current;
      const line = bar.current;
      if (!el || !line) return;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const progress = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      line.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [target]);

  return <div ref={bar} className={styles.bar} aria-hidden="true" />;
}
