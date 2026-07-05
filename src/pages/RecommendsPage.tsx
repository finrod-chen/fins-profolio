import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

type Slot = {
  label: string;
  meta: string;
  src: string;
  width: number;
  height: number;
  blurb: string;
};

const SLOTS: Slot[] = [
  {
    label: "我用過的好物",
    meta: "用超過一個月才放上來",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=525&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "自己買過、長期使用, 真的覺得不錯才放上來。",
  },
  {
    label: "依瀏覽推薦",
    meta: "平台自動產生",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=524&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "Coupang 根據瀏覽紀錄推薦 — 不代表我個人背書。",
  },
  {
    label: "平台上熱銷",
    meta: "近期的熱賣商品",
    src: "https://ads-partners.tw.coupang.com/widgets.html?id=526&template=carousel&trackingCode=AF5690718&subId=&width=800&height=120&tsource=",
    width: 800,
    height: 120,
    blurb: "平台上大家最近都在買的東西。",
  },
];

export function RecommendsPage() {
  useReveal();
  return (
    <article className="page-in">
      <title>好物 — Finrod Chen</title>
      <meta
        name="description"
        content="Finrod Chen 用過覺得值得的生活好物, 加上 Coupang 平台的熱門推薦。本頁含聯盟行銷連結。"
      />

      <header
        className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-10"
        data-reveal
      >
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.25] tracking-tight text-[var(--color-ink)]">
          好物
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] sm:text-[17px] leading-[1.8] text-[var(--color-ink-2)]">
          我用 Coupang 買了幾年生活用品, 這裡收的是{" "}
          <strong className="font-semibold text-[var(--color-ink)]">
            我實際用過覺得值得
          </strong>{" "}
          的東西 + 平台熱門。如果你透過連結購買, 我會收到一小筆推廣分潤 —
          商品價格對你不會變貴。
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="tag is-accent">聯盟行銷 · 透明揭露</span>
          <span className="tag">台北 / 台灣</span>
        </div>
      </header>

      <section className="px-5 sm:px-8 lg:px-12 pb-14">
        <SectionLabel
          title="商品列表"
          meta={`${SLOTS.length} 組 · 800 × 120`}
        />
        <div className="space-y-10 sm:space-y-14">
          {SLOTS.map((slot, i) => (
            <Slot key={slot.label} slot={slot} delayIndex={i + 1} />
          ))}
        </div>
      </section>

      <section
        className="border-t border-[var(--color-line)] bg-[var(--color-paper-2)]"
        data-reveal
      >
        <div className="px-5 sm:px-8 lg:px-12 py-12 sm:py-14">
          <SectionLabel title="透明聲明" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-[15px] leading-[1.8] text-[var(--color-ink-2)] max-w-prose">
              <p>
                本頁所有 Coupang 商品連結均為聯盟行銷連結。
                當你透過這些連結完成購買, 我會從中獲得一小筆推廣分潤 —
                <strong className="font-semibold text-[var(--color-ink)]">
                  商品售價對你不會因此變貴
                </strong>
                。
              </p>
              <p>
                「我用過的好物」是我實際購買、長期使用後真心覺得值得才會放上來的。
                其它兩組為平台自動推薦, 不代表我個人背書。
              </p>
            </div>
            <div className="space-y-3 text-[13px] leading-[1.75] text-[var(--color-mute)] border-t md:border-t-0 md:border-l border-[var(--color-line)] md:pl-8 pt-4 md:pt-0">
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
      className="w-full flex flex-col items-start"
      data-reveal
      data-reveal-delay={String(delayIndex)}
    >
      <div className="w-full mb-3 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-[20px] sm:text-[22px] font-semibold leading-tight text-[var(--color-ink)]">
          {slot.label}
        </h2>
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-mute)]">
          {slot.meta}
        </span>
      </div>

      <p className="mb-4 text-[14px] text-[var(--color-ink-2)] max-w-prose">
        {slot.blurb}
      </p>

      <div
        className="border border-[var(--color-line)] bg-[var(--color-paper)] overflow-x-auto max-w-full"
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

      <p className="mt-2 md:hidden font-mono text-[10px] text-[var(--color-mute)]">
        ← 滑動查看完整 →
      </p>
    </div>
  );
}
