/**
 * FinrodMark — Footer 上方巨型 logo 區。
 * 左 / 右 inline logo (mark 倒置 invert=true 在深底用)，中間留白給 layout 節奏。
 * 原本的 pan-text 大字已抽到 Logo 元件，這裡改放大型 SVG logo + 短句。
 */
import { Logo } from "@/components/Logo";

export function FinrodMark() {
  return (
    <div className="relative w-full overflow-hidden py-12 sm:py-16 bg-[var(--color-ink)]">
      {/* 兩側彩圈 */}
      <div
        className="absolute left-[-6%] top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, var(--color-coral), transparent 70%)" }}
      />
      <div
        className="absolute right-[-4%] top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, var(--color-amber), transparent 70%)" }}
      />

      <div className="relative flex flex-col items-center justify-center gap-6">
        <Logo variant="mark" className="!w-[160px] !h-[160px] sm:!w-[200px] sm:!h-[200px] mb-10 sm:mb-16" />

        <div className="text-center font-mono text-[10px] tracking-[0.32em] uppercase text-[var(--color-paper)] opacity-70">
          est. 2022 · keep shipping ✦ keep breaking ✦ keep trying
        </div>
      </div>
    </div>
  );
}
