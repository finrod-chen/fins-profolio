import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/**
 * Logo — Finrod Chen 品牌元件 (SVG inline)
 * variant:
 *   - "mark"      72x72 monogram
 *   - "lockup"    280x72 logo + tagline
 *   - "favicon"   32x32 給 share image / OG 用
 *   - "footer"    220x56 給 footer 用
 *
 * 使用 SVG inline 保證色彩、stroke、自訂樣式都精準，
 * 並可被 currentColor / CSS vars 控制 hover、accent 等效果。
 */
export type LogoVariant = "mark" | "lockup" | "favicon" | "footer";

const dims: Record<LogoVariant, { w: number; h: number }> = {
  favicon: { w: 32, h: 32 },
  mark:    { w: 72, h: 72 },
  footer:  { w: 220, h: 56 },
  lockup:  { w: 280, h: 72 },
};

export function Logo({
  variant = "mark",
  invert = false,
  className = "",
  asLink = false,
}: {
  variant?: LogoVariant;
  /** true 時換成 light bg + ink F（深底環境變淺底） */
  invert?: boolean;
  className?: string;
  /** true 時包成 <Link>，給 Footer / AboutPage 之類可點回首頁 */
  asLink?: boolean;
}) {
  const { w, h } = dims[variant];
  const body: ReactNode =
    variant === "lockup" || variant === "footer"
      ? <LockupSvg invert={invert} compact={variant === "footer"} />
      : <MarkSvg size={w} invert={invert} />;

  const el = (
    <span
      className={`inline-block ${className}`}
      style={className?.includes("!w-") || className?.includes("w-[")
        ? undefined
        : { width: w, height: h }}
      role="img"
      aria-label="Finrod Chen"
    >
      {body}
    </span>
  );

  if (asLink) {
    return <Link to="/" aria-label="Finrod Chen — 回首頁">{el}</Link>;
  }
  return el;
}

function MarkSvg({ size, invert }: { size: number; invert: boolean }) {
  // 32 用 viewBox 32，72+ 用 viewBox 72 (內部抽象座標)
  const vb = size <= 32 ? 32 : 72;
  const bg = invert ? "#FAFAF7" : "#0A0E1A";
  const fg = invert ? "#0A0E1A" : "#FAFAF7";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${vb} ${vb}`}
      xmlns="http://www.w3.org/2003/svg"
      style={{ display: "block" }}
    >
      <rect
        width={vb}
        height={vb}
        rx={vb === 32 ? 6 : 14}
        fill={bg}
      />
      <g fill={fg}>
        {vb === 32 ? (
          <>
            <rect x="7" y="7" width="6" height="18" />
            <rect x="7" y="7" width="18" height="6" />
            <rect x="7" y="13" width="11" height="4" />
          </>
        ) : (
          <>
            <rect x="16" y="16" width="13" height="40" />
            <rect x="16" y="16" width="40" height="13" />
            <rect x="16" y="29" width="24" height="10" />
          </>
        )}
      </g>
      <circle
        cx={vb === 32 ? 25 : 56}
        cy={vb === 32 ? 25 : 56}
        r={vb === 32 ? 3 : 6}
        fill="#FF6B5C"
      />
      <rect
        x={vb === 32 ? 6 : 14}
        y={vb === 32 ? 25 : 56}
        width={vb === 32 ? 10 : 22}
        height={vb === 32 ? 1.5 : 3}
        fill="#0066FF"
      />
    </svg>
  );
}

function LockupSvg({ invert, compact }: { invert: boolean; compact: boolean }) {
  const fg = invert ? "#FAFAF7" : "#0A0E1A";
  const bg = invert ? "#0A0E1A" : "#FAFAF7";
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={compact ? "0 0 220 56" : "0 0 280 72"}
      xmlns="http://www.w3.org/2003/svg"
      style={{ display: "block" }}
    >
      {/* monogram block */}
      <rect width={compact ? 56 : 72} height={compact ? 56 : 72} rx={compact ? 12 : 14} fill={bg} />
      <g fill={fg}>
        {compact ? (
          <>
            <rect x="13" y="13" width="10" height="30"/>
            <rect x="13" y="13" width="30" height="10"/>
            <rect x="13" y="23" width="18" height="7"/>
          </>
        ) : (
          <>
            <rect x="16" y="16" width="13" height="40"/>
            <rect x="16" y="16" width="40" height="13"/>
            <rect x="16" y="29" width="24" height="10"/>
          </>
        )}
      </g>
      <circle cx={compact ? 44 : 56} cy={compact ? 44 : 56} r={compact ? 5 : 6} fill="#FF6B5C" />
      <rect x={compact ? 11 : 14} y={compact ? 44 : 56} width={compact ? 18 : 22} height={compact ? 2 : 3} fill="#0066FF" />

      {/* wordmark (always darker outside the mark regardless of invert intent — except for true dark surfaces) */}
      <g transform={`translate(${compact ? 72 : 92},0)`}>
        {!compact && (
          <rect x="0" y="49" width="160" height="1" fill="#0A0E1A" opacity="0.18"/>
        )}
        <text
          x="0"
          y={compact ? 36 : 42}
          fontFamily="'Iowan Old Style', Georgia, 'Noto Serif TC', serif"
          fontSize={compact ? 22 : 28}
          fontWeight="700"
          letterSpacing={compact ? -0.4 : -0.6}
          fill={fg}
        >
          Finrod
        </text>
        {!compact && (
          <text
            x="0"
            y="62"
            fontFamily="ui-monospace, 'JetBrains Mono', monospace"
            fontSize="9"
            fontWeight="600"
            letterSpacing="2.5"
            fill={fg}
            opacity="0.6"
          >
            CHEN · WORKS · 2026
          </text>
        )}
      </g>
    </svg>
  );
}
