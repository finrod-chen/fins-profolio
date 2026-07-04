import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { SectionLabel } from "@/components/SectionLabel";

/**
 * HomePage — Hero, About, Works, and a closing CTA.
 * Mobile-first stacking; on desktop the hero has a 2-column layout.
 */
export function HomePage() {
  const live = projects.filter((p) => p.status === "live").length;
  const total = projects.length;
  const featured = projects.filter((p) => p.featured);

  const marqueeItems = [
    "Independent Web Works",
    "Design × Engineering",
    `${total} projects · ${live} live`,
    "Taipei / Remote",
    "Open to Collab",
  ];

  return (
    <div className="page-in">
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 cross-grid pointer-events-none" aria-hidden />
        <div className="relative px-5 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="lg:col-span-9">
              <div className="flex items-center gap-3 mb-5">
                <span className="stamp">FIN · PORTFOLIO · 2026</span>
                <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                  v1.0
                </span>
              </div>
              <h1 className="text-[clamp(40px,9vw,128px)] font-semibold leading-[0.95] tracking-[-0.03em]">
                <span>Side</span>
                <br />
                <span className="text-[var(--color-ink)]">projects,</span>{" "}
                <span className="inline-flex items-baseline gap-3">
                  <span>built</span>
                  <span className="relative">
                    <span className="absolute -inset-1 bg-[var(--color-accent)] -z-10" aria-hidden />
                    <span className="relative">carefully</span>
                  </span>
                </span>
                .
              </h1>
              <p className="mt-6 sm:mt-8 max-w-2xl text-[16px] sm:text-[18px] leading-[1.6] text-[var(--color-ink-2)]">
                我是 <strong className="text-[var(--color-ink)] font-semibold">Finrod</strong>,
                白天在生醫產業做細胞治療, 晚上用 side project 練手感 — 寫網站、
                玩雲端、3D 列印、Arduino。這裡蒐集的就是這些「興趣使然」的小玩意,
                每一個都是為一個很具體的理由而生。
              </p>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#works"
                  className="inline-flex items-center gap-2 h-11 px-5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
                >
                  See works <span aria-hidden>↓</span>
                </a>
              <a
                href="mailto:me@finrod.xyz"
                className="inline-flex items-center gap-2 h-11 px-5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
              >
                Say hi <span aria-hidden>↗</span>
              </a>
              </div>
            </div>

            {/* spec sidebar */}
            <aside className="lg:col-span-3">
              <div className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
                  Spec sheet
                </div>
                <dl className="space-y-3 text-[13px]">
                  <Row k="Day job" v="R&D Lead · Cell therapy" />
                  <Row k="Side" v="Web · Cloud · 3D print · Arduino" />
                  <Row k="Location" v="永和 · 新北市, TW" />
                  <Row k="Available" v="週末 / 業餘接觸" dotColor="var(--color-success)" />
                  <Row k="Projects" v={`${total} (${live} live)`} />
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} speed={42} />

      {/* ABOUT */}
      <section className="px-5 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01" label="About" meta="01/04" />
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-tight">
              白天做細胞,
              <br />
              晚上寫 side。
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--color-ink-2)]">
            <p>
              研究所唸的是生物工程, 畢業後進到細胞治療產業, 從製程做到研發主任。
              細胞治療是一個高度被法規框住、但又非常需要動手做的領域 —
              每一個計畫都是「為了救一個病人」, 沒有犯錯的空間。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事 — 沒人審查、可以失敗、可以亂改。
              這裡放的每一個小玩意, 都是某個晚上「如果這樣做會怎樣」的具現化。
              重視排版、效能與閱讀體驗, 因為這些是寫給未來的自己看的。
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 pt-4 border-t border-[var(--color-line)]">
              <Stat n="12+" label="Years in biotech" />
              <Stat n="10+" label="Side projects" />
              <Stat n="3" label="Printers" />
              <Stat n="1" label="Blog since 2013" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="px-5 sm:px-6 lg:px-10 py-10 sm:py-14 bg-[var(--color-paper-2)] border-y border-[var(--color-line)]">
          <SectionLabel index="01.5" label="Featured" meta="Highlights" />
          <ul className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {featured.map((p, i) => (
              <li key={p.id}>
                <Link
                  to={`/work/${p.id}`}
                  className="group flex items-center gap-4 sm:gap-6 py-5 sm:py-6 hover:bg-[var(--color-paper)] transition-colors -mx-2 px-2"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] w-10">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block text-[20px] sm:text-[24px] font-semibold tracking-tight truncate">
                      {p.title}
                    </span>
                    <span className="block text-[13px] sm:text-[14px] text-[var(--color-mute)] truncate">
                      {p.tagline}
                    </span>
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] w-24 text-right">
                    {p.category}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] w-16 text-right">
                    {p.year}
                  </span>
                  <span className="ml-2 w-8 h-8 grid place-items-center border border-[var(--color-line)] group-hover:border-[var(--color-ink)] group-hover:bg-[var(--color-ink)] group-hover:text-[var(--color-paper)] transition-colors">
                    <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* WORKS GRID */}
      <ProjectGrid projects={projects} />

      {/* CTA */}
      <section className="border-t border-[var(--color-line)]">
        <div className="px-5 sm:px-6 lg:px-10 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="99" label="Contact" />
            <h2 className="text-[clamp(36px,7vw,84px)] font-semibold leading-[1.02] tracking-[-0.02em]">
              交個朋友吧！
              <br />
              <span className="text-[var(--color-mute)]">來聊聊。</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a
              href="mailto:me@finrod.xyz"
              className="inline-flex items-center gap-2 h-12 px-6 bg-[var(--color-ink)] text-[var(--color-paper)] text-[13px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
            >
              me@finrod.xyz <span aria-hidden>↗</span>
            </a>
            <p className="mt-3 text-[12px] font-mono tracking-[0.14em] uppercase text-[var(--color-mute)]">
              New Taipei · 永和 · TW
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v, dotColor }: { k: string; v: string; dotColor?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line-soft)] pb-2 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-right text-[var(--color-ink-2)] font-medium flex items-center gap-2">
        {dotColor && <span className="w-1.5 h-1.5 rounded-full" style={{ background: dotColor }} />}
        {v}
      </dd>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="text-[clamp(28px,4vw,40px)] font-semibold tracking-tight leading-none">{n}</div>
      <div className="mt-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {label}
      </div>
    </div>
  );
}
