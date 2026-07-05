import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

/**
 * HomePage — v4 active
 * 大膽的 H1 雙層 (主視覺)，多色 sticker 堆疊，計數區塊，
 * marquee 三色跑馬燈兩條，彩色貼紙刀切 closing。
 */
export function HomePage() {
  useReveal();
  const live = projects.filter((p) => p.status === "live").length;
  const total = projects.length;

  const marqueeItems = [
    "獨立網站作品",
    "設計 × 工程",
    `${total} 個作品 · ${live} 個上線`,
    "台北 / 永和",
    "歡迎合作",
    "⚡ Now working",
  ];

  return (
    <div className="page-in">
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-16">
        {/* Status bar — pill 與 sticker */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8" data-reveal>
          <span className="chip is-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pulse-soft inline-block" />
            接受新合作
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--color-mute)]">
            Finrod Chen · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* H1 主視覺 */}
          <div className="lg:col-span-8">
            <h1
              className="font-serif font-semibold leading-[0.95] tracking-tight text-[var(--color-ink)]"
              style={{ fontSize: "clamp(48px, 9vw, 112px)" }}
              data-reveal
            >
              白天<br />
              做細胞<span className="text-[var(--color-coral)]">治療</span><span className="text-[var(--color-accent)]">，</span>
              <br />
              晚上<br />
              寫 side <span className="text-[var(--color-accent)] underline decoration-[var(--color-amber)] decoration-[6px] underline-offset-4">project</span><span className="text-[var(--color-coral)]">。</span>
            </h1>
          </div>

          {/* 右上角 sticker 拼貼 */}
          <div className="lg:col-span-4 relative" data-reveal>
            <div className="flex flex-wrap gap-2 items-start">
              <span className="sticker is-coral">v4 · active</span>
              <span className="sticker is-blue" style={{ transform: "rotate(1.5deg)" }}>2026</span>
              <span className="sticker is-amber" style={{ transform: "rotate(-1deg)" }}>Live ✦</span>
            </div>
            <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.85] text-[var(--color-ink-2)] max-w-md">
              這裡收的是平常工作之餘做出來的網站作品 — 寫前端、
              玩雲端、3D 列印、Arduino。每個都做到一個可以說得上來的階段。
              重視排版、效能、閱讀體驗, 因為這些都是寫給未來的自己看的。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/#works" className="btn btn-primary">
                <span>看作品</span>
                <span aria-hidden>↓</span>
              </Link>
              <a href="mailto:me@finrod.xyz" className="btn btn-ghost">
                <span>來信聊聊</span>
                <span className="hover-arrow" aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Marquee 1 (ink 三色) ──────────────────────────────────────── */}
      <Marquee items={marqueeItems} speed={48} variant="ink" />

      {/* ─── About strip + 計數 ───────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-12 py-14 sm:py-20" data-reveal>
        <SectionLabel title="關於" meta={`${total} 個作品 · ${live} 個上線`} tone="coral" icon="◣" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          <div className="md:col-span-7 space-y-5 text-[15px] sm:text-[16px] leading-[1.85] text-[var(--color-ink-2)] max-w-prose">
            <p>
              研究所唸生物工程, 進到細胞治療產業後從製程工程師做到研發主任。
              白天大部分時間都在跟 SOP、放行報告、品質系統打交道 —
              每個計畫都是「為了救一個病人」, 沒有犯錯的空間。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事 — 沒人審查、
              可以失敗、可以亂改。這裡放的每一個小玩意,
              都是某個晚上「如果這樣做會怎樣」的具現化。
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="chip is-blue">生物工程</span>
              <span className="chip is-coral">細胞治療</span>
              <span className="chip is-amber">品管 / 法規</span>
              <span className="chip is-out">side project</span>
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="border border-[var(--color-ink)] p-6 bg-[var(--color-paper)] relative">
              <span className="sticker is-amber absolute -top-3 -left-3 rotate-[-3deg]">info</span>
              <div className="eyebrow mb-4">基本資料</div>
              <dl className="space-y-3 text-[14px]">
                <Row k="工作" v="研發主任 · 細胞治療" />
                <Row k="業餘" v="網站 · 雲端 · 3D 列印 · Arduino" />
                <Row k="地點" v="永和 · 新北市, TW" />
                <Row k="時段" v="週末 / 業餘" />
              </dl>
            </div>
          </aside>
        </div>

        {/* 計數區塊 — 大數字 + 多色左條 */}
        <dl className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 border-t border-[var(--color-line)] pt-10">
          <Stat n="12+" label="年 生技經驗" rail="var(--color-accent)" />
          <Stat n={total} label="個 side project" rail="var(--color-coral)" />
          <Stat n="3" label="台 3D 印表機" rail="var(--color-amber)" />
          <Stat n="1" label="個部落格" rail="var(--color-accent-soft)" />
        </dl>
      </section>

      {/* ─── Works grid ──────────────────────────────────────────────── */}
      <div data-reveal>
        <ProjectGrid projects={projects} />
      </div>

      {/* ─── Marquee 2 (coral 反向) ───────────────────────────────────── */}
      <Marquee items={["Side project", "個人網站", "Try everything twice", "Ship it", "Keep it small"]} speed={36} variant="coral" reverse />

      {/* ─── Closing ────────────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-line)] px-5 sm:px-8 lg:px-12 py-16 sm:py-24"
        data-reveal
      >
        <SectionLabel title="聯絡" tone="amber" icon="◇" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <p className="font-serif text-[clamp(28px,3.2vw,48px)] leading-[1.25] tracking-tight text-[var(--color-ink)]">
              想聊些什麼 — 技術、做東西的、
              細胞治療的、<br className="hidden sm:block" />
              或純粹好奇的 — 就寫信給我。
            </p>
            <a
              href="mailto:me@finrod.xyz"
              className="mt-6 inline-block font-serif font-semibold leading-tight text-[var(--color-accent)] text-[clamp(28px,3.2vw,48px)] link-line"
            >
              me@finrod.xyz →
            </a>
            <p className="mt-4 text-[13px] text-[var(--color-mute)]">
              通常 1 — 2 個工作天內回信 · 國定假日除外
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-wrap gap-2 justify-start lg:justify-end">
            <span className="sticker is-coral">來信</span>
            <span className="sticker is-blue" style={{ transform: "rotate(2deg)" }}>合作</span>
            <span className="sticker is-amber" style={{ transform: "rotate(-1deg)" }}>聊聊天</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[70px_1fr] items-baseline gap-3">
      <dt className="font-mono text-[11px] tracking-[0.12em] uppercase text-[var(--color-mute)]">{k}</dt>
      <dd className="text-[var(--color-ink)]">{v}</dd>
    </div>
  );
}

function Stat({ n, label, rail }: { n: string | number; label: string; rail: string }) {
  return (
    <div className="pl-4 border-l-2" style={{ borderColor: rail }}>
      <dd className="font-serif font-semibold leading-none tracking-tight text-[var(--color-ink)]" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
        {n}
      </dd>
      <dt className="mt-2 text-[12px] text-[var(--color-ink-2)]">{label}</dt>
    </div>
  );
}
