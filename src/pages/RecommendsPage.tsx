import { Alert } from "@/components/arc/alert/alert";
import { Badge } from "@/components/arc/badge/badge";
import { PageIntro } from "@/components/PageIntro";
import styles from "./RecommendsPage.module.css";

interface Slot {
  label: string;
  meta: string;
  blurb: string;
  src: string;
  width: number;
  height: number;
  /** Whether the pick is mine or the platform's, so the page never implies more than it should. */
  mine: boolean;
}

const slots: Slot[] = [
  {
    label: "我用過的好物",
    meta: "用超過一個月才會放上來",
    blurb: "自己買過、長期使用，真的覺得不錯才放上來。",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=525&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    mine: true,
  },
  {
    label: "依瀏覽推薦",
    meta: "平台自動產生",
    blurb: "Coupang 根據瀏覽紀錄推薦，不代表我個人背書。",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=524&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    mine: false,
  },
  {
    label: "平台上熱銷",
    meta: "近期的熱賣商品",
    blurb: "平台上大家最近都在買的東西。",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=526&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    mine: false,
  },
];

export function RecommendsPage() {
  return (
    <div className="page">
      <title>好物 · Finrod Chen</title>
      <meta
        name="description"
        content="Finrod Chen 用過覺得值得的生活好物，加上 Coupang 平台的熱門推薦。本頁含聯盟行銷連結。"
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
        {slots.map((slot) => (
          <article key={slot.label} className={styles.slot}>
            <div className={styles.slotHead}>
              <h3 className={styles.slotTitle}>{slot.label}</h3>
              <Badge tone={slot.mine ? "info" : "neutral"} size="sm">
                {slot.mine ? "我用過" : "平台推薦"}
              </Badge>
              <span className={styles.slotMeta}>{slot.meta}</span>
            </div>
            <p className={styles.slotBlurb}>{slot.blurb}</p>
            {/* The widget is a fixed 800px wide, so it scrolls inside its own
                box rather than pushing the page sideways on a phone. */}
            <div className={styles.frame}>
              <iframe
                src={slot.src}
                width={slot.width}
                height={slot.height}
                title={slot.label}
                loading="lazy"
                scrolling="no"
                referrerPolicy="unsafe-url"
              />
            </div>
          </article>
        ))}
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
