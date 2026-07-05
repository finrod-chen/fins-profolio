import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Marquee } from "@/components/Marquee";
import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

/**
 * HomePage — standard portfolio landing page.
 * Hero → About → Works grid → Closing CTA.
 */
export function HomePage() {
  useReveal();
  const live = projects.filter((p) => p.status === "live").length;
  const total = projects.length;

  const marqueeItems = [
    "獨立網站作品",
    "設計 × 工程",
    `${total} 個作品 · ${live} 個上線`,
    "台北 / 遠端",
    "歡迎合作",
  ];

  return (
    <div className="page-in">
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="max-w-4xl">
          <p className="text-[13px] text-[var(--color-mute)] mb-3">
            Finrod Chen / 個人作品集 / 2026
          </p>
          <h1
            className="font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.25] tracking-tight text-[var(--color-ink)]"
            data-reveal
          >
            白天做細胞治療,
            <br />
            晚上寫 side project。
          </h1>
          <p
            className="mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.85] text-[var(--color-ink-2)]"
            data-reveal
          >
            這裡收的是一些平常工作之餘做出來的網站作品 — 寫前端、
            玩雲端、3D 列印、Arduino。每個都是為一個很具體的理由而做,
            沒什麼特別偉大的目標, 但都完成到一個可以說得上來的階段。
          </p>
          <div
            className="mt-7 flex flex-wrap items-center gap-3"
            data-reveal
          >
            <Link
              to="/#works"
              className="inline-flex items-center gap-2 h-11 px-5 bg-[var(--color-ink)] text-white text-[14px] font-medium hover:bg-[var(--color-accent)] transition-colors"
            >
              看作品 <span aria-hidden>↓</span>
            </Link>
            <a
              href="mailto:me@finrod.xyz"
              className="inline-flex items-center gap-2 h-11 px-5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[14px] font-medium hover:bg-[var(--color-ink)] hover:text-white transition-colors"
            >
              來信聊聊 <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─────────────────────────────────────────────────── */}
      <Marquee items={marqueeItems} speed={48} />

      {/* ─── About strip ─────────────────────────────────────────────── */}
      <section
        className="px-5 sm:px-8 lg:px-12 py-14 sm:py-20"
        data-reveal
      >
        <SectionLabel title="關於" meta={`${total} 個作品 · ${live} 個上線`} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="md:col-span-2 space-y-5 text-[15px] leading-[1.85] text-[var(--color-ink-2)] max-w-prose">
            <p>
              研究所唸生物工程, 進到細胞治療產業後從製程工程師做到研發主任。
              白天大部分時間都在跟 SOP、放行報告、品質系統打交道 —
              每個計畫都是「為了救一個病人」, 沒有犯錯的空間。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事 — 沒人審查、
              可以失敗、可以亂改。這裡放的每一個小玩意,
              都是某個晚上「如果這樣做會怎樣」的具現化。
              重視排版、效能與閱讀體驗, 因為這些都是寫給未來的自己看的。
            </p>
          </div>

          <aside>
            <div className="border border-[var(--color-line)] p-5 bg-[var(--color-paper-2)]">
              <div className="eyebrow mb-3">基本資料</div>
              <dl className="space-y-2.5 text-[13px]">
                <Row k="工作" v="研發主任 · 細胞治療" />
                <Row k="業餘" v="網站 · 雲端 · 3D 列印 · Arduino" />
                <Row k="地點" v="永和 · 新北市, TW" />
                <Row k="時段" v="週末 / 業餘" />
              </dl>
            </div>
          </aside>
        </div>

        <dl className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-[var(--color-line)] pt-8">
          <Stat n="12+" label="年 生技經驗" />
          <Stat n={total} label="個 side project" />
          <Stat n="3" label="台 3D 印表機" />
          <Stat n="1" label="個部落格" />
        </dl>
      </section>

      {/* ─── Works grid ──────────────────────────────────────────────── */}
      <div data-reveal>
        <ProjectGrid projects={projects} />
      </div>

      {/* ─── Closing ────────────────────────────────────────────────── */}
      <section
        className="border-t border-[var(--color-line)] px-5 sm:px-8 lg:px-12 py-16 sm:py-20"
        data-reveal
      >
        <div className="max-w-3xl">
          <SectionLabel title="聯絡" />
          <p className="font-serif text-[clamp(24px,3vw,40px)] leading-[1.3] tracking-tight text-[var(--color-ink)]">
            想聊些什麼 — 技術、做東西的、
            細胞治療的、或純粹好奇的 — 就寫信給我。
          </p>
          <div className="mt-6">
            <a
              href="mailto:me@finrod.xyz"
              className="text-[clamp(24px,3vw,40px)] font-serif font-semibold leading-tight text-[var(--color-accent-hover)] link-line"
            >
              me@finrod.xyz
            </a>
            <p className="mt-3 text-[13px] text-[var(--color-mute)]">
              通常 1 — 2 個工作天內回信
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[70px_1fr] items-baseline gap-3">
      <dt className="text-[var(--color-mute)]">{k}</dt>
      <dd className="text-[var(--color-ink)]">{v}</dd>
    </div>
  );
}

function Stat({ n, label }: { n: string | number; label: string }) {
  return (
    <div>
      <dd className="font-serif text-[clamp(28px,3.4vw,42px)] font-semibold leading-none tracking-tight text-[var(--color-ink)]">
        {n}
      </dd>
      <dt className="mt-1.5 text-[12px] text-[var(--color-mute)]">{label}</dt>
    </div>
  );
}
