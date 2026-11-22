import type { SVGProps } from "react";

/**
 * A side-on cat in the site's own line style: one stroke weight, token
 * colors, no gradients. It faces right by default.
 *
 * `long` stretches the body, never the face, so the eyes and ears keep their
 * proportions. That is the Long Cat joke, and the walker egg uses it.
 */
export function CatSticker({
  long = false,
  ...props
}: { long?: boolean } & Omit<SVGProps<SVGSVGElement>, "viewBox" | "children">) {
  const extra = long ? 84 : 0;
  const width = 96 + extra;
  const bodyCx = 40 + extra / 2;
  const bodyRx = 28 + extra / 2;
  const head = 72 + extra;
  return (
    <svg
      viewBox={`0 0 ${width} 64`}
      width={width}
      height={64}
      fill="none"
      stroke="var(--foreground)"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* tail */}
      <path d="M14 42C3 40 2 24 11 19" />
      {/* legs, behind the body */}
      <path d="M24 52v8M35 53v7" />
      <path d={`M${50 + extra} 53v7M${61 + extra} 52v8`} />
      <ellipse cx={bodyCx} cy={40} rx={bodyRx} ry={15} fill="var(--surface-muted)" />
      {/* head */}
      <path d={`M${head - 9} 20 L${head - 8} 7 L${head} 16`} fill="var(--surface-muted)" />
      <path d={`M${head + 9} 16 L${head + 16} 7 L${head + 17} 21`} fill="var(--surface-muted)" />
      <circle cx={head} cy={30} r={13} fill="var(--surface-muted)" />
      <circle cx={head - 5} cy={28} r={1.6} fill="var(--foreground)" stroke="none" />
      <circle cx={head + 6} cy={28} r={1.6} fill="var(--foreground)" stroke="none" />
      <path d={`M${head - 1} 33l2 0`} />
      <path d={`M${head + 10} 31l9 -2M${head + 10} 34l9 2`} strokeWidth={1.75} />
    </svg>
  );
}
