/**
 * AboutPage — slim editorial bio.
 *
 * Just the cover-story version of who Finrod is. Long-form CV
 * is intentionally not re-rendered here (the full履歷 was
 * useful in v1 but in the magazine metaphor it doesn't belong
 * on the cover).
 */
export function AboutPage() {
  return (
    <article className="page-in">
      <header className="px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 pb-12">
        <div className="max-w-4xl">
          <span className="mag-eyebrow border-transparent">About</span>
          <h1
            className="mt-6 font-display text-[clamp(48px,8vw,96px)] font-medium leading-[1.0] tracking-[-0.025em] text-[var(--color-ink)]"
            data-reveal
            style={{ animationDelay: "60ms" } as React.CSSProperties}
          >
            白天做細胞,<br />
            晚上寫 <em className="text-[var(--color-accent-deep-2)] font-normal">side</em>。
          </h1>
        </div>
      </header>

      <section className="px-5 sm:px-8 lg:px-12 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16" data-reveal>
          <div className="lg:col-span-7 space-y-6 text-[17px] leading-[1.85] text-[var(--color-ink-2)] max-w-prose">
            <p className="font-display italic text-[clamp(20px,1.6vw,24px)] leading-[1.45] text-[var(--color-ink)]">
              我是 Finrod, 喜躍生醫的研發主任。
            </p>
            <p>
              生物工程研究所畢業後, 一直在細胞治療產業 — 從製程工程師
              做到生產主任、資訊管理, 一直到現在帶領研發團隊與特管辦法案件。
              寫 SOP 的日子練會了系統思考, 跑製程練會了對細節的耐性,
              帶團隊練會了對人的耐心。
            </p>
            <p>
              這個 side project 集, 是我私人的作品紀錄 — 寫一些網站、
              玩雲端、做 3D 列印、Arduino。內容多半是工作之餘的實驗,
              不一定嚴謹, 但每一個都是為了一個很具體的理由而生。
            </p>
            <p className="pt-4 border-t border-[var(--color-ink)]/15">
              如果你想聊些什麼 — 技術的、做東西的、細胞治療的、純粹好奇的 —
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
            <div className="border border-[var(--color-ink)]/15 bg-[var(--color-paper)] p-6 lg:p-8">
              <div className="flex items-start gap-5">
                <div
                  className="shrink-0 w-20 h-20 grid place-items-center bg-[var(--color-ink)] text-[var(--color-paper)] font-display text-[28px] font-medium"
                  aria-hidden
                >
                  FR
                </div>
                <div className="min-w-0">
                  <div className="mag-eyebrow mb-2 border-transparent">Identity</div>
                  <div className="font-display text-[24px] font-medium leading-tight tracking-tight">
                    陳思蒝
                  </div>
                  <div className="text-[14px] text-[var(--color-mute)]">
                    Finrod Chen
                  </div>
                </div>
              </div>

              <dl className="mt-8 space-y-5 text-[13px]">
                <Row k="Email"     v={<a href="mailto:me@finrod.xyz" className="link-line">me@finrod.xyz</a>} />
                <Row k="Location"  v="新北市永和, TW" />
                <Row k="Role"      v="研發主任 · 喜躍生醫" />
                <Row k="Industry"  v="Cell therapy / regenerative medicine" />
                <Row k="Side"      v="Web dev · 3D print · Arduino · cloud" />
                <Row
                  k="Languages"
                  v={
                    <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                      ZH · TW · EN — JP (basic)
                    </span>
                  }
                />
              </dl>

              <div className="mt-8 flex flex-wrap gap-2.5">
                <a
                  href="https://github.com/finrodchen"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-3.5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-[var(--color-accent)] transition-colors"
                >
                  GitHub <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://linkedin.com/in/finrodchen"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-3.5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
                >
                  LinkedIn <span aria-hidden>↗</span>
                </a>
                <a
                  href="https://astro.finrod.xyz"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-3.5 border border-[var(--color-line)] text-[var(--color-ink-2)] text-[11px] font-mono uppercase tracking-[0.16em] hover:border-[var(--color-ink)] transition-colors"
                >
                  Blog <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-ink)]/15 pt-16 sm:pt-24 pb-24 sm:pb-36"
        data-reveal
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-5">
            <span className="mag-eyebrow border-transparent">Trajectory</span>
            <h2 className="mt-6 font-display text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-tight text-[var(--color-ink)]">
              一路走來 —
              <br />
              <em className="font-normal text-[var(--color-accent-deep-2)]">
                細胞 → 系統
              </em>
              <br />
              的兩條河。
            </h2>
          </div>
          <ol className="md:col-span-7 border-t border-[var(--color-line)]">
            {[
              {
                year: "2012",
                role: "製程工程師",
                place: "光麗生醫",
                note: "脂肪 / 臍帶間質幹細胞製程。ISO 文件系統建置。二型糖尿病臨床研究申請。",
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
                note: "免疫殺手細胞製程開發 + 特管辦法第四期實體癌 / 退化性關節炎專案管理。",
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
                note: "協調各研發專案資源分配、專案報告審查; 主導「特管辦法」案件完整流程。",
              },
            ].map((m, i) => (
              <li
                key={i}
                className="grid grid-cols-[80px_1fr] gap-6 sm:gap-8 py-7 border-b border-[var(--color-line)] items-start"
              >
                <span className="font-display text-[clamp(22px,2vw,28px)] font-medium leading-none text-[var(--color-accent-deep-2)] tabular-nums">
                  {m.year}
                </span>
                <div>
                  <div className="font-display text-[clamp(20px,2vw,24px)] font-medium leading-tight">
                    {m.role}
                    <span className="text-[var(--color-mute)] font-normal italic"> @ {m.place}</span>
                  </div>
                  <p className="mt-2 text-[14px] text-[var(--color-ink-2)] leading-[1.65] max-w-prose">
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
    <div className="grid grid-cols-[110px_1fr] items-baseline gap-3">
      <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-[13px] text-[var(--color-ink)] leading-[1.4]">{v}</dd>
    </div>
  );
}
