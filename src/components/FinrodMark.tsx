/**
 * FinrodMark — Footer 上方巨型顯示的 SVG 字 + 圖騰裝飾。
 * 「Finrod」四字 + 兩側巨型圈 + 橫線。
 */
export function FinrodMark() {
  return (
    <div className="relative w-full overflow-hidden py-10 sm:py-14 bg-[var(--color-ink)]">
      {/* 兩側彩圈 */}
      <div className="absolute left-[-6%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, var(--color-coral), transparent 70%)" }} />
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, var(--color-amber), transparent 70%)" }} />

      <div className="relative flex items-center justify-center gap-6 sm:gap-10">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden className="opacity-90 hidden sm:block">
          <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-accent-soft)" strokeWidth="2" />
          <circle cx="28" cy="28" r="6"  fill="var(--color-coral)" />
        </svg>

        <span
          className="finrod-mark gradient-text-pan"
          aria-label="Finrod"
        >
          Finrod
        </span>

        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden className="opacity-90 hidden sm:block">
          <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-amber)" strokeWidth="2" />
          <circle cx="28" cy="28" r="6"  fill="var(--color-accent)" />
        </svg>
      </div>

      <div className="mt-6 text-center font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-paper)] opacity-70">
        est. 2022 · keep shipping ✦ keep breaking ✦ keep trying
      </div>
    </div>
  );
}
