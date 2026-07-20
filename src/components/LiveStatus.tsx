/**
 * LiveStatus — 顯示「現在在做什麼」。
 *
 * 三種用法：
 *   <LiveStatus />                       default：完整 chip `● live · HH:MM · 🌙 在家寫程式`
 *   <LiveStatus compact />               摺疊成 `● HH:MM`
 *   <LiveStatus compact showLabel />     摺疊成 `● HH:MM · 🌙` (icon + 時間，無文字)
 *
 * 也可傳 mode="inline" | "fixed"：
 *   - "fixed"（預設）：fixed top-right，永遠可見
 *   - "inline"：inline 區塊，給 Header 內用
 *
 * 不寫 fixed top-x — 改由父層決定位置。
 */

import { useEffect, useState } from "react";

export type LiveStatusMode = "fixed" | "inline";

function describe(hour: number) {
  if (hour >= 6 && hour < 9)   return { emoji: "🌅", msg: "準備進研究室" };
  if (hour >= 9 && hour < 12)  return { emoji: "🧪", msg: "進研究室 · 帶細胞" };
  if (hour >= 12 && hour < 13) return { emoji: "🍱", msg: "午飯 · 配散文" };
  if (hour >= 13 && hour < 17) return { emoji: "🧫", msg: "研究室裡" };
  if (hour >= 17 && hour < 19) return { emoji: "🌆", msg: "剛下班 · 回家路上" };
  if (hour >= 19 && hour < 23) return { emoji: "🌙", msg: "在家寫程式" };
  return { emoji: "🌌", msg: "睡了 · 但也許還醒著" };
}

export function LiveStatus({
  compact = false,
  showLabel = false,
  mode = "fixed",
  className = "",
}: {
  compact?: boolean;
  /** compact 模式下額外顯示 emoji */
  showLabel?: boolean;
  mode?: LiveStatusMode;
  className?: string;
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const wrapperClass =
    mode === "fixed"
      ? `chip is-out ${className}`
      : `chip ${className}`;
  const isCompact = compact;

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const desc = describe(now.getHours());

  if (isCompact) {
    return (
      <span
        className={`${wrapperClass} !gap-1.5 !text-[10px] !px-2 !py-1 sm:!text-[11px] sm:!px-2.5`}
        aria-label={`現在 ${hh}:${mm}, ${desc.msg}`}
      >
        <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
        <span className="font-mono tabular-nums">{hh}:{mm}</span>
        {showLabel && <span className="text-[10px]">{desc.emoji}</span>}
      </span>
    );
  }

  return (
    <div
      className={wrapperClass}
      aria-label={`目前狀態, ${desc.msg}`}
    >
      <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
      <span className="uppercase tracking-wider">live</span>
      <span className="opacity-50">·</span>
      <span className="font-mono tabular-nums">{hh}:{mm}</span>
      <span className="opacity-50">·</span>
      <span>{desc.emoji} {desc.msg}</span>
    </div>
  );
}
