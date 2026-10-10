import { useLocation, useNavigate } from "react-router-dom";
import { SiteHeader, type SiteHeaderDestination } from "@/components/arc/blocks/site-header/site-header";
import { BrandMark } from "@/components/BrandMark";

/** Top level destinations, in the order they read. `value` also drives `current`. */
const items = [
  { value: "work", label: "作品", href: "/" },
  { value: "blog", label: "文章", href: "/blog" },
  { value: "about", label: "關於", href: "/about" },
  { value: "recommends", label: "好物", href: "/recommends" },
];

/** Which top level item owns the current path. */
function currentItem(pathname: string) {
  if (pathname.startsWith("/blog")) return "blog";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/recommends")) return "recommends";
  return "work";
}

/**
 * The site header: Arc's `site-header` block wired to the router.
 *
 * The block renders plain anchors for its destinations, so navigation is
 * intercepted here and handed to the router instead of reloading the page.
 */
export function SiteNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onNavigate = (destination: SiteHeaderDestination) => {
    const href = destination.href;
    if (!href || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return;
    navigate(href);
  };

  return (
    <SiteHeader
      variant="simple"
      label="主導覽"
      brand={{ name: "Finrod Chen", href: "/", mark: <BrandMark /> }}
      items={items}
      current={currentItem(pathname)}
      onNavigate={onNavigate}
      secondaryAction={null}
      primaryAction={{ label: "來信聊聊", href: "mailto:me@finrod.xyz" }}
    />
  );
}
