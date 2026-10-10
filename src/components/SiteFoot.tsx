import { useNavigate } from "react-router-dom";
import { SiteFooter, type SiteFooterLink } from "@/components/arc/blocks/site-footer/site-footer";
import { ThemeSwitch } from "@/components/arc/theme-switch/theme-switch";
import { BrandMark } from "@/components/BrandMark";
import { useTheme } from "@/lib/theme";
import styles from "./SiteFoot.module.css";

const socials = [
  { label: "GitHub", href: "https://github.com/finrodchen", external: true },
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
      { label: "GitHub", href: "https://github.com/finrodchen", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/finrodchen", external: true },
      { label: "舊部落格", href: "https://astro.finrod.xyz", external: true },
      { label: "me@finrod.xyz", href: "mailto:me@finrod.xyz" },
    ],
  },
];

/**
 * The site footer: Arc's `site-footer` block, with the theme switch in a
 * row under it. The block has no slot of its own, so the switch is
 * composed beside it rather than forked into its source.
 */
export function SiteFoot() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const onNavigate = (link: SiteFooterLink) => {
    const href = link.href;
    if (!href || link.external || /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return;
    navigate(href);
  };

  return (
    <footer className={styles.foot}>
      <SiteFooter
        variant="columns"
        brand={{ name: "Finrod Chen", href: "/", mark: <BrandMark /> }}
        tagline="白天在生醫產業做細胞治療，晚上寫 side project。這裡收網站、雲端、3D 列印、Arduino，以及一些工作上的紀錄。"
        columns={columns}
        newsletter={null}
        socials={socials}
        legal={[]}
        status={{ label: "接受新合作", tone: "success" }}
        onNavigate={onNavigate}
      />
      <div className={styles.themeRow}>
        <ThemeSwitch
          theme={theme}
          variant="reveal"
          label="深色模式"
          onThemeChange={(next) => setTheme(next)}
        />
      </div>
    </footer>
  );
}
