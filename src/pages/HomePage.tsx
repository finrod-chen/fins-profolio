import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { BloBg } from "@/components/BloBg";
import { BigSectionNumber } from "@/components/BigSectionNumber";
import { StatCard } from "@/components/StatCard";
import { FinrodMark } from "@/components/FinrodMark";
import { useReveal } from "@/hooks/useReveal";

/**
 * HomePage — v5 bold
 * 巨型 H1 (藍 / 桃紅 / 桃黃 inline highlights)、blob 漂浮背景、
 * 巨型 marquee (大字 56px)、巨型編號章節、StatCard disc 裝飾、
 * Finrod Mark footer 上方、彩色 sticky 收合。
 */
export function HomePage() {
  useReveal();
  const live = projects.filter((p) => p.status === "live").length;
  const total = projects.length;
  const posts = 130;

  // Marquee 文字
  const bigMarqueeLeft: (string | React.ReactNode)[] = [
    "Side project",
    "細胞治療",
    "Tinkering",
    "Personal site",
    "Cell therapy",
    "永遠在學",
  ];
  const bigMarqueeRight: (string | React.ReactNode)[] = [
    "Push it live ✦",
    "再 push 一次",
    "Break things",
    "Fix them again",
    "Ship anyway",
    "It works on my machine",
  ];

  return (
    <div className="page-in">
      {/* ─── HERO — 大 H1 ＋ blob 背景 ─────────────────────────────────── */}
      <BloBg
        className="px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24"
        variant="all"
      >
        {/* 漂浮 sticker */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-10" data-reveal>
          <span className="chip is-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pulse-soft inline-block" />
            接受新合作
          </span>
          <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
            Finrod · 2026 · v5
          </span>
        </div>

        <div className="relative">
          <h1
            className="font-serif font-semibold leading-[0.88] tracking-[-0.04em] text-[var(--color-ink)]"
            style={{ fontSize: "clamp(64px, 12vw, 168px)" }}
            data-reveal
          >
            白天<br />
            <span>
              做
              <span className="hl-accent hl-marker">細胞</span>
              <span className="hl-coral">治療</span>
              <span className="hl-accent">，</span>
            </span>
            <br />
            晚上<br />
            <span>
              寫
              <span className="hl-coral">side</span>{" "}
              <span className="hl-accent hl-underline">project</span>
              <span className="hl-coral">。</span>
            </span>
          </h1>

          {/* right giant wave svg */}
          <svg
            aria-hidden
            viewBox="0 0 600 600"
            className="absolute -right-10 sm:-right-20 -top-10 w-[280px] sm:w-[420px] pointer-events-none select-none opacity-90"
          >
            <defs>
              <linearGradient id="heroWave" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-coral)" stopOpacity="0.85" />
                <stop offset="55%" stopColor="var(--color-amber)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <circle cx="300" cy="300" r="240" fill="url(#heroWave)" opacity="0.18" />
            <circle cx="300" cy="300" r="190" fill="url(#heroWave)" opacity="0.32" />
            <circle cx="300" cy="300" r="140" fill="url(#heroWave)" opacity="0.55" />
            <circle cx="300" cy="300" r="80"  fill="url(#heroWave)" />
            {/* ring outline */}
            <circle cx="300" cy="300" r="262" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
            <circle cx="300" cy="300" r="220" fill="none" stroke="var(--color-coral)" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="300" cy="300" r="178" fill="none" stroke="var(--color-ink)" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Hero 副文 + CTA + Sticker */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 sm:mt-16"
          data-reveal
        >
          <div className="lg:col-span-7">
            <p className="font-serif text-[clamp(20px,2.4vw,28px)] leading-[1.55] tracking-tight text-[var(--color-ink-2)] max-w-2xl">
              平常工作之餘做出來的網站作品 —{" "}
              <span className="hl-accent">寫前端</span>、<span className="hl-coral">玩雲端</span>、
              <span className="hl-amber">3D 列印</span>、<span className="hl-accent">Arduino</span>。
              每個都做到一個可以說得上來的階段。
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-5">
            <div className="flex flex-wrap gap-2">
              <span className="sticker is-coral">v5 · Bold</span>
              <span className="sticker is-blue" style={{ transform: "rotate(2deg)" }}>2026</span>
              <span className="sticker is-amber" style={{ transform: "rotate(-1deg)" }}>Live ✦</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
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
      </BloBg>

      {/* ─── 大字 marquee (ink → coral) ─────────────────────────────── */}
      <Marquee
        items={bigMarqueeLeft}
        speed={50}
        variant="ink"
        size="lg"
      />
      <Marquee
        items={bigMarqueeRight}
        speed={42}
        variant="coral"
        reverse
        size="md"
      />

      {/* ─── 01 / About 區塊 ────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 relative">
        {/* 背景光暈 */}
        <div
          aria-hidden
          className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none opacity-25"
          style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
        />
        <div data-reveal>
          <BigSectionNumber
            number="01"
            label="Chapter 01 · 關於"
            title={
              <>
                我是 <span className="hl-coral">Finrod</span>
              </>
            }
            tone="accent"
            right={
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                {total} 個作品 · {live} 個上線
              </span>
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16" data-reveal>
          <div className="lg:col-span-7 space-y-5 text-[16px] sm:text-[17px] leading-[1.85] text-[var(--color-ink-2)] max-w-prose">
            <p>
              研究所唸生物工程, 進到細胞治療產業後從製程工程師做到研發主任。
              白天大部分時間都在跟 SOP、放行報告、品質系統打交道 —
              每個計畫都是「為了救一個病人」, 沒有犯錯的空間。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事 — 沒人審查、
              可以失敗、可以亂改。這裡放的每一個小玩意,
              都是某個晚上「<span className="hl-coral">如果這樣做會怎樣</span>」的具現化。
            </p>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="chip is-blue">生物工程</span>
              <span className="chip is-coral">細胞治療</span>
              <span className="chip is-amber">品管 / 法規</span>
              <span className="chip is-out">side project</span>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="border-2 border-[var(--color-ink)] p-6 sm:p-8 bg-[var(--color-paper)] relative rotate-[-1deg]">
              <span className="sticker is-amber absolute -top-3 -left-3 rotate-[-5deg]">info</span>
              <div className="eyebrow mb-4">基本資料</div>
              <dl className="space-y-3 text-[14px]">
                <Row k="工作" v="研發主任 · 細胞治療" />
                <Row k="業餘" v="網站 · 雲端 · 3D 列印 · Arduino" />
                <Row k="時段" v="週末 / 業餘" />
              </dl>
              {/* 角落 brush-circle 印章 */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full border-2 border-[var(--color-coral)] opacity-80" />
            </div>
          </aside>
        </div>

        {/* Stats — v5 disc */}
        <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" data-reveal>
          <StatCard n="12+" label="年 生技經驗" rail="var(--color-accent)" hint="從製程工程師到研發主任" />
          <StatCard n={total} label="個 side project" rail="var(--color-coral)" hint="網站、3D 列印、Arduino⋯" />
          <StatCard n="3" label="台 3D 印表機" rail="var(--color-amber)" hint="Bambu / Ender / 自行改機" />
          <StatCard n={`${posts}+`} label="篇文章" rail="var(--color-coral-hover)" hint="從 2013 累積到現在" />
        </div>
      </section>

      {/* ─── Works 區塊 ────────────────────────────────────────────── */}
      <section id="works" className="border-t border-[var(--color-line)]">
        <div data-reveal>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* ─── 中場 marquee 彩色反向大字 ──────────────────────────────── */}
      <Marquee
        items={[
          <span key="s" className="gradient-text-pan">Still shipping</span>,
          "still breaking",
          "still trying",
          "still learning",
          "still here",
        ]}
        speed={36}
        variant="paper"
        reverse
        size="lg"
      />

      {/* ─── 02 / Closing ──────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-line)] px-5 sm:px-8 lg:px-12 py-20 sm:py-28 relative"
        data-reveal
      >
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, var(--color-coral), transparent 70%)" }}
        />
        <BigSectionNumber
          number="02"
          label="Chapter 02 · 聯絡"
          title={
            <>
              想<span className="hl-coral">聊</span>些什麼？
            </>
          }
          tone="coral"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="font-serif text-[clamp(28px,3.2vw,48px)] leading-[1.2] tracking-tight text-[var(--color-ink)]">
              技術的、做東西的、細胞治療的、<br className="hidden sm:block" />
              或<span className="hl-amber">純粹好奇</span>的 — 就寫信給我。
            </p>
            <a
              href="mailto:me@finrod.xyz"
              className="mt-8 inline-block font-serif font-semibold leading-tight gradient-text-mix text-[clamp(32px,4vw,60px)] link-line"
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

      {/* ─── 03 / 巨型 monogram ──────────────────────────────────── */}
      <FinrodMark />
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
