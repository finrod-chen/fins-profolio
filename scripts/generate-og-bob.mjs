// ============================================================
// Generate the OG image for 居家防災包檢點 (bob.finrod.xyz).
//
//   node scripts/generate-og-bob.mjs   →   public/screenshots/bob-og.png
//
// Same industrial / light card as scripts/generate-og.mjs, but with the
// checklist marks as the one memorable detail. The PNG doubles as the
// work card cover here and as the og:image of bob.finrod.xyz itself.
// ============================================================
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../public/screenshots/bob-og.png");

// Design tokens (mirror src/index.css)
const PAPER = "#FAFAF9";
const INK = "#0A0A0A";
const INK2 = "#1F1F1E";
const MUTE = "#6B6B68";
const LINE = "#D9D9D4";
const ACCENT = "#FF4D00";

const W = 1200;
const H = 630;

// The work cards here crop the cover to 3:2, so everything that has to stay
// readable lives between L and R (the 945px-wide centre of the 1200px card).
const L = 140;
const R = 1060;

const SANS = "'Noto Sans TC', 'Microsoft JhengHei', 'Segoe UI', Arial, sans-serif";
const MONO = "Consolas, 'JetBrains Mono', monospace";

// faint cross-grid (every 48px)
let grid = "";
for (let x = 48; x < W; x += 48) {
  grid += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${INK}" stroke-opacity="0.035" stroke-width="1"/>`;
}
for (let y = 48; y < H; y += 48) {
  grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${INK}" stroke-opacity="0.035" stroke-width="1"/>`;
}

// checklist marks: three rows, the first two checked
const rows = [
  { label: "飲水與糧食", done: true },
  { label: "證件與現金", done: true },
  { label: "照明與電源", done: false },
];
let checklist = "";
rows.forEach((row, i) => {
  const x = 716;
  const y = 232 + i * 86;
  checklist += `<rect x="${x}" y="${y}" width="46" height="46" rx="6" fill="none" stroke="${INK}" stroke-opacity="${row.done ? 1 : 0.35}" stroke-width="2"/>`;
  if (row.done) {
    checklist += `<path d="M ${x + 12} ${y + 24} l 9 10 l 15 -19" fill="none" stroke="${ACCENT}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  checklist += `<text x="${x + 68}" y="${y + 33}" font-family="${SANS}" font-weight="500" font-size="27" fill="${row.done ? INK2 : MUTE}">${row.label}</text>`;
});

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${grid}
  <rect x="32" y="32" width="${W - 64}" height="${H - 64}" fill="none" stroke="${INK}" stroke-width="1.5"/>

  <!-- stamp -->
  <g>
    <rect x="${L}" y="66" width="330" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <rect x="${L + 16}" y="80" width="12" height="12" fill="${ACCENT}"/>
    <text x="${L + 40}" y="93" font-family="${MONO}" font-size="17" letter-spacing="3" fill="${INK}">GO BAG · CHECKLIST</text>
  </g>

  <!-- headline -->
  <text x="${L}" y="282" font-family="${SANS}" font-weight="700" font-size="84" letter-spacing="-2" fill="${INK}">居家防災包</text>
  <text x="${L}" y="386" font-family="${SANS}" font-weight="700" font-size="84" letter-spacing="-2" fill="${INK}">一項一項<tspan fill="${ACCENT}">檢點</tspan></text>

  <!-- subtitle -->
  <text x="${L}" y="456" font-family="${SANS}" font-weight="400" font-size="28" fill="${INK2}">勾選檢點、背包負重、到期提醒，不用登入。</text>

  <!-- checklist detail -->
  ${checklist}

  <!-- footer rule + mono row -->
  <line x1="${L}" y1="540" x2="${R}" y2="540" stroke="${LINE}" stroke-width="1.5"/>
  <text x="${L}" y="572" font-family="${MONO}" font-size="20" letter-spacing="2" fill="${MUTE}">bob.finrod.xyz</text>
  <text x="${R}" y="572" text-anchor="end" font-family="${SANS}" font-weight="400" font-size="20" fill="${MUTE}">資料只存在這台裝置的瀏覽器</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true },
  background: PAPER,
});
const png = resvg.render().asPng();
writeFileSync(OUT, png);
console.log(`✓ wrote ${OUT} (${(png.length / 1024).toFixed(1)} KB)`);
