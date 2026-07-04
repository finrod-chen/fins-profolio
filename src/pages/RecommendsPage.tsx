import { SectionLabel } from "@/components/SectionLabel";

/**
 * RecommendsPage — Coupang 推廣商品頁
 *
 * 3 個水平長條 widget (800×120) 垂直堆疊, 置中對齊:
 *   ① Finrod 的推薦商品  (自己挑的)
 *   ② 我猜你也喜歡       (Coupang 演算法)
 *   ③ 酷彭熱門商品       (平台熱銷)
 *
 * 註: iframe src 從 @/data/recommends 讀, 之後換連結只改那一個檔。
 */

type RecommendSlot = {
  index: string;
  label: string;
  meta: string;
  /** Coupang 提供的 iframe src (含 trackingCode) */
  src: string;
  width: number;
  height: number;
  /** 給 hero 用的副標題 */
  blurb: string;
};

const SLOTS: RecommendSlot[] = [
  {
    index: "01",
    label: "Finrod 推薦",
    meta: "我自己用過",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=525&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "真的買過、用了超過一個月, 才放上來。",
  },
  {
    index: "02",
    label: "我猜你也喜歡",
    meta: "依瀏覽紀錄推薦",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=524&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "Coupang 根據你的瀏覽自動推薦。",
  },
  {
    index: "03",
    label: "酷彭熱門商品",
    meta: "平台熱銷排行",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=526&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "平台上大家最近都在買。",
  },
];

export function RecommendsPage() {
  return (
    <div className="page-in">
      <title>Shop — Finrod Chen · 順手買好物</title>
      <meta name="description" content="Finrod 用過覺得值得的生活好物, 加上 Coupang 平台推薦。本頁含聯盟行銷連結。" />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative">
        <div className="absolute inset-0 cross-grid pointer-events-none" aria-hidden />
        <div className="relative px-5 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="stamp">SHOP · 2026</span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
              v1.0
            </span>
          </div>

          <h1 className="text-[clamp(40px,9vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em]">
            <span>順手</span>
            <br />
            <span className="inline-flex items-baseline gap-3">
              <span>買</span>
              <span className="relative">
                <span className="absolute -inset-1 bg-[var(--color-accent)] -z-10" aria-hidden />
                <span className="relative">好物</span>
              </span>
              <span>。</span>
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 max-w-2xl text-[16px] sm:text-[18px] leading-[1.6] text-[var(--color-ink-2)]">
            我用 Coupang 買了幾年生活用品,
            這裡收的是{" "}
            <strong className="text-[var(--color-ink)] font-semibold">
              我實際用過覺得值得
            </strong>{" "}
            的東西 + 平台熱門。如果你透過連結購買,
            我會收到一小筆推廣分潤 — 商品價格對你不會變貴。感謝支持 🙌
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="tag is-accent">聯盟行銷 · 透明揭露</span>
            <span className="tag">TAIPEI.TW</span>
          </div>
        </div>
      </section>

      {/* ── 3 個推薦區塊 ────────────────────────────────────────── */}
      <section className="px-5 sm:px-6 lg:px-10 pb-14 sm:pb-20">
        <div className="flex flex-col gap-14 sm:gap-20 items-center">
          {SLOTS.map((slot) => (
            <Slot key={slot.index} slot={slot} />
          ))}
        </div>
      </section>

      {/* ── DISCLOSURE ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper-2)]">
        <div className="px-5 sm:px-6 lg:px-10 py-10 sm:py-14">
          <SectionLabel index="99" label="Disclosure" meta="透明聲明" />
          <h2 className="mt-3 text-[clamp(22px,3vw,28px)] font-semibold leading-[1.2] tracking-tight">
            關於這頁的推薦連結
          </h2>
          <div className="mt-5 space-y-4 text-[14px] sm:text-[15px] leading-[1.8] text-[var(--color-ink-2)]">
            <p>
              本頁所有 Coupang 商品連結均為{" "}
              <strong className="text-[var(--color-ink)] font-semibold">聯盟行銷連結</strong>。
              當你透過這些連結完成購買, 我會從中獲得一小筆推廣分潤 —{" "}
              <strong className="text-[var(--color-ink)] font-semibold">
                商品售價對你不會因此變貴
              </strong>。
            </p>
            <p>
              「Finrod 的推薦商品」是我實際購買、長期使用後,
              真心覺得值得才會放上來的。「我猜你也喜歡」與「酷彭熱門商品」
              為平台自動推薦, 不代表我個人背書。
            </p>

            <p className="pt-4 border-t border-[var(--color-line)] text-[13px] sm:text-[14px] leading-[1.8] text-[var(--color-mute)]">
              <strong className="text-[var(--color-ink-2)] font-semibold">酷澎說明：</strong>
              廣告內容之限制、應揭露事項及其他詳細規範, 請參閱平台
              {" "}
              <a
                href="https://partners.tw.coupang.com/#help/terms"
                target="_blank"
                rel="noreferrer"
                className="link-line text-[var(--color-ink-2)]"
              >
                使用者條款
              </a>
              {" "}與{" "}
              <a
                href="https://partners.tw.coupang.com/#help/operating-policy"
                target="_blank"
                rel="noreferrer"
                className="link-line text-[var(--color-ink-2)]"
              >
                營運政策
              </a>
              ，遵守規範可降低法律風險並提升信任。
            </p>

            <p className="text-[13px] text-[var(--color-mute)]">
              ※ 此頁為個人興趣性質的整理, 非商業廣告。
              如有任何商品問題, 請直接洽詢 Coupang 客服。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Slot — 單一推薦區塊
   800×120 iframe 置中, 上下有標題 + 副標
   ──────────────────────────────────────────────────────────── */
function Slot({ slot }: { slot: RecommendSlot }) {
  return (
    <div className="w-full flex flex-col items-center">
      {/* 標題列 */}
      <div className="w-full max-w-[800px] mb-4 sm:mb-5 flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] shrink-0">
            {slot.index}
          </span>
          <h2 className="text-[clamp(20px,2.4vw,26px)] font-semibold tracking-tight leading-none truncate">
            {slot.label}
          </h2>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] shrink-0 text-right">
          {slot.meta}
        </span>
      </div>

      {/* 副標 */}
      <p className="w-full max-w-[800px] mb-4 text-[13px] sm:text-[14px] text-[var(--color-mute)]">
        {slot.blurb}
      </p>

      {/* iframe 容器: 固定尺寸, 置中 (max-w 讓實際寬度 < 800 的 widget 也置中美觀) */}
      <div
        className="border border-[var(--color-line)] bg-[var(--color-paper)] shrink-0"
        style={{ width: slot.width, height: slot.height }}
      >
        <iframe
          src={slot.src}
          width={slot.width}
          height={slot.height}
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          referrerPolicy="unsafe-url"
          title={slot.label}
          className="block"
        />
      </div>

      {/* 手機小於 iframe 寬度時: 允許橫向滑動, 避免內容被擠壓 */}
      <p className="mt-3 md:hidden font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-mute)]">
        ← 滑動查看完整 →
      </p>
    </div>
  );
}