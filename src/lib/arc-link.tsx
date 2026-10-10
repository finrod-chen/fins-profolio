import { Link } from "react-router-dom";
import type { ArcLinkProps } from "@/components/arc/lib/arc-provider";

/** True for anything the router should not handle: other origins, mail, tel, downloads. */
function isExternal(href: string) {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
}

/**
 * The link every Arc component renders (via ArcProvider).
 *
 * Arc speaks `href`; react-router's Link speaks `to`. In-app paths go through
 * the router so navigation stays client side; absolute URLs, `mailto:` and
 * in-page hashes fall back to a plain anchor.
 */
export function ArcRouterLink({ href, children, ...rest }: ArcLinkProps) {
  if (isExternal(href) || href.startsWith("#")) {
    const external = isExternal(href) && !href.startsWith("mailto:") && !href.startsWith("tel:");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : null)}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
