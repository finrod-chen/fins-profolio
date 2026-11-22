import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "motion/react";
import { Button } from "@/components/arc/button/button";
import { CatSticker } from "@/components/CatSticker";
import styles from "./LaserChase.module.css";

/** Where "換個地方" puts the dot, as fractions of the play area's half size. */
const SPOTS: ReadonlyArray<readonly [number, number]> = [
  [-0.7, -0.5],
  [0.65, 0.45],
  [0.7, -0.55],
  [-0.55, 0.5],
  [0, 0],
];

const DOT = 12;
const EDGE = 20;
/** The cat's head sits this far from the middle of its drawing. */
const HEAD = 24;
const caught = 22;
const loose = 70;

/**
 * A laser dot and a cat that chases it, for the not-found page.
 *
 * The dot follows the pointer (a tap on touch, or the button for keyboards),
 * the cat follows the dot a beat behind, and each time the cat's head reaches
 * it that counts as a catch. Under reduced motion the dot still moves but the
 * cat stays put and nothing is counted, since the chase is the motion. That
 * is done in CSS, not by rendering differently, because the prerendered page
 * cannot know the preference and the first client render has to match it.
 * The play area is decorative: the button is the way in for everyone else.
 */
export function LaserChase() {
  const reduced = useReducedMotion();
  const area = useRef<HTMLDivElement>(null);
  const spot = useRef(0);
  const near = useRef(false);
  const [catches, setCatches] = useState(0);
  const [facingRight, setFacingRight] = useState(true);

  // Offsets from the middle of the play area. Server and first client render
  // agree because nothing here reads the browser until an event fires.
  const aimX = useMotionValue(110);
  const aimY = useMotionValue(0);
  const dotX = useSpring(aimX, { stiffness: 700, damping: 45 });
  const dotY = useSpring(aimY, { stiffness: 700, damping: 45 });
  const catX = useSpring(dotX, { stiffness: 38, damping: 11 });
  const catY = useSpring(dotY, { stiffness: 38, damping: 11 });

  const check = () => {
    if (reduced) return;
    const head = catX.get() + (facingRight ? HEAD : -HEAD);
    const dx = dotX.get() - head;
    const dy = dotY.get() - catY.get();
    const distance = Math.hypot(dx, dy);
    if (distance < caught && !near.current) {
      near.current = true;
      setCatches((count) => count + 1);
    } else if (distance > loose) {
      near.current = false;
    }
    const wantsRight = dotX.get() >= catX.get();
    if (Math.abs(dotX.get() - catX.get()) > 14 && wantsRight !== facingRight) setFacingRight(wantsRight);
  };
  useMotionValueEvent(catX, "change", check);
  useMotionValueEvent(catY, "change", check);

  const aimAt = (x: number, y: number) => {
    const node = area.current;
    if (!node) return;
    const { width, height } = node.getBoundingClientRect();
    const nx = Math.max(-(width / 2 - EDGE), Math.min(width / 2 - EDGE, x));
    const ny = Math.max(-(height / 2 - EDGE), Math.min(height / 2 - EDGE, y));
    aimX.set(nx);
    aimY.set(ny);
    if (reduced) {
      dotX.jump(nx);
      dotY.jump(ny);
    }
  };

  const onPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    aimAt(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
  };

  const nextSpot = () => {
    const node = area.current;
    if (!node) return;
    const { width, height } = node.getBoundingClientRect();
    const [fx, fy] = SPOTS[spot.current % SPOTS.length];
    spot.current += 1;
    aimAt((fx * width) / 2, (fy * height) / 2);
  };

  return (
    <div className={styles.wrap}>
      <div
        ref={area}
        className={styles.area}
        onPointerMove={onPointer}
        onPointerDown={onPointer}
        aria-hidden="true"
      >
        <p className={styles.count}>
          抓到 <span className={styles.number}>{catches}</span> 次
        </p>
        <motion.span className={styles.cat} style={{ x: catX, y: catY }}>
          <span className={styles.flip} data-facing={facingRight ? "right" : "left"}>
            <CatSticker />
          </span>
        </motion.span>
        <motion.span className={styles.dot} style={{ x: dotX, y: dotY, width: DOT, height: DOT }} />
      </div>
      <div className={styles.row}>
        <p className={styles.hint}>游標移進框裡，貓會去追光點。手機點一下就能換位置。</p>
        <Button variant="secondary" size="sm" onClick={nextSpot}>
          換個地方
        </Button>
      </div>
    </div>
  );
}
