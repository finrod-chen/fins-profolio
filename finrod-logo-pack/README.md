# Finrod logo pack

The personal brand: a wordmark ("Finrod") and a symbol (a quarter arc).

## Files

| File | What it is |
| --- | --- |
| `finrod-wordmark.png` | Original wordmark artwork, 2048 × 543, black on transparent |
| `finrod-symbol.png` | Original symbol artwork, 2048 × 1852, black on transparent |
| `finrod-wordmark.svg` | Wordmark traced to vector from the PNG |
| `finrod-symbol.svg` | Symbol traced to vector from the PNG |

The SVGs were traced with potrace. Rendered back at full size they differ
from the PNGs by 0.36 % (wordmark) and 0.04 % (symbol) of the inked pixels,
all on anti-aliased edges.

The SVGs fill with `currentColor`, so they take the color of the text around
them: white on the dark site, black on paper.

## Where the site uses them

- `src/components/BrandMark.tsx` reads both SVGs (Vite `?raw` import) for the
  header and footer lockup: symbol, then wordmark.
- `public/logos/favicon.svg`: the symbol in the accent orange on a black tile.
- `scripts/generate-og.mjs` reads both SVGs for `public/og-image.png`.

Replace a file here and rebuild to change the logo everywhere. Re-run
`node scripts/generate-og.mjs` for the share image and update the favicon by
hand.
