import { Fragment, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Latin stand-ins the pixel face draws well. */
const LATIN = "#%&*+=<>/[]{}?!$@0123456789ABCDEFGHJKLMNPRSTUVWXYZ";
const DURATION = 1100;
const TICK = 45;

const isCjk = (ch: string) => /[\u3000-\u9fff\uff00-\uffef]/.test(ch);

/**
 * Pixel-type text that settles out of noise: every character flickers through
 * stand-ins and locks into place, left to right, once.
 *
 * The first render is the real text, so the prerendered page, search engines
 * and the no-JavaScript case all get it as written; the scramble only runs in
 * the browser afterwards. CJK characters flicker through other characters of
 * the same text, which the subsetted pixel font is sure to contain.
 * `onView` waits until the text scrolls into view. Nothing runs under
 * reduced motion.
 */
export function ScrambleText({ lines, onView = false }: { lines: string[]; onView?: boolean }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(lines);
  const anchor = useRef<HTMLSpanElement>(null);
  const key = lines.join("\n");

  useEffect(() => {
    if (reduced) return;
    const text = key;
    const cjkPool = [...text].filter(isCjk);
    let frame = 0;
    let start = 0;
    let last = 0;
    let observer: IntersectionObserver | undefined;

    const scramble = (elapsed: number) =>
      [...text]
        .map((ch, i, all) => {
          if (ch === "\n" || ch === " ") return ch;
          const lockAt = 150 + (i / all.length) * (DURATION - 150);
          if (elapsed >= lockAt) return ch;
          const pool = isCjk(ch) && cjkPool.length ? cjkPool : LATIN;
          return pool[Math.floor(Math.random() * pool.length)];
        })
        .join("");

    const step = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      if (now - last >= TICK || elapsed >= DURATION) {
        last = now;
        setShown(scramble(elapsed).split("\n"));
      }
      if (elapsed < DURATION) frame = requestAnimationFrame(step);
    };
    const run = () => {
      frame = requestAnimationFrame(step);
    };

    if (onView && anchor.current && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          observer?.disconnect();
          run();
        }
      });
      observer.observe(anchor.current);
    } else {
      run();
    }
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [key, onView, reduced]);

  return (
    <span ref={anchor}>
      {shown.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </span>
  );
}
