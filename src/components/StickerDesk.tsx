import { useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/components/arc/lib/motion-tokens";
import { Button } from "@/components/arc/button/button";
import { CatSticker } from "@/components/CatSticker";
import styles from "./StickerDesk.module.css";

/** One drawing's shared line style: a single stroke weight, token colors. */
function Art({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 96 96"
      width={96}
      height={96}
      fill="none"
      stroke="var(--foreground)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const MUTED = "var(--surface-muted)";
const SOFT = "var(--accent-subtle)";
const ACCENT = "var(--accent)";

interface Sticker {
  id: string;
  label: string;
  /** Placement as left/top in percent, for narrow and wide desks. */
  narrow: readonly [string, string];
  wide: readonly [string, string];
  /** A resting tilt in degrees, so the pile looks tossed down and not placed. */
  tilt: number;
  art: ReactNode;
}

const stickers: Sticker[] = [
  {
    id: "board",
    label: "Arduino 電路板",
    narrow: ["6%", "9%"],
    wide: ["5%", "16%"],
    tilt: -6,
    art: (
      <Art>
        <rect x="12" y="22" width="72" height="52" rx="6" fill={MUTED} />
        <rect x="34" y="34" width="28" height="28" rx="3" fill={SOFT} />
        <path d="M40 34v-5M48 34v-5M56 34v-5M40 62v5M48 62v5M56 62v5" strokeWidth={2} />
        <path d="M12 42h14v-8M84 50H70v10h-8" strokeWidth={2} />
        <circle cx="22" cy="62" r="3" />
        <circle cx="75" cy="32" r="3" fill={ACCENT} stroke="none" />
      </Art>
    ),
  },
  {
    id: "printer",
    label: "3D 印表機",
    narrow: ["37%", "6%"],
    wide: ["21%", "50%"],
    tilt: 4,
    art: (
      <Art>
        <path d="M20 80V18h56v62" />
        <path d="M20 30h56" />
        <rect x="40" y="24" width="16" height="12" rx="2" fill={SOFT} />
        <path d="M45 36l3 8 3-8" fill={MUTED} />
        <rect x="14" y="72" width="68" height="9" rx="2" fill={MUTED} />
        <rect x="38" y="58" width="20" height="14" rx="2" fill={ACCENT} stroke="none" />
      </Art>
    ),
  },
  {
    id: "dish",
    label: "培養皿",
    narrow: ["67%", "11%"],
    wide: ["38%", "14%"],
    tilt: -3,
    art: (
      <Art>
        <path d="M14 46v14c0 7 15 12 34 12s34-5 34-12V46" fill={MUTED} />
        <ellipse cx="48" cy="46" rx="34" ry="12" fill={MUTED} />
        <circle cx="38" cy="45" r="3.5" fill={SOFT} />
        <circle cx="55" cy="48" r="4.5" fill={ACCENT} stroke="none" />
        <circle cx="62" cy="42" r="2.5" fill={SOFT} />
        <circle cx="47" cy="41" r="2" fill={SOFT} />
      </Art>
    ),
  },
  {
    id: "laptop",
    label: "筆電",
    narrow: ["8%", "55%"],
    wide: ["56%", "52%"],
    tilt: 5,
    art: (
      <Art>
        <rect x="20" y="22" width="56" height="40" rx="4" fill={MUTED} />
        <path d="M39 36l-7 6 7 6M57 36l7 6-7 6" />
        <path d="M51 33l-6 18" stroke={ACCENT} />
        <path d="M10 68h76l-6 9H16z" fill={MUTED} />
      </Art>
    ),
  },
  {
    id: "mug",
    label: "咖啡",
    narrow: ["38%", "57%"],
    wide: ["72%", "14%"],
    tilt: -5,
    art: (
      <Art>
        <path d="M26 38h38v24a10 10 0 0 1-10 10H36a10 10 0 0 1-10-10z" fill={MUTED} />
        <path d="M26 46h38" />
        <path d="M64 46h5a8 8 0 0 1 0 16h-5" />
        <path d="M36 28c-4-4 4-6 0-11M46 28c-4-4 4-6 0-11M56 28c-4-4 4-6 0-11" strokeWidth={2} />
      </Art>
    ),
  },
  {
    id: "cat",
    label: "貓",
    narrow: ["67%", "58%"],
    wide: ["86%", "52%"],
    tilt: 3,
    art: (
      <span className={styles.catArt}>
        <CatSticker />
      </span>
    ),
  },
];

const ORDER = stickers.map((s) => s.id);
/** A tilted or lifted sticker pokes a few px past its slot, so keep that much margin. */
const INSET = 8;
const STEP = 16;
const BIG_STEP = 48;

interface Drag {
  id: string;
  pointerId: number;
  startX: number;
  startY: number;
  origin: { x: number; y: number };
  /** How far the sticker may still move each way before it leaves the desk. */
  bounds: { left: number; right: number; up: number; down: number };
}

const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

/**
 * A desk of small drawings, one for each side of the job and the hobbies.
 *
 * Every sticker drags by pointer, or moves with the arrow keys once focused
 * (Shift for bigger steps). They stay inside the desk, the last one touched
 * lands on top, and a reload puts them back. Placement is fixed, never
 * random, so the prerendered markup and the first client render agree.
 */
export function StickerDesk() {
  const reduced = useReducedMotion();
  const desk = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [order, setOrder] = useState<string[]>(ORDER);
  const [active, setActive] = useState<string | null>(null);

  const raise = (id: string) => setOrder((list) => (list[list.length - 1] === id ? list : [...list.filter((x) => x !== id), id]));

  /** The room a slot has left inside the desk, measured from where it is now. */
  const roomFor = (slot: Element) => {
    const area = desk.current?.getBoundingClientRect();
    if (!area) return { left: 0, right: 0, up: 0, down: 0 };
    const box = slot.getBoundingClientRect();
    return {
      left: Math.max(0, box.left - area.left - INSET),
      right: Math.max(0, area.right - box.right - INSET),
      up: Math.max(0, box.top - area.top - INSET),
      down: Math.max(0, area.bottom - box.bottom - INSET),
    };
  };

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const slot = event.currentTarget.parentElement;
    if (!slot) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: offsets[id] ?? { x: 0, y: 0 },
      bounds: roomFor(slot),
    };
    setActive(id);
    raise(id);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const current = drag.current;
    if (!current || current.pointerId !== event.pointerId) return;
    const dx = clamp(event.clientX - current.startX, -current.bounds.left, current.bounds.right);
    const dy = clamp(event.clientY - current.startY, -current.bounds.up, current.bounds.down);
    setOffsets((all) => ({ ...all, [current.id]: { x: current.origin.x + dx, y: current.origin.y + dy } }));
  };

  const onPointerEnd = (event: PointerEvent<HTMLButtonElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return;
    drag.current = null;
    setActive(null);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, id: string) => {
    const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[event.key];
    const slot = event.currentTarget.parentElement;
    if (!dir || !slot) return;
    event.preventDefault();
    const step = event.shiftKey ? BIG_STEP : STEP;
    const room = roomFor(slot);
    const dx = clamp(dir[0] * step, -room.left, room.right);
    const dy = clamp(dir[1] * step, -room.up, room.down);
    setOffsets((all) => {
      const at = all[id] ?? { x: 0, y: 0 };
      return { ...all, [id]: { x: at.x + dx, y: at.y + dy } };
    });
    raise(id);
  };

  const moved = Object.values(offsets).some((o) => o.x !== 0 || o.y !== 0);
  const tidy = () => {
    setOffsets({});
    setOrder(ORDER);
  };

  return (
    <section className={styles.section} aria-labelledby="desk-heading">
      <div className={styles.head}>
        <h2 id="desk-heading" className={styles.heading}>
          我的桌面
        </h2>
        <Button variant="secondary" size="sm" onClick={tidy} disabled={!moved}>
          整理桌面
        </Button>
      </div>
      <p className={styles.lede}>桌上的東西都可以拖來拖去，重新整理就回原位。</p>

      <div ref={desk} className={styles.desk}>
        {/* The die-cut paper edge every sticker shares. Declared once, used by id. */}
        <svg className={styles.defs} width="0" height="0" aria-hidden="true" focusable="false">
          <filter id="sticker-edge" x="-15%" y="-15%" width="130%" height="130%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="grown" />
            <feFlood style={{ floodColor: "var(--background)" }} result="paper" />
            <feComposite in="paper" in2="grown" operator="in" result="edge" />
            <feMerge>
              <feMergeNode in="edge" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>

        {stickers.map((sticker) => {
          const at = offsets[sticker.id] ?? { x: 0, y: 0 };
          const lifted = active === sticker.id;
          const style = {
            "--left": sticker.narrow[0],
            "--top": sticker.narrow[1],
            "--left-wide": sticker.wide[0],
            "--top-wide": sticker.wide[1],
            zIndex: order.indexOf(sticker.id) + 1,
            transform: `translate(${at.x}px, ${at.y}px)`,
          } as CSSProperties;
          return (
            <div key={sticker.id} className={styles.slot} style={style} data-dragging={lifted}>
              <motion.button
                type="button"
                className={styles.sticker}
                aria-label={`${sticker.label}，可拖曳，或用方向鍵移動`}
                animate={{ scale: lifted ? 1.08 : 1, rotate: lifted ? 0 : sticker.tilt }}
                transition={reduced ? { duration: 0 } : motionTokens.spring.snappy}
                onPointerDown={(event) => onPointerDown(event, sticker.id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerEnd}
                onPointerCancel={onPointerEnd}
                onKeyDown={(event) => onKeyDown(event, sticker.id)}
              >
                {sticker.art}
              </motion.button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
