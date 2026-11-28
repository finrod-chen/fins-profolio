import type { CSSProperties } from "react";
import { socials } from "@/data/socials";
import { useInView } from "@/lib/use-in-view";
import styles from "./SocialLinks.module.css";

/**
 * Profiles elsewhere as a row of logo links, shared by the About page and
 * the footer. Each logo is a 48px target named for assistive tech; on hover
 * it lifts and takes its brand color. The row pops in, one logo after
 * another, the first time it scrolls into view.
 */
export function SocialLinks({ label = "其它連結", size = "md" }: { label?: string; size?: "md" | "sm" }) {
  // No bottom margin: in the footer the row sits at the very end of the page,
  // inside the last tenth of the window, where a shrunk root would never see it.
  const [ref, inView] = useInView<HTMLUListElement>("0px");
  return (
    <ul
      ref={ref}
      className={`${styles.socials} ${size === "sm" ? styles.sm : ""}`}
      aria-label={label}
      data-inview={inView ? "" : undefined}
    >
      {socials.map((social, index) => (
        <li key={social.id} style={{ "--i": index, "--brand": social.hover } as CSSProperties}>
          <a
            className={styles.social}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false">
              <path d={social.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
