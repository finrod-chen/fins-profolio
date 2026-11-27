import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SiteFooter, type SiteFooterLink } from "@/components/arc/blocks/site-footer/site-footer";
import { BrandMark } from "@/components/BrandMark";
import { useClientNav } from "@/lib/client-nav";
import styles from "./SiteFoot.module.css";

const socials = [
  { label: "GitHub", href: "https://github.com/finrod-chen", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/finrodchen", external: true },
];

const columns = [
  {
    title: "網站",
    links: [
      { label: "作品", href: "/" },
      { label: "文章", href: "/blog" },
      { label: "關於", href: "/about" },
      { label: "好物", href: "/recommends" },
    ],
  },
  {
    title: "其它",
    links: [
      { label: "GitHub", href: "https://github.com/finrod-chen", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/finrodchen", external: true },
      { label: "舊部落格", href: "https://astro.finrod.xyz", external: true },
      { label: "me@finrod.xyz", href: "mailto:me@finrod.xyz" },
    ],
  },
];

/**
 * The site footer: Arc's `site-footer` block. The site is dark only, so
 * there is no theme switch.
 */
export function SiteFoot() {
  const navigate = useNavigate();
  const foot = useRef<HTMLElement>(null);
  useClientNav(foot);

  const onNavigate = (link: SiteFooterLink) => {
    const href = link.href;
    if (!href || link.external || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return;
    navigate(href);
  };

  return (
    <footer ref={foot} className={styles.foot}>
      <SiteFooter
        variant="columns"
        brand={{
          name: "Finrod Chen",
          href: "/",
          // The lockup is the home link here. Arc puts its own text link for
          // the name beside the mark; theme.css hides that one so the name
          // is not printed twice. A plain anchor that navigates itself: a
          // router <Link> would skip navigating, because useClientNav has
          // already cancelled the click's default by the time it sees it.
          mark: (
            <a
              href="/"
              className={styles.brandLink}
              aria-label="Finrod Chen"
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                navigate("/");
              }}
            >
              <BrandMark />
            </a>
          ),
        }}
        tagline="白天在生醫產業做細胞治療，晚上寫 side project。這裡收網站、雲端、3D 列印、Arduino，以及一些工作上的紀錄。"
        columns={columns}
        newsletter={null}
        socials={socials}
        legal={[]}
        status={{ label: "接受新合作", tone: "success" }}
        onNavigate={onNavigate}
      />
    </footer>
  );
}
