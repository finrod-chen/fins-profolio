import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { SectionLabel } from "@/components/SectionLabel";
import { ScrambleText } from "@/components/ScrambleText";
import { useReveal } from "@/hooks/useReveal";

/**
 * HomePage — magazine COVER.
 *
 * Layout (think broadsheet front page):
 *
 *   ┌──────────┬──────────────────────────────────────┬────────┐
 *   │ vertical │  "I build small things                  │  spec  │
 *   │  stamp   │   carefully, quickly,                   │  box   │
 *   │          │   and forgettably."                     │        │
 *   │          │                                          │        │
 *   │          │   [Fragments from a working week]       │        │
 *   └──────────┴──────────────────────────────────────┴────────┘
 *   ── a divider line ──
 *   ▌ a standfirst paragraph  ▌
 *   ── a divider line ──
 *   ▌  "in this issue"  — two featured lines pulled up ▌
 *   ── marquee ──
 *   ▌  Selected Works  ▌
 *   ▌  grid (lives below) ▌
 *   ▌  Closing manifesto  ▌
 */

export function HomePage() {
  useReveal();
  const live = projects.filter((p) => p.status === "live").length;
  const total = projects.length;

  const marqueeItems = [
    "Built from Taipei",
    "Web · Cloud · 3D print · Arduino",
    `${total} entries · ${live} now live`,
    "An independent working notebook",
    "Open to collab",
  ];

  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page-in">
      {/* ─── COVER ──────────────────────────────────────────────────────── */}
      <section className="relative">
        {/* subtle cream-wash backdrop — drifts gently */}
        <div
          aria-hidden
          className="absolute inset-0 drift"
          style={{
            background:
              "radial-gradient(70% 60% at 100% 0%, rgba(217,119,87,0.10) 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 50% at 0% 100%, rgba(42,39,66,0.06) 0%, rgba(255,255,255,0) 55%)",
          }}
        />
        {/* baseline grid — keep it subtle, never competing with the type */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(26,22,37,0.04) 1px, transparent 1px)",
            backgroundSize: "100% 8px",
          }}
        />

        <div className="relative px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-16 sm:pb-24">
          {/* 1. The vertical stamp (col 1) + headline (col 2 wide) + spec (col 3) */}
          <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10 items-start">
            {/* vertical stamp */}
            <div className="hidden md:flex md:col-span-1 lg:col-span-1 pt-3">
              <div className="rotate-180 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-mute)] [writing-mode:vertical-rl]">
                FIN · Portfolio · {todayLabel}
              </div>
            </div>

            {/* headline */}
            <div className="col-span-12 md:col-span-9 lg:col-span-8">
              <div className="flex items-baseline gap-3 mb-5 mask-up" style={{ "--mask-delay": "0ms" } as React.CSSProperties}>
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-[var(--color-accent-deep-2)]">
                  An independent working notebook
                </span>
              </div>

              <h1
                className="font-display text-[clamp(48px,9vw,128px)] font-medium leading-[0.96] tracking-[-0.025em] text-[var(--color-ink)] mask-up"
                style={{ "--mask-delay": "120ms" } as React.CSSProperties}
              >
                Small things,{" "}
                <em className="text-[var(--color-accent-deep-2)] font-normal">
                  <ScrambleText text="carefully" />
                </em>
                <br />
                built at the desk{" "}
                <em className="font-normal">after work.</em>
              </h1>

              <p
                className="mt-7 sm:mt-9 max-w-2xl font-display italic text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-[var(--color-ink-2)] mask-up"
                style={{ "--mask-delay": "320ms" } as React.CSSProperties}
              >
                I'm <strong className="not-italic font-medium">Finrod</strong>.
                By day I run a cell-therapy R&amp;D desk in 新北永和. By night
                I keep this notebook — of small web works, cloud toys,
                3D-printed odds, and Arduino experiments.
              </p>

              <div
                className="mt-10 sm:mt-14 flex flex-wrap items-center gap-4 mask-up"
                style={{ "--mask-delay": "460ms" } as React.CSSProperties}
              >
                <a
                  href="#works"
                  className="inline-flex items-center justify-between gap-6 h-14 px-6 min-w-[260px] bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors"
                >
                  <span>Open the issue</span>
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="mailto:me@finrod.xyz"
                  className="inline-flex items-center justify-between gap-6 h-14 px-6 min-w-[260px] border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
                >
                  <span>Write to me</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>

            {/* spec box */}
            <aside className="col-span-12 md:col-span-2 lg:col-span-3 mt-10 md:mt-0">
              <div className="border border-[var(--color-ink)]/15 p-5 lg:p-6 bg-[var(--color-paper)]">
                <div className="mag-eyebrow mb-4">This Issue</div>
                <dl className="space-y-3.5 text-[12.5px]">
                  <SpecRow k="Day job" v="R&D Lead · cell therapy" />
                  <SpecRow k="At night" v="Web · cloud · 3D print · Arduino" />
                  <SpecRow k="Where" v="永和 · 新北市, TW" />
                  <SpecRow
                    k="Status"
                    v={
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                        Open to collab
                      </span>
                    }
                  />
                  <SpecRow
                    k="Pages"
                    v={`${total} entries · ${live} live`}
                  />
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── Divider rule ─────────────────────────────────────────────── */}
      <hr className="border-t border-[var(--color-ink)]/15 mx-5 sm:mx-8 lg:mx-12" />

      {/* ─── Editor's note / manifesto ──────────────────────────────── */}
      <section
        className="px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 pb-16 sm:pb-20"
        data-reveal
      >
        <SectionLabel label="A note from the editor" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="font-display text-[clamp(22px,2vw,28px)] leading-[1.25] tracking-tight text-[var(--color-ink)]">
              一份<span className="italic">週末</span>做的筆記。
            </p>
            <p className="mt-3 font-display italic text-[clamp(22px,2vw,28px)] leading-[1.25] tracking-tight text-[var(--color-ink-2)]">
              白天的製程很嚴謹、晚上就寬容多了。
            </p>
          </div>
          <div className="lg:col-span-8 space-y-6 text-[16px] leading-[1.8] text-[var(--color-ink-2)] max-w-prose">
            <p>
              研究所唸的是生物工程。進到細胞治療產業以後 — 從製程到研發主任、
              從一個案件到十二個 — 寫 SOP、簽放行報告、跑品質系統。
              每一個計畫都是「為了救一個病人」，沒有犯錯的空間。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事 — 沒人審查、
              可以失敗、可以亂改。這裡放的每一個小玩意，都是某個晚上
              「如果這樣做會怎樣」的具現化。重視排版、效能與閱讀體驗，
              因為這些是寫給未來的自己看的。
            </p>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[var(--color-ink)]/15">
              <Stat n="12+" label="Years in biotech" />
              <Stat n={String(total)} label="Side projects" />
              <Stat n="3" label="3D printers" />
              <Stat n="1" label="Blog since 2013" />
            </dl>
          </div>
        </div>
      </section>

      {/* ─── Marquee ──────────────────────────────────────────────────── */}
      <Marquee items={marqueeItems} speed={48} />

      {/* ─── Selected Works grid ─────────────────────────────────────── */}
      <ProjectGrid projects={projects} />

      {/* ─── Closing manifesto ────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-ink)]/15 px-5 sm:px-8 lg:px-12 py-24 sm:py-36 relative overflow-hidden"
        data-reveal
      >
        <div
          aria-hidden
          className="absolute inset-0 drift"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(217,119,87,0.10) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="mag-eyebrow inline-block mb-6 border-transparent">Closing</div>
          <h2 className="font-display text-[clamp(48px,8vw,128px)] font-medium leading-[0.96] tracking-[-0.025em] text-[var(--color-ink)]">
            <em className="text-[var(--color-accent-deep-2)] font-normal">Thanks</em>
            <br />
            for reading.
          </h2>
          <p className="mt-8 font-display italic text-[clamp(18px,1.6vw,22px)] text-[var(--color-ink-2)]">
            來信說個{" "}
            <span className="not-italic font-medium text-[var(--color-ink)]">hi</span>{" "}
            就好,
            <br className="hidden sm:block" />
            或者繼續往下 — shop 那一頁有我真心用過的好物。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:me@finrod.xyz"
              className="inline-flex items-center justify-between gap-6 h-14 px-6 min-w-[280px] bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] transition-colors"
            >
              <span>me@finrod.xyz</span>
              <span aria-hidden>↗</span>
            </a>
            <Link
              to="/blog"
              className="inline-flex items-center justify-between gap-6 h-14 px-6 min-w-[280px] border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-mono uppercase tracking-[0.2em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              <span>Or read the writing</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-3">
      <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-right text-[13px] text-[var(--color-ink)] leading-[1.35]">
        {v}
      </dd>
    </div>
  );
}

function Stat({ n, label }: { n: string | number; label: string }) {
  return (
    <div>
      <div className="font-display text-[clamp(34px,4vw,48px)] font-medium tracking-tight leading-none text-[var(--color-ink)]">
        {n}
      </div>
      <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {label}
      </div>
    </div>
  );
}
