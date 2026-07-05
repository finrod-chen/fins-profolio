/**
 * AboutPage — personal introduction page.
 * Plain prose, no magazine spreads. Taiwanese web-portfolio style.
 */
export function AboutPage() {
  return (
    <article className="page-in">
      <header
        className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-8 sm:pb-12"
        data-reveal
      >
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.25] tracking-tight text-[var(--color-ink)]">
          關於
        </h1>
        <p className="mt-3 text-[14px] text-[var(--color-mute)]">
          Finrod Chen · 個人簡介
        </p>
      </header>

      <section className="px-5 sm:px-8 lg:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" data-reveal>
          <div className="lg:col-span-7 space-y-5 text-[15px] sm:text-[16px] leading-[1.85] text-[var(--color-ink-2)] max-w-prose">
            <p>
              我是 Finrod Chen, 喜躍生醫的研發主任。
              生物工程研究所畢業後一直在細胞治療產業 — 從製程工程師
              做到生產主任、資訊管理, 一直到現在帶領研發團隊與特管辦法案件。
            </p>
            <p>
              這個網站收的是平常工作之餘做出來的東西 — 寫網站、
              玩雲端、3D 列印、Arduino。內容多半是工作之餘的實驗,
              不一定嚴謹, 但每個都是為了一個很具體的理由而生。
            </p>
            <p>
              想聊些什麼的話 — 技術的、做東西的、細胞治療的、純粹好奇的 —
              就寫信給我:{" "}
              <a
                href="mailto:me@finrod.xyz"
                className="link-line font-medium text-[var(--color-ink)]"
              >
                me@finrod.xyz
              </a>
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] p-6">
              <div className="eyebrow mb-3">基本資料</div>
              <dl className="space-y-3 text-[14px]">
                <Row k="姓名" v="Finrod Chen" />
                <Row k="Email" v={<a href="mailto:me@finrod.xyz" className="link-line text-[var(--color-accent-hover)]">me@finrod.xyz</a>} />
                <Row k="地點" v="新北市永和, TW" />
                <Row k="本職" v="研發主任 · 喜躍生醫" />
                <Row k="領域" v="細胞治療 / 再生醫療" />
                <Row k="業餘" v="網站 · 3D 列印 · Arduino · 雲端" />
              </dl>

              <div className="mt-6 pt-6 border-t border-[var(--color-line)]">
                <div className="eyebrow mb-3">其它連結</div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href="https://github.com/finrodchen"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 h-9 px-3 bg-[var(--color-ink)] text-white text-[12px] hover:bg-[var(--color-accent)] transition-colors"
                  >
                    GitHub <span aria-hidden>↗</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/finrodchen"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 h-9 px-3 border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] hover:bg-[var(--color-ink)] hover:text-white transition-colors"
                  >
                    LinkedIn <span aria-hidden>↗</span>
                  </a>
                  <a
                    href="https://astro.finrod.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 h-9 px-3 border border-[var(--color-line)] text-[var(--color-ink-2)] text-[12px] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    部落格 <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 工作經歷 */}
      <section
        className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-line)] pt-14 sm:pt-20 pb-20"
        data-reveal
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <h2 className="font-serif text-[clamp(22px,2.6vw,32px)] font-semibold leading-tight tracking-tight text-[var(--color-ink)]">
              工作經歷
            </h2>
            <p className="mt-3 text-[14px] text-[var(--color-mute)]">
              2012 — 現在
            </p>
          </div>

          <ol className="md:col-span-8 border-t border-[var(--color-line)]">
            {[
              {
                year: "2012",
                role: "製程工程師",
                place: "光麗生醫",
                note: "脂肪 / 臍帶間質幹細胞製程。ISO 文件系統建置。",
              },
              {
                year: "2014",
                role: "副研究員",
                place: "光麗生醫",
                note: "漸凍症恩慈治療 — 從臨床研究到細胞放行的完整負責。",
              },
              {
                year: "2018",
                role: "生產主任",
                place: "光麗生醫",
                note: "免疫殺手細胞製程開發 + 特管辦法專案管理。",
              },
              {
                year: "2020",
                role: "資訊管理人",
                place: "喜躍生醫",
                note: "公司內部資訊資安議題、進銷存系統、企業內部服務。",
              },
              {
                year: "2022",
                role: "研發主任",
                place: "喜躍生醫",
                note: "協調各研發專案、特管辦法案件完整流程。",
              },
            ].map((m, i) => (
              <li
                key={i}
                className="grid grid-cols-[80px_1fr] gap-6 py-6 border-b border-[var(--color-line)] items-start"
              >
                <span className="font-mono text-[14px] tracking-[0.04em] text-[var(--color-ink-2)] tabular-nums">
                  {m.year}
                </span>
                <div>
                  <div className="font-serif text-[16px] sm:text-[17px] font-medium leading-snug">
                    {m.role}
                    <span className="text-[var(--color-mute)] font-normal"> @ {m.place}</span>
                  </div>
                  <p className="mt-1.5 text-[14px] text-[var(--color-ink-2)] leading-[1.65] max-w-prose">
                    {m.note}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
      <dt className="text-[var(--color-mute)]">{k}</dt>
      <dd className="text-[var(--color-ink)] leading-snug">{v}</dd>
    </div>
  );
}
