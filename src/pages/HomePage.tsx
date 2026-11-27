import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { Seo } from "@/components/Seo";
import { SITE_URL } from "@/lib/site";
import { posts } from "@/data/blog";
import { CtaLink } from "@/components/CtaLink";
import { ProcessSteps } from "@/components/ProcessSteps";
import { WorkDeck } from "@/components/WorkDeck";
import { Reveal } from "@/components/Reveal";
import { ScrambleText } from "@/components/ScrambleText";
import { StackTicker } from "@/components/StackTicker";
import { AnimatedCounter } from "@/components/arc/animated-counter/animated-counter";
import { WorkCover } from "@/components/WorkCover";
import styles from "./HomePage.module.css";

/** The first project worth showing, used as the hero's one image. */
const featured = projects.find((p) => p.featured) ?? projects[0];

const stats = [
  { label: "In biotech", value: 14, unit: "年", note: "從製程工程師到研發主任" },
  { label: "Side projects", value: projects.length, unit: "個", note: "網站、雲端、3D 列印、Arduino" },
  { label: "3D printers", value: 3, unit: "台", note: "Bambu、Ender，以及一台自己改的" },
  { label: "Posts", value: posts.length, unit: "篇", note: "從 2013 累積到現在" },
];

export function HomePage() {
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <>
      <Seo
        title="Finrod Chen · 個人作品集"
        description="Finrod Chen 的個人作品集。白天在生醫產業做細胞治療，晚上寫 side project：網站、雲端、3D 列印、Arduino。"
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Finrod Chen",
          url: `${SITE_URL}/`,
          sameAs: [
            "https://x.com/finrodchen",
            "https://github.com/finrod-chen",
            "https://linkedin.com/in/finrodchen",
          ],
        }}
      />

      <section className={`page ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="label">Finrod Chen · Portfolio</p>
          <h1 className={styles.heroTitle}>
            <ScrambleText lines={["白天做細胞治療，", "晚上寫 side project。"]} />
          </h1>
          <p className={styles.heroLede}>
            我是 Finrod Chen，在生醫產業做細胞治療的研發主任。工作之餘寫網站、玩雲端、3D 列印和
            Arduino，這裡收的是那些做到一個說得上來的階段的東西。
          </p>
          <div className={styles.actions}>
            <CtaLink href="#works" kind="primary">
              看作品
            </CtaLink>
            <CtaLink href="mailto:me@finrod.xyz">來信聊聊</CtaLink>
          </div>
          <p className={`mono ${styles.heroMeta}`}>
            {projects.length} 個作品 / {liveCount} 個上線中 / 台灣
          </p>
        </div>

        {/* A framed panel, like a device: the featured work on its screen. */}
        <figure className={styles.device}>
          <div className={styles.deviceBar}>
            <span>Now showing</span>
            <span className={styles.status}>
              <span className={styles.led} aria-hidden="true" />
              Live
            </span>
          </div>
          <Link to={`/work/${featured.id}`} className={styles.screen}>
            <WorkCover project={featured} priority />
          </Link>
          <figcaption className={styles.deviceFoot}>
            <span className="mono">01</span>
            <Link to={`/work/${featured.id}`} className={styles.deviceLink}>
              {featured.title}
            </Link>
            <span className={styles.deviceTag}>{featured.tagline}</span>
          </figcaption>
        </figure>
      </section>

      <section className="page" aria-labelledby="numbers-heading">
        <h2 id="numbers-heading" className="sr-only">
          數字
        </h2>
        <Reveal>
          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={`mono ${styles.statLabel}`}>{stat.label}</dt>
                <dd className={styles.statValue}>
                  <AnimatedCounter value={stat.value} animateOnView />
                  <span className={styles.statUnit}>{stat.unit}</span>
                </dd>
                <dd className={styles.statNote}>{stat.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Reveal className={styles.ticker}>
        <StackTicker />
      </Reveal>

      <div className="page band" id="works">
        <Reveal>
          <WorkDeck projects={projects} />
        </Reveal>
      </div>

      <div className="page band">
        <Reveal>
          <ProcessSteps />
        </Reveal>
      </div>

      <section className={`page band ${styles.contact}`} aria-labelledby="contact-heading">
        <p className="label">Contact</p>
        <h2 id="contact-heading" className={styles.contactTitle}>
          <ScrambleText lines={["想聊些什麼？"]} onView />
        </h2>
        <p className={styles.contactLede}>
          技術的、做東西的、細胞治療的，或純粹好奇的，寫信給我就好。通常 1 到 2 個工作天內回信。
        </p>
        <div className={styles.actions}>
          <CtaLink href="mailto:me@finrod.xyz" kind="primary">
            寄信到 me@finrod.xyz
          </CtaLink>
          <CtaLink href="/blog">先看看文章</CtaLink>
        </div>
      </section>
    </>
  );
}
