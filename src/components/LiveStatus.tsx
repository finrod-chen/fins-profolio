/**
 * LiveStatus — 桌機頁面右上角浮動即時狀態 (無地名)。
 * 「● live · HH:MM · 🌙 在家寫程式」
 * 每分鐘更新一次。
 */
import { useEffect, useState } from "react";

function describe(hour: number) {
  if (hour >= 6 && hour < 9)  return { emoji: "🌅", msg: "準備進研究室" };
  if (hour >= 9 && hour < 12) return { emoji: "🧪", msg: "進研究室 · 帶細胞" };
  if (hour >= 12 && hour < 13) return { emoji: "🍱", msg: "午飯 · 配散文" };
  if (hour >= 13 && hour < 17) return { emoji: "🧫", msg: "研究室裡" };
  if (hour >= 17 && hour < 19) return { emoji: "🌆", msg: "剛下班 · 回家路上" };
  if (hour >= 19 && hour < 23) return { emoji: "🌙", msg: "在家寫程式" };
  return { emoji: "🌌", msg: "睡了 · 但也許還醒著" };
}

export function LiveStatus() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="hidden md:flex fixed top-20 right-5 z-40 chip is-out">
        <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-mute)]" />
        <span>loading</span>
      </div>
    );
  }

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const desc = describe(now.getHours());

  return (
    <div className="hidden md:flex fixed top-20 right-5 z-40 chip is-out">
      <span className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
      <span>live</span>
      <span className="opacity-50">·</span>
      <span className="font-mono tabular-nums">{hh}:{mm}</span>
      <span className="opacity-50">·</span>
      <span>{desc.emoji} {desc.msg}</span>
    </div>
  );
}
