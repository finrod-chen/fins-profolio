/**
 * The brand mark beside the site name: an F drawn as two strokes.
 * Neutral by design, so it sits quietly in both themes and takes the
 * accent only when the header asks for it.
 */
export function BrandMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      role="img"
      aria-label="Finrod Chen"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
    >
      <path d="M7 19V6.5A1.5 1.5 0 0 1 8.5 5H18" />
      <path d="M7 12h7.5" />
    </svg>
  );
}
