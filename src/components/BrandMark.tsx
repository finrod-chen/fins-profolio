import symbolSvg from "../../finrod-logo-pack/finrod-symbol.svg?raw";
import wordmarkSvg from "../../finrod-logo-pack/finrod-wordmark.svg?raw";
import styles from "./BrandMark.module.css";

/** Pulls the viewBox and path data out of a logo-pack SVG, so the pack stays the one source. */
function parse(svg: string) {
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1] ?? "0 0 1 1";
  const paths = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  return { viewBox, paths };
}

const symbol = parse(symbolSvg);
const wordmark = parse(wordmarkSvg);

/**
 * The brand lockup for the header and footer: the arc symbol, then the
 * "Finrod" wordmark, both in the current text color. It is decorative here:
 * the link around it already carries the name as text (visually hidden in
 * src/styles/theme.css), which is what screen readers announce.
 *
 * `symbolOnly` drops the wordmark, for places that already print the name
 * beside it (the footer). `data-brand-mark` is what the Long Cat egg counts
 * clicks on (CatWalker).
 */
export function BrandMark({ symbolOnly = false }: { symbolOnly?: boolean }) {
  return (
    <span className={styles.lockup} aria-hidden="true">
      <svg className={styles.symbol} viewBox={symbol.viewBox} fill="currentColor" data-brand-mark="" focusable="false">
        {symbol.paths.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </svg>
      {!symbolOnly && (
      <svg className={styles.wordmark} viewBox={wordmark.viewBox} fill="currentColor" focusable="false">
        {wordmark.paths.map((d, i) => (
          <path key={i} d={d} fillRule="evenodd" />
        ))}
      </svg>
      )}
    </span>
  );
}
