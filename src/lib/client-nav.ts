import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Stops the browser from also following in-app links inside `ref`'s element.
 *
 * Arc renders its header and footer destinations as plain anchors with an
 * onClick, and SiteNav / SiteFoot hand that click to the router. The anchor's
 * own navigation was never cancelled, so every click ran the router and then
 * reloaded the whole page. This cancels only the browser's half: the click
 * still reaches Arc's handler, so the router still navigates.
 *
 * Modified clicks (new tab, new window, download) and other origins are left
 * alone, so they behave as the browser intends.
 *
 * Inside `ref`, do not use a router <Link>: it skips navigating when the
 * click's default is already cancelled, which this does first. Use a plain
 * anchor whose onClick calls navigate() (see the footer lockup in SiteFoot).
 */
export function useClientNav(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      event.preventDefault();
    };
    node.addEventListener("click", onClick);
    return () => node.removeEventListener("click", onClick);
  }, [ref]);
}
