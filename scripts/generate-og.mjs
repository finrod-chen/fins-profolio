// ============================================================
// Generate the site's social-share OG image (1200×630 PNG).
//
//   node scripts/generate-og.mjs   →   public/og-image.png
//
// Renders an on-brand "industrial / light" card via an inline SVG,
// rasterised with @resvg/resvg-js (loads system fonts incl. CJK).
// Re-run this whenever the headline / name / colours change.
// ============================================================
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/og-image.png");

// Design tokens (mirror src/index.css)
const PAPER = "#FAFAF9";
const INK = "#0A0A0A";
const INK2 = "#1F1F1E";
const MUTE = "#6B6B68";
const LINE = "#D9D9D4";
const ACCENT = "#FF4D00";

const W = 1200;
const H = 630;

// faint cross-grid (every 48px)
let grid = "";
for (let x = 48; x < W; x += 48) {
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${INK}" stroke-opacity="0.035" stroke-width="1"/>`;
}
for (let y = 48; y < H; y += 48) {
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${INK}" stroke-opacity="0.035" stroke-width="1"/>`;
}

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${grid}
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}" fill="none" stroke="${INK}" stroke-width="1.5"/>

  <!-- stamp -->
  <g>
    <rect x="72" y="66" width="346" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <rect x="88" y="80" width="12" height="12" fill="${ACCENT}"/>
    <text x="112" y="93" font-family="Consolas, 'JetBrains Mono', monospace" font-size="17" letter-spacing="3" fill="${INK}">FIN · PORTFOLIO · 2026</text>
  </g>

  <!-- headline -->
  <text x="70" y="296" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="96" letter-spacing="-3" fill="${INK}">Side projects,</text>
  <text x="70" y="408" font-family="'Segoe UI', Arial, sans-serif" font-weight="800" font-size="96" letter-spacing="-3" fill="${INK}">built <tspan fill="${ACCENT}">carefully</tspan>.</text>

  <!-- subtitle -->
  <text x="74" y="476" font-family="'Segoe UI', Arial, sans-serif" font-weight="500" font-size="30" fill="${INK2}">Finrod - 白天做細胞，晚上寫 Side Project</text>

  <!-- footer rule + mono row -->
  <line x1="72" y1="540" x2="${W - 72}" y2="540" stroke="${LINE}" stroke-width="1.5"/>
  <text x="72" y="572" font-family="Consolas, 'JetBrains Mono', monospace" font-size="20" letter-spacing="2" fill="${MUTE}">FINROD-PORTFOLIO.PAGES.DEV</text>
  <text x="${W - 72}" y="572" text-anchor="end" font-family="Consolas, 'JetBrains Mono', monospace" font-size="20" letter-spacing="2" fill="${MUTE}">INDEPENDENT WEB WORKS</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true },
  background: PAPER,
});
const png = resvg.render().asPng();
writeFileSync(OUT, png);
console.log(`✓ wrote ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);
