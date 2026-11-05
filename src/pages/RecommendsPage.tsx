import { Alert } from "@/components/arc/alert/alert";
import { Seo } from "@/components/Seo";
import { Badge } from "@/components/arc/badge/badge";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { PageIntro } from "@/components/PageIntro";
import { recommends, hasProducts } from "@/data/recommends";
import type { RecommendSlot } from "@/types";
import styles from "./RecommendsPage.module.css";

const priceFormat = new Intl.NumberFormat("zh-TW");

function Slot({ slot }: { slot: RecommendSlot }) {
  return (
    <article className={styles.slot}>
      <div className={styles.slotHead}>
        <h3 className={styles.slotTitle}>{slot.label}</h3>
        <Badge tone={slot.mine ? "info" : "neutral"} size="sm">
          {slot.mine ? "我用過" : "平台推薦"}
        </Badge>
        <span className={styles.slotMeta}>{slot.meta}</span>
      </div>
      <p className={styles.slotBlurb}>{slot.blurb}</p>

      <ul className={styles.grid}>
        {slot.products.map((product) => (
          <li key={product.id} className={styles.cell}>
            {/* Affiliate link: sponsored so search engines read it correctly,
                noopener because it opens in a new tab. */}
            <a
              className={styles.card}
              href={product.url}
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              <span className={styles.thumb}>
                <img
                  className={styles.thumbImage}
                  src={product.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className={styles.cardBody}>
                <span className={styles.cardTitle}>{product.title}</span>
                {(product.rocket || product.freeShipping) && (
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
                )}
                <span className={styles.price}>NT$ {priceFormat.format(product.price)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RecommendsPage() {
  const { slots, updatedAt } = recommends;
  const total = slots.reduce((sum, slot) => sum + slot.products.length, 0);

  return (
    <div className="page">
      <Seo
        title="好物 · Finrod Chen"
        description="Finrod Chen 用過覺得值得的生活好物，加上 Coupang 平台的熱門推薦。本頁含聯盟行銷連結。"
        path="/recommends"
      />

      <PageIntro
        title="好物"
        description="我在 Coupang 買了幾年生活用品，這裡收的是實際用過覺得值得的東西，加上平台的熱門推薦。"
        breadcrumbs={[{ label: "作品", href: "/" }, { label: "好物" }]}
        meta={[`${slots.length} 組清單`, "聯盟行銷"]}
      />

      <Alert tone="info" title="這頁含聯盟行銷連結">
        透過頁面上的連結購買，我會收到一小筆推廣分潤，商品售價不會因此變貴。標成「我用過」的是我自己買來長期使用的，
        其餘兩組由平台自動推薦，不代表我個人背書。
      </Alert>

      <section className={styles.list} aria-labelledby="recommends-heading">
        <h2 id="recommends-heading" className="sr-only">
          商品清單
        </h2>

        {hasProducts ? (
          <>
            {slots.map((slot) => (
              <Slot key={slot.slot} slot={slot} />
            ))}
            {updatedAt && (
              <p className={styles.updated}>
                清單更新於 {updatedAt.slice(0, 10)}，共 {total} 件商品。
              </p>
            )}
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
