import type { ReactNode } from "react";

/**
 * BloBg — 大色塊 blob 漂浮背景。
 * 三個 blob（藍 / 桃紅 / 桃黃）+ 旋轉 svg 線條。
 */
export function BloBg({
  className = "",
  children,
  variant = "all",
}: {
  className?: string;
  children?: ReactNode;
  variant?: "all" | "warm" | "cool";
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* blobs */}
      {variant !== "cool" && (
        <>
          <div className="blob blob-1" style={{ left: "-8%", top: "10%", width: 480, height: 480, background: "var(--color-coral)" }} />
          <div className="blob blob-2" style={{ right: "-12%", top: "30%", width: 520, height: 520, background: "var(--color-amber)" }} />
        </>
      )}
      {variant !== "warm" && (
        <div className="blob blob-3" style={{ left: "30%", top: "60%", width: 600, height: 600, background: "var(--color-accent)" }} />
      )}
      {/* subtle dot grid */}
      <div className="absolute inset-0 bg-dots opacity-30 mix-blend-multiply" />
      <div className="relative">{children}</div>
    </div>
  );
}
