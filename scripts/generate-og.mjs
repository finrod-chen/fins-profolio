// ============================================================
// Generate the site's social-share OG image (1200×630 PNG).
//
//   node scripts/generate-og.mjs   →   public/og-image.png
//
// The card follows the site: black ground, thin column rules, a mono label
// with an orange square, the logo lockup and the tagline in pixel type.
// The logo comes from finrod-logo-pack, so replacing the artwork there and
// re-running this keeps the share image in step.
//
// resvg reads TTF/OTF, not the site's woff2 files, so the two pixel faces
// are cut down to just this card's characters and converted on the fly.
// Re-run whenever the logo, the tagline or the colors change.
// ============================================================
import { Resvg } from "@resvg/resvg-js";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const subsetFont = require("subset-font");
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public/og-image.png");

// Colors, matching src/styles/global.css.
const BG = "#000000";
const FG = "#f5f5f5";
const MUTED = "#8a8a8a";
const LINE = "rgba(255,255,255,0.13)";
const GRID = "rgba(255,255,255,0.06)";
const ACCENT = "#f26b1d";

const W = 1200;
const H = 630;
const PAD = 72;

const LINES = ["白天做細胞治療，", "晚上寫 side project。"];
const LABEL = "FINROD CHEN · PORTFOLIO";
const FOOT_LEFT = "FINROD.XYZ";
const FOOT_RIGHT = "WEB · CLOUD · 3D PRINT · ARDUINO";

/** The viewBox and path data of a logo-pack SVG. */
function logo(file) {
  const svg = readFileSync(join(root, "finrod-logo-pack", file), "utf8");
  const [, , vw, vh] = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
  const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  return { vw, vh, paths };
}

/** A logo placed at (x, y) and scaled to a height. Returns its markup and width. */
function place(art, x, y, height, fill) {
  const k = height / art.vh;
  const body = art.paths.map((d) => `<path d="${d}" fill-rule="evenodd"/>`).join("");
  return { svg: `<g transform="translate(${x} ${y}) scale(${k})" fill="${fill}">${body}</g>`, width: art.vw * k };
}

// Pixel faces as TTF, holding only what this card draws.
const cardText = LINES.join("");
const fontDir = mkdtempSync(join(tmpdir(), "og-fonts-"));
const fonts = [
  ["public/fonts/GeistPixel-Square.woff2", "geist-pixel.ttf"],
  [
    require.resolve(
      "@fontsource/fusion-pixel-12px-proportional-tc/files/fusion-pixel-12px-proportional-tc-latin-400-normal.woff2",
    ),
    "fusion-pixel.ttf",
  ],
];
const fontFiles = [];
for (const [src, name] of fonts) {
  const ttf = await subsetFont(readFileSync(resolve(root, src)), cardText, { targetFormat: "sfnt" });
  const file = join(fontDir, name);
  writeFileSync(file, ttf);
  fontFiles.push(file);
}
const PIXEL = "'Geist Pixel Square', 'Fusion Pixel 12px Proportional zh_hant'";
const MONO = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";

// Six column rules inside the padding, like the site's grid lines.
let grid = "";
for (let i = 0; i <= 6; i++) {
  const x = PAD + ((W - PAD * 2) / 6) * i;
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${GRID}" stroke-width="1"/>`;
}

const symbol = place(logo("finrod-symbol.svg"), PAD, 150, 76, ACCENT);
const wordmark = place(logo("finrod-wordmark.svg"), PAD + symbol.width + 22, 156, 70, FG);

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${grid}
  <rect x="${PAD}" y="${PAD + 2}" width="12" height="12" fill="${ACCENT}"/>
  <text x="${PAD + 24}" y="${PAD + 13}" font-family="${MONO}" font-size="19" letter-spacing="2.4" fill="${FG}">${LABEL}</text>
  ${symbol.svg}
  ${wordmark.svg}
  <text font-family="${PIXEL}" font-size="58" fill="${FG}">
    <tspan x="${PAD}" y="352">${LINES[0]}</tspan>
    <tspan x="${PAD}" y="428">${LINES[1]}</tspan>
  </text>
  <line x1="${PAD}" y1="520" x2="${W - PAD}" y2="520" stroke="${LINE}" stroke-width="1"/>
  <text x="${PAD}" y="566" font-family="${MONO}" font-size="20" letter-spacing="2.4" fill="${FG}">${FOOT_LEFT}</text>
  <text x="${W - PAD}" y="566" text-anchor="end" font-family="${MONO}" font-size="18" letter-spacing="2.4" fill="${MUTED}">${FOOT_RIGHT}</text>
</svg>`;

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { fontFiles, loadSystemFonts: true, defaultFontFamily: "DejaVu Sans" },
}).render();
writeFileSync(OUT, png.asPng());
console.log(`wrote ${OUT} (${png.width}×${png.height})`);
