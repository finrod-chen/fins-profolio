import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/hooks/useReveal";

type KineticTag = "h1" | "h2" | "h3" | "span";

/**
 * KineticText — word-by-word "wipe up" reveal for headlines.
 * Splits `text` on whitespace, wraps each word in an overflow-hidden
 * span so it can slide up into place with a per-word stagger. Renders
 * fully visible (no split/animation) when prefers-reduced-motion is set.
 *
 * Only meant for plain heading strings (no inline markup) — pages that
 * need a colored inline span (e.g. a trailing "." accent) should render
 * that span as a sibling after <KineticText>, not inside `text`. Use
 * `as="span"` when nesting inside another component that already
 * renders the heading element (e.g. BigSectionNumber's <h2>), so two
 * heading tags don't end up nested.
 */
export function KineticText({
  text,
  as = "h1",
  stagger = 45,
  className = "",
}: {
  text: string;
  as?: KineticTag;
  /** ms delay added per word index, applied via the --i custom property */
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.classList.add("is-in");
      return;
    }

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={(node) => {
        ref.current = node;
      }}
      className={`kinetic-text ${className}`}
    >
      {words.map((word, i) => (
        <span className="kinetic-word" key={`${word}-${i}`}>
          <span
            className="kinetic-word-inner"
            style={{ transitionDelay: `${i * stagger}ms` } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
