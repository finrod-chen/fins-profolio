/**
 * useTilt — 跟隨滑鼠的 3D 傾斜 (ProjectCard hover 用)。
 * 回傳 ref + onMouseMove / onMouseLeave handlers。
 */
import { useRef } from "react";

export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * maxDeg;
    const ry = (px - 0.5) * maxDeg;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  };

  return { ref, onMouseMove, onMouseLeave };
}
