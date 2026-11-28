import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./TypeText.module.css";

/**
 * Text typed out one character at a time behind a block cursor, which blinks
 * a few times when the line is done and then goes. The writing pages use it
 * for their titles, where the home page scrambles instead.
 *
 * The whole text is always in the markup, so the prerendered page, search
 * engines and the layout get it as written: characters not typed yet are
 * only transparent, so the title never reflows while it types. Until the
 * script starts (the `js` class on <html>), CSS keeps the line hidden rather
 * than show it and then retype it. Under reduced motion it simply appears.
 */
export function TypeText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const chars = [...text];
  const [count, setCount] = useState(chars.length);
  const [phase, setPhase] = useState<"idle" | "typing" | "done">("idle");

  useEffect(() => {
    const total = [...text].length;
    let frame = 0;
    if (reduced) {
      frame = requestAnimationFrame(() => {
        setCount(total);
        setPhase("done");
      });
      return () => cancelAnimationFrame(frame);
    }
    // About a second for any length, but never faster or slower than a typist could be.
    const perChar = Math.min(70, Math.max(24, 1000 / Math.max(total, 1)));
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const typed = Math.min(total, Math.floor((now - start) / perChar));
      setCount(typed);
      setPhase(typed < total ? "typing" : "done");
      if (typed < total) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [text, reduced]);

  return (
    <span className={styles.line} data-typetext="" data-phase={phase}>
      <span>{chars.slice(0, count).join("")}</span>
      <span className={styles.cursor} aria-hidden="true" />
      <span className={styles.rest} aria-hidden={phase === "typing" || undefined}>
        {chars.slice(count).join("")}
      </span>
    </span>
  );
}
