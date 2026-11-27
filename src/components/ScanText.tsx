import styles from "./ScanText.module.css";

/**
 * Text read out by a scanner: an accent line sweeps down over it and the
 * text appears behind the line. The 好物 page uses it, in keeping with its
 * till-and-barcode motion. Pure CSS, played once on load; under reduced
 * motion the text is simply there.
 */
export function ScanText({ text }: { text: string }) {
  return (
    <span className={styles.scan}>
      <span className={styles.text}>{text}</span>
      <span className={styles.line} aria-hidden="true" />
    </span>
  );
}
