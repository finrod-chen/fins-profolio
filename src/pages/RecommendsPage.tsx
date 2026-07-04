import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

/**
 * RecommendsPage — single-page magazine advertising spread.
 *
 * Three Coupang widgets are arranged down the page like ad slots.
 * Headers are editorial ("Editor's Pick", "Algorithm's Pick", "Trending")
 * with a standfirst and a closing colophon about the affiliate
 * relationship.
 */

type Slot = {
  index: string;
  label: string;
  meta: string;
  src: string;
  width: number;
  height: number;
  blurb: string;
};

const SLOTS: Slot[] = [
  {
    index: "Slot A",
    label: "Editor's pick",
    meta: "我用超過一個月",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=525&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "真的買過、用了超過一個月, 才放上來。",
  },
  {
    index: "Slot B",
    label: "Algorithm's pick",
    meta: "依瀏覽紀錄",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=524&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "Coupang 根據你的瀏覽自動推薦 — 不代表我個人背書。",
  },
  {
    index: "Slot C",
    label: "Trending",
    meta: "平台上熱銷",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=526&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "平台上大家最近都在買。",
  },
];

export function RecommendsPage() {
  useReveal();
  return (
    <article className="page-in">
      <title>Shop — Finrod Chen · 順手買好物</title>
      <meta
        name="description"
        content="Finrod 用過覺得值得的生活好物, 加上 Coupang 平台推薦。本頁含聯盟行銷連結。"
      />

      {/* ─── Cover ─── */}
      <section className="relative">
        <div
          aria-hidden
          className="absolute inset-0 drift"
          style={{
            background:
              "radial-gradient(70% 60% at 12% 100%, rgba(217,119,87,0.12) 0%, rgba(255,255,255,0) 65%)",
          }}
        />
        <div className="relative px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-16 sm:pb-24">
          <h1
            className="font-display text-[clamp(48px,9vw,128px)] font-medium leading-[0.96] tracking-[-0.025em] text-[var(--color-ink)] mask-up"
            style={{ "--mask-delay": "120ms" } as React.CSSProperties}
          >
            順手{" "}
            <em className="text-[var(--color-accent-deep-2)] font-normal">買</em>
            <br />
            <em className="font-normal">好物</em>。
          </h1>
          <p className="mt-7 max-w-2xl font-display italic text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-[var(--color-ink-2)]">
            我用 Coupang 買了幾年生活用品, 這裡收的是{" "}
            <strong className="not-italic font-medium text-[var(--color-ink)]">
              我實際用過覺得值得
            </strong>{" "}
            的東西 + 平台熱門。
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="tag is-accent">聯盟行銷 · 透明揭露</span>
            <span className="tag">TAIPEI.TW</span>
          </div>
        </div>
      </section>

      {/* ─── Ad slots ─── */}
      <section className="px-5 sm:px-8 lg:px-12 pb-20 sm:pb-28">
        <SectionLabel label="Ad Slots" meta="Single column · 800 × 120" />
        <div className="flex flex-col gap-16 sm:gap-24 items-center">
          {SLOTS.map((slot, i) => (
            <Slot key={slot.label} slot={slot} delayIndex={i + 1} />
          ))}
        </div>
      </section>

      {/* ─── Disclosure ─── */}
      <section
        className="border-t border-[var(--color-ink)]/15 bg-[var(--color-paper-2)]"
        data-reveal
      >
        <div className="px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <SectionLabel label="Disclosure · 透明聲明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            <div className="space-y-5 text-[16px] leading-[1.8] text-[var(--color-ink-2)] max-w-prose">
              <p>
                本頁所有 Coupang 商品連結均為{" "}
                <strong className="font-medium text-[var(--color-ink)]">
                  聯盟行銷連結
                </strong>
                。當你透過這些連結完成購買, 我會從中獲得一小筆推廣分潤 —{" "}
                <strong className="font-medium text-[var(--color-ink)]">
                  商品售價對你不會因此變貴
                </strong>
                。
              </p>
              <p>
                「Editor's Pick」是我實際購買、長期使用後, 真心覺得值得才會放上來的。
                其它兩組為平台自動推薦, 不代表我個人背書。
              </p>
            </div>
            <div className="space-y-4 text-[13px] leading-[1.75] text-[var(--color-mute)] border-t md:border-t-0 md:border-l border-[var(--color-ink)]/15 md:pl-8 pt-6 md:pt-0">
              <p>
                <strong className="text-[var(--color-ink-2)] font-medium">
                  Coupang 公告：
                </strong>{" "}
                廣告內容之限制、應揭露事項及其他詳細規範, 請參閱平台{" "}
                <a
                  href="https://partners.tw.coupang.com/#help/terms"
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[var(--color-ink-2)]"
                >
                  使用者條款
                </a>{" "}
                與{" "}
                <a
                  href="https://partners.tw.coupang.com/#help/operating-policy"
                  target="_blank"
                  rel="noreferrer"
                  className="link-line text-[var(--color-ink-2)]"
                >
                  營運政策
                </a>
                。
              </p>
              <p>※ 此頁為個人興趣性質的整理, 非商業廣告。</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

function Slot({ slot, delayIndex }: { slot: Slot; delayIndex: number }) {
  return (
    <div
      className="w-full flex flex-col items-center"
      data-reveal
      data-reveal-delay={String(delayIndex)}
    >
      <div className="w-full max-w-[800px] mb-5 sm:mb-6 grid grid-cols-[auto_1fr_auto] items-baseline gap-4">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[var(--color-accent-deep-2)] shrink-0">
          {slot.index}
        </span>
        <h2 className="font-display text-[clamp(24px,3vw,40px)] font-medium leading-[1.1] tracking-tight text-[var(--color-ink)]">
          {slot.label}
        </h2>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] shrink-0 text-right">
          {slot.meta}
        </span>
      </div>

      <p className="w-full max-w-[800px] mb-5 font-display italic text-[16px] text-[var(--color-ink-2)]">
        {slot.blurb}
      </p>

      <div
        className="border border-[var(--color-ink)]/15 bg-[var(--color-paper)] shrink-0"
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

      <p className="mt-4 md:hidden font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        ← 滑動查看完整 →
      </p>
    </div>
  );
}
