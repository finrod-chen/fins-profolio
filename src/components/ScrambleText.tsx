import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·—+=*#%";

// Seedable RNG so the scramble is identical across renders (no
// hydration mismatch).
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

/**
 * ScrambleText — renders the final `text`, but each char is briefly
 * replaced by a random glyph as it's revealed. Designed for headline
 * accents. Pauses on reduced-motion.
 *
 * Props:
 *   text:        final string to land on (required)
 *   startDelay:  ms before animation begins
 *   perCharMs:   ms per character slot
 *   className:   passthrough
 *   seed:        deterministic RNG seed (default 7)
 */
export function ScrambleText({
  text,
  startDelay = 200,
  perCharMs = 38,
  className,
}: {
  text: string;
  startDelay?: number;
  perCharMs?: number;
  className?: string;
  seed?: number;
}) {
  const [frame, setFrame] = useState(0);
  const ranRef = useRef(false);

  useEffect(() => {
    ranRef.current = false;
    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Skip animation — set frame past the end so we render text as-is.
      setFrame(text.length + 1);
      return;
    }

    const start = performance.now() + startDelay;
    let raf = 0;

    const tick = (now: number) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - start;
      const target = Math.min(text.length, Math.floor(elapsed / perCharMs));
      if (target !== frame) {
        ranRef.current = true;
        setFrame(target);
      }
      if (target < text.length) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // intentionally not depending on `frame` to avoid re-creating rAF
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, startDelay, perCharMs]);

  const rand = rng(7);
  const chars: string[] = [];
  for (let i = 0; i < text.length; i++) {
    if (i < frame) {
      chars.push(text[i]);
    } else if (text[i] === " ") {
      chars.push(" ");
    } else {
      chars.push(GLYPHS[Math.floor(rand() * GLYPHS.length)]);
    }
  }
  const done = frame >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{chars.join("")}</span>
      {!done && <span className="caret" aria-hidden />}
    </span>
  );
}
