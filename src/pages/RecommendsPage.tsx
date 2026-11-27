import { useRef } from "react";
import type { CSSProperties } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Alert } from "@/components/arc/alert/alert";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/arc/badge/badge";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { AnimatedCounter } from "@/components/arc/animated-counter/animated-counter";
import { PageIntro } from "@/components/PageIntro";
import { recommends, hasProducts } from "@/data/recommends";
import { useInView } from "@/lib/use-in-view";
import type { RecommendProduct, RecommendSlot } from "@/types";
import styles from "./RecommendsPage.module.css";

/**
 * When the feed was fetched, as "2026/11/23 08:00" in Taiwan time.
 *
 * Built by hand rather than with Intl.DateTimeFormat: Node and the browser
 * ship different ICU data and disagree on the space between date and time
 * (Node puts a thin space), which broke hydration. Taiwan keeps UTC+8 all
 * year, so adding eight hours and reading the UTC fields is exact.
 */
function taipeiStamp(iso: string) {
  const d = new Date(Date.parse(iso) + 8 * 60 * 60 * 1000);
  const two = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}/${two(d.getUTCMonth() + 1)}/${two(d.getUTCDate())} ${two(d.getUTCHours())}:${two(d.getUTCMinutes())}`;
}

function Tags({ product }: { product: RecommendProduct }) {
  if (!product.rocket && !product.freeShipping) return null;
  return (
    <span className={styles.tags}>
      {product.rocket && (
        <Badge tone="neutral" size="sm">
          火箭配送
        </Badge>
      )}
      {product.freeShipping && (
        <Badge tone="neutral" size="sm">
          免運
        </Badge>
      )}
    </span>
  );
}

/**
 * One product as an affiliate link. `sponsored` tells search engines what the
 * link is; `noopener` because it opens a new tab. The photo sits on a light
 * tile so white product shots do not glare on the black page, and a scan line
 * sweeps it on hover. The price rolls up like a till when it scrolls in.
 */
function ProductCard({ product, size }: { product: RecommendProduct; size: "large" | "small" }) {
  return (
    <a
      className={`${styles.card} ${size === "large" ? styles.large : styles.small}`}
      href={product.url}
      target="_blank"
      rel="sponsored nofollow noopener"
    >
      <span className={styles.thumb}>
        <img className={styles.thumbImage} src={product.image} alt="" loading="lazy" decoding="async" />
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>{product.title}</span>
        <Tags product={product} />
        <span className={styles.price}>
          <AnimatedCounter value={product.price} prefix="NT$ " animateOnView />
        </span>
      </span>
    </a>
  );
}

function SlotHead({ slot, index }: { slot: RecommendSlot; index: number }) {
  return (
    <div className={styles.slotHead}>
      <p className="label">{slot.mine ? "Picks" : index === 0 ? "Featured" : `Platform ${String(index).padStart(2, "0")}`}</p>
      <div className={styles.slotTitleRow}>
        <h2 className={index === 0 ? styles.slotTitleLarge : styles.slotTitle}>{slot.label}</h2>
        <Badge tone={slot.mine ? "info" : "neutral"} size="sm">
          {slot.mine ? "我用過" : "平台推薦"}
        </Badge>
        <span className={styles.slotMeta}>{slot.meta}</span>
      </div>
      <p className={styles.slotBlurb}>{slot.blurb}</p>
    </div>
  );
}

/** The featured list (the first one): large cards, three across, stamped in one by one. */
function FeaturedSlot({ slot }: { slot: RecommendSlot }) {
  const [gridRef, inView] = useInView<HTMLUListElement>();
  return (
    <section className={styles.slot} aria-label={slot.label}>
      <SlotHead slot={slot} index={0} />
      <ul ref={gridRef} className={styles.grid} data-inview={inView ? "" : undefined}>
        {slot.products.map((product, i) => (
          <li key={product.id} style={{ "--i": i } as CSSProperties}>
            <ProductCard product={product} size="large" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A platform list: a sideways rail of small cards, secondary to the featured one. */
function RailSlot({ slot, index }: { slot: RecommendSlot; index: number }) {
  const rail = useRef<HTMLUListElement>(null);
  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <section className={styles.slot} aria-label={slot.label}>
      <div className={styles.railHead}>
        <SlotHead slot={slot} index={index} />
        <div className={styles.railControls}>
          <button type="button" className={styles.arrow} onClick={() => nudge(-1)} aria-label={`${slot.label}：往左`}>
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button type="button" className={styles.arrow} onClick={() => nudge(1)} aria-label={`${slot.label}：往右`}>
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul ref={rail} className={styles.rail}>
        {slot.products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} size="small" />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function RecommendsPage() {
  const { slots, updatedAt } = recommends;
  const total = slots.reduce((sum, slot) => sum + slot.products.length, 0);

  return (
    <div className="page">
      <Seo
        title="好物 · Finrod Chen"
        description="從 Coupang 依關鍵字與每日特價自動帶出的生活用品清單，價格每天更新。本頁含聯盟行銷連結。"
        path="/recommends"
      />

      <PageIntro
        label="Picks"
        titleEffect="scan"
        title="好物"
        description="從 Coupang 依關鍵字與每日特價自動帶出的生活用品清單，價格每天早上更新。"
        breadcrumbs={[{ label: "作品", href: "/" }, { label: "好物" }]}
        meta={[`${slots.length} 組清單`, "聯盟行銷"]}
      />

      <Alert tone="info" title="這頁含聯盟行銷連結">
        透過頁面上的連結購買，我會收到一小筆推廣分潤，商品售價不會因此變貴。目前每一組都由平台依關鍵字或每日特價自動帶出，
        不代表我個人背書。
      </Alert>

      <section className={styles.list} aria-labelledby="recommends-heading">
        <h2 id="recommends-heading" className="sr-only">
          商品清單
        </h2>

        {hasProducts ? (
          <>
            {updatedAt && (
              <p className={`mono ${styles.stamp}`}>
                <span className={styles.stampDot} aria-hidden="true" />
                價格為 {taipeiStamp(updatedAt)} 的資料，每天早上 8:00 更新，實際價格以 Coupang 頁面為準
              </p>
            )}
            {/* The first list is featured as large cards; the rest are rails. Each
                list keeps its own badge, so a platform list never reads as mine. */}
            {slots
              .filter((slot) => slot.products.length > 0)
              .map((slot, i) =>
                i === 0 ? (
                  <FeaturedSlot key={slot.slot} slot={slot} />
                ) : (
                  <RailSlot key={slot.slot} slot={slot} index={i} />
                ),
              )}
            <p className={styles.updated}>共 {total} 件商品。</p>
          </>
        ) : (
          <EmptyState
            title="清單正在重建"
            description="原本這裡嵌的是 Coupang 的廣告 widget，已經整個移除。新的清單改由我自己抓 Coupang 的商品資料再渲染，排程跑完就會出現。"
            label="目前沒有商品"
          />
        )}
      </section>

      <section className={styles.terms} aria-labelledby="recommends-terms">
        <h2 id="recommends-terms" className={styles.termsHeading}>
          揭露與條款
        </h2>
        <div className="prose">
          <p>
            本頁所有 Coupang 商品連結均為聯盟行銷連結。當你透過這些連結完成購買，我會從中獲得一小筆推廣分潤，
            <strong>商品售價對你不會因此變貴</strong>。
          </p>
          <p>
            商品資料由 Coupang Partners Open API 取得，在建置時寫入本站，頁面上不會載入任何第三方腳本或嵌入內容。
          </p>
          <p>
            依 Coupang 公告，廣告內容之限制、應揭露事項及其他詳細規範，請參閱平台的{" "}
            <a href="https://partners.tw.coupang.com/#help/terms" target="_blank" rel="noreferrer">
              使用者條款
            </a>{" "}
            與{" "}
            <a
              href="https://partners.tw.coupang.com/#help/operating-policy"
              target="_blank"
              rel="noreferrer"
            >
              營運政策
            </a>
            。此頁為個人興趣性質的整理，非商業廣告。
          </p>
        </div>
      </section>
    </div>
  );
}
