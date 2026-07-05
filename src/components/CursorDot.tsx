/**
 * CursorDot — 跟隨式游標裝飾。
 * 只在 desktop 啟用（CSS @media hover: none 隱藏）。
 * - 一般狀態：18px 電光藍圓
 * - hover <a/button>：36px 桃色
 * - hover <p/h1/h2> 等文字節點：垂直 4x28 ink 條
 */
import { useEffect, useRef } from "react";

export function CursorDot() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 觸控裝置不解綁事件，但 CSS 會隱藏。
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0, y = 0, tx = 0, ty = 0, rafId = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        dot.classList.add("is-active");
      }
    };
    const onEnter = () => { visible = true; dot.classList.add("is-active"); };
    const onLeave = () => { visible = false; dot.classList.remove("is-active", "is-hover", "is-text"); };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      // 文字節點
      if (target.closest("h1, h2, h3, h4, p, li, blockquote")) {
        dot.classList.add("is-text");
        dot.classList.remove("is-hover");
      } else if (target.closest("a, button, [role='button'], .hover-target")) {
        dot.classList.add("is-hover");
        dot.classList.remove("is-text");
      } else {
        dot.classList.remove("is-hover", "is-text");
      }
    };

    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden />;
}
