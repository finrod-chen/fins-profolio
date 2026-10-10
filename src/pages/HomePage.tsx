import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import { HeroContent } from "@/components/arc/blocks/hero-section/hero-content";
import { MetricCard } from "@/components/arc/metric-card/metric-card";
import { CtaSection } from "@/components/arc/blocks/cta-section/cta-section";
import { WorkList } from "@/components/WorkList";
import { WorkCover } from "@/components/WorkCover";
import styles from "./HomePage.module.css";

/** The first project worth showing, used as the hero's one image. */
const featured = projects.find((p) => p.featured) ?? projects[0];

export function HomePage() {
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <>
      {/* The hero carries the page's only entrance animation. */}
      <HeroContent
        layout="split"
        title="白天做細胞治療，晚上寫 side project。"
        description="我是 Finrod Chen，在生醫產業做細胞治療的研發主任。工作之餘寫網站、玩雲端、3D 列印和 Arduino，這裡收的是那些做到一個說得上來的階段的東西。"
        primaryAction={{ label: "看作品", href: "#works" }}
        secondaryAction={{ label: "來信聊聊", href: "mailto:me@finrod.xyz" }}
        meta={[`${projects.length} 個作品`, `${liveCount} 個上線中`, "台灣"]}
        media={
          <span className={styles.heroMedia}>
            <WorkCover project={featured} priority />
          </span>
        }
      />

      <section className="page" aria-labelledby="numbers-heading">
        <h2 id="numbers-heading" className="sr-only">
          數字
        </h2>
        <div className={styles.metrics}>
          <MetricCard label="在生技產業" value={14} suffix=" 年" context="從製程工程師到研發主任" />
          <MetricCard
            label="side project"
            value={projects.length}
            suffix=" 個"
            context="網站、雲端、3D 列印、Arduino"
          />
          <MetricCard label="3D 印表機" value={3} suffix=" 台" context="Bambu、Ender，以及一台自己改的" />
          <MetricCard label="文章" value={posts.length} suffix=" 篇" context="從 2013 累積到現在" />
        </div>
      </section>

      <hr className="rule" />

      <div className="page band" id="works">
        <WorkList projects={projects} />
      </div>

      <hr className="rule" />

      <div className="page band">
        <CtaSection
          variant="centered"
          title="想聊些什麼？"
          description="技術的、做東西的、細胞治療的，或純粹好奇的，寫信給我就好。"
          primaryAction={{ label: "寄信到 me@finrod.xyz", href: "mailto:me@finrod.xyz" }}
          secondaryAction={{ label: "先看看文章", href: "/blog" }}
          note="通常 1 到 2 個工作天內回信，國定假日除外。"
          faces={[]}
        />
      </div>
    </>
  );
}
