import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./CtaLink.module.css";

/**
 * A call to action that looks like a button and is a link.
 *
 * In-app paths go through the router, so they never reload the page; hashes,
 * mail and other sites stay plain anchors. `primary` is the one filled action
 * on a surface; everything else is `secondary`.
 */
export function CtaLink({
  href,
  kind = "secondary",
  children,
}: {
  href: string;
  kind?: "primary" | "secondary";
  children: ReactNode;
}) {
  const className = `${styles.cta} ${styles[kind]}`;
  const external = /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  const newTab = external && !href.startsWith("mailto:") && !href.startsWith("tel:");
  return (
    <a className={className} href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : null)}>
      {children}
    </a>
  );
}
