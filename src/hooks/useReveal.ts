import { useEffect } from "react";

/** Shared prefers-reduced-motion check, reused by useReveal and useKineticReveal. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * useReveal — opt-in IntersectionObserver driver for `[data-reveal]`
 * elements. Adds `is-in` when an element first enters the viewport,
 * which CSS picks up via transition. One-shot per element.
 *
 * Respects prefers-reduced-motion at runtime; CSS in animations.css
 * also has a media-query fallback so the page never sits at opacity 0.
 */
export function useReveal(rootMargin = "0px 0px -8% 0px") {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      // Hard-set is-in so CSS sees it; transitions are already disabled.
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (els.length === 0) return;

    // Mark anything already in-view on mount so first paint doesn't
    // show stale opacity:0 content.
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add("is-in");
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin, threshold: 0.04 }
    );

    for (const el of els) {
      if (!el.classList.contains("is-in")) io.observe(el);
    }

    return () => io.disconnect();
  }, [rootMargin]);
}
