import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./FlapText.module.css";

const NBSP = String.fromCharCode(160);

/**
 * Text that arrives like a split-flap board: each character flips down
 * from above, one after another, settling with a small overswing. The About
 * page uses it, where the home page scrambles and the writing pages type.
 *
 * The full text is in the markup twice over: once for assistive tech and
 * search (visually hidden), once as the flipping characters (hidden from
 * assistive tech). `onView` waits until the text scrolls in; otherwise it
 * plays once the page is running. Without script the text simply shows, and
 * under reduced motion it never flips.
 */
export function FlapText({ text, onView = false }: { text: string; onView?: boolean }) {
  const node = useRef<HTMLSpanElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = node.current;
    if (!onView || !el || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setPlay(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPlay(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onView]);

  return (
    <span ref={node} className={styles.flap} data-play={play ? "" : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {[...text].map((ch, i) => (
          <span key={i} className={styles.char} style={{ "--i": i } as CSSProperties}>
            {ch === " " ? NBSP : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
