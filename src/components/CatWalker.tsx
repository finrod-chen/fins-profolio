import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CatSticker } from "@/components/CatSticker";
import styles from "./CatWalker.module.css";

const WORD = "meow";
/** Keys typed further apart than this start the word over. */
const KEY_GAP_MS = 1500;
const CLICKS = 5;
/** Clicks on the brand mark further apart than this start the count over. */
const CLICK_GAP_MS = 2500;

interface Walk {
  id: number;
  long: boolean;
  /** Viewport width when the walk began, so the cat crosses the whole screen. */
  span: number;
}

function typingInField(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName);
}

/**
 * Two small eggs that send a cat across the bottom of the screen.
 *
 * Typing "meow" anywhere (outside a form field) sends a regular cat. Clicking
 * the brand mark five times in a row sends a Long Cat. The cat crosses once and
 * is gone; a second trigger while it is walking is ignored. Under reduced
 * motion it does not travel: it fades in and out in the corner instead.
 */
export function CatWalker() {
  const reduced = useReducedMotion();
  const [walk, setWalk] = useState<Walk | null>(null);
  const walking = useRef(false);
  const counter = useRef(0);

  useEffect(() => {
    let typed = "";
    let lastKey = 0;
    let clicks = 0;
    let lastClick = 0;

    const start = (long: boolean) => {
      if (walking.current) return;
      walking.current = true;
      setWalk({ id: ++counter.current, long, span: window.innerWidth });
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
      if (typingInField(event.target) || event.key.length !== 1) return;
      const now = event.timeStamp;
      typed = (now - lastKey > KEY_GAP_MS ? "" : typed) + event.key.toLowerCase();
      lastKey = now;
      typed = typed.slice(-WORD.length);
      if (typed === WORD) {
        typed = "";
        start(false);
      }
    };

    // Delegated, so a mouse click and a keyboard activation both count, and the
    // header's own anchor needs no change.
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest("a")?.querySelector("svg[data-brand-mark]")) return;
      const now = event.timeStamp;
      clicks = now - lastClick > CLICK_GAP_MS ? 1 : clicks + 1;
      lastClick = now;
      if (clicks >= CLICKS) {
        clicks = 0;
        start(true);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const done = () => {
    walking.current = false;
    setWalk(null);
  };

  if (!walk) return null;
  const width = walk.long ? 180 : 96;

  if (reduced) {
    return (
      <motion.div
        key={walk.id}
        className={styles.still}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.2, times: [0, 0.15, 0.8, 1] }}
        onAnimationComplete={done}
      >
        <CatSticker long={walk.long} />
      </motion.div>
    );
  }

  return (
    <motion.div
      key={walk.id}
      className={styles.walker}
      aria-hidden="true"
      initial={{ x: -width - 16 }}
      animate={{ x: walk.span + 16 }}
      transition={{ duration: walk.long ? 7 : 4.5, ease: "linear" }}
      onAnimationComplete={done}
    >
      {/* A small bob so it reads as steps and not as a slide. */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
      >
        <CatSticker long={walk.long} />
      </motion.div>
    </motion.div>
  );
}
