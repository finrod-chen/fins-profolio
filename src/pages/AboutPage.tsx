import { SectionLabel } from "@/components/SectionLabel";

/**
 * AboutPage — 完整履歷頁
 * 自我介紹、技能、經歷、學歷、專案、認證、興趣、語言
 */

const SKILLS = [
  {
    title: "細胞生化實驗",
    sub: "Cell biology",
    years: "10+ years",
    body: "人類細胞組織領域, 專注於成體幹細胞製程開發最佳化, 應用於疾病治療新藥開發。",
  },
  {
    title: "基礎生化實驗",
    sub: "Biochemistry",
    years: "5+ years",
    body: "中草藥研究 — 活性成份分離純化、成份定性定量、化合物結構分析、in vitro / in vivo 活性分析。",
  },
  {
    title: "專案計畫管理",
    sub: "Project management",
    years: "10+ years",
    body: "提案、執行、結案。統籌資源、內控流程、跨單位溝通。",
  },
];

const TOOLS = [
  "Digiwin iGP",
  "AWS",
  "Docker",
  "Git",
  "SVN",
  "PaloAlto FW",
  "SQL Server",
  "Google Workspace",
  "Microsoft Office",
  "Web FE/BE",
];

const TIMELINE = [
  {
    period: "2022.5 — 現在",
    role: "研發主任",
    company: "喜躍生醫",
    url: "https://xiyuebiomed.com/",
    points: [
      "協調各研發專案資源分配、專案報告審查",
      "主導「特管辦法」細胞治療計畫案件完整流程",
    ],
  },
  {
    period: "2020.1 — 現在",
    role: "資訊管理人",
    company: "喜躍生醫",
    url: "https://xiyuebiomed.com/",
    points: [
      "公司內部資訊資安議題",
      "管理進銷存系統、內部網路、企業內部服務",
    ],
  },
  {
    period: "2018.2 — 2022.1",
    role: "生產主任",
    company: "光麗生醫",
    url: "https://guangli.com.tw/",
    points: [
      "協調生產排程、簽署細胞產品製程報告",
      "免疫殺手細胞製程開發",
      "脂肪間質幹細胞庫技術開發 (膝關節脂肪 / 抽脂後廢棄脂肪) — 人體研究",
      "特管辦法：免疫殺手細胞治療第四期實體癌 / 脂肪間質幹細胞治療退化性關節炎 專案管理",
    ],
  },
  {
    period: "2014.2 — 2018.1",
    role: "副研究員",
    company: "光麗生醫",
    url: "https://guangli.com.tw/",
    points: [
      "收集彙整尖端技術資訊及臨床研究成果",
      "填寫與檢核細胞產品製程報告、執行內部能力試驗",
      "脂肪間質幹細胞治療漸凍症 — 臨床研究 / 恩慈治療 申請",
    ],
  },
  {
    period: "2012.2 — 2014.1",
    role: "製程工程師",
    company: "光麗生醫",
    url: "https://guangli.com.tw/",
    points: [
      "脂肪間質幹細胞及臍帶間質幹細胞 — 組織分離與培養",
      "脂肪間質幹細胞治療二型糖尿病 — 臨床研究申請",
      "製程 ISO 文件系統建置",
    ],
  },
];

const PROJECTS = [
  {
    title: "特管辦法細胞治療計畫執行",
    role: "專案經理 · 品質計畫負責人代理人",
    period: "2019.2 — 現在",
    bullets: [
      "12 個案件營運中, 服務超過 220 位病患",
      "放行細胞產品超過 800 劑次 (2025/01)",
      "審核產品報告、SOP 制定、PD/CA 流程",
      "醫療機構聯繫窗口、年度報告彙整",
    ],
  },
  {
    title: "特管辦法細胞治療計畫申請",
    role: "專案經理 · 計畫書撰寫",
    period: "2018.2 — 現在",
    bullets: [
      "已通過 14 個計畫案申請 (2024/01)",
      "計畫書及產品製造文件彙整送審",
      "公部門 / 醫療機構聯繫、版本控制、知識管理",
    ],
  },
  {
    title: "鼎新 iGP Workflow 進銷存系統導入",
    role: "專案經理",
    period: "2020.6 — 2021.1",
    bullets: [
      "同時導入 iGP Workflow、EasyFlow、Shop Flow Tracking 三套系統",
      "4 個月導入、2020/11 準時上線",
      "上線後 KPI 達標、順利結案",
    ],
  },
];

const LANGUAGES = [
  { name: "中文", level: "Native" },
  { name: "台語", level: "Native" },
  { name: "英文", level: "Advanced" },
  { name: "日文", level: "Beginner" },
];

const CERTS = [
  {
    title: "乙種職業安全衛生業務主管",
    org: "社團法人工業安全衛生協會",
    date: "2023 / 01 / 17 合格",
  },
];

export function AboutPage() {
  return (
    <div className="page-in px-5 sm:px-6 lg:px-10 py-10 sm:py-14 max-w-7xl">
      <title>About — Finrod Chen · Cell therapy & side projects</title>
      <meta name="description" content="陳思蒝 (Finrod Chen) 的完整履歷 — 細胞治療研發主任、十年生技經驗、週末 side project 愛好者。" />
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <SectionLabel index="01" label="Resume" meta="陳思蒝 · Finrod Chen" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 sm:mb-20">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="tag is-accent">Open to Collab</span>
            <span className="tag">TAIPEI.TW</span>
          </div>
          <h1 className="text-[clamp(36px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            白天做細胞,
            <br />
            <span className="text-[var(--color-mute)]">晚上</span>
            做網站。
          </h1>

          <div className="mt-6 sm:mt-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.8] text-[var(--color-ink-2)] max-w-2xl">
            <p>
              我是 <strong className="text-[var(--color-ink)] font-semibold">Finrod</strong>,
              喜躍生醫的研發主任。生物工程研究所畢業後,
              一直在細胞治療產業 — 從製程工程師做到生產主任、資訊管理,
              一直到現在帶領研發團隊與特管辦法案件。
            </p>
            <p>
              這個 side 是我私人的作品集 — 寫一些網站、玩雲端、做 3D 列印、Arduino、
              純粹是「興趣使然」的小玩意。內容多半是工作之餘的實驗,
              不一定嚴謹, 但每一個都是為了一個很具體的理由而生。
            </p>
            <p>
              聯絡方式:{" "}
              <a href="mailto:me@finrod.xyz" className="link-line text-[var(--color-ink)] font-medium">
                me@finrod.xyz
              </a>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="https://github.com/finrodchen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
            >
              GitHub <span aria-hidden>↗</span>
            </a>
            <a
              href="https://linkedin.com/in/finrodchen"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 border border-[var(--color-ink)] text-[var(--color-ink)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
            >
              LinkedIn <span aria-hidden>↗</span>
            </a>
            <a
              href="https://astro.finrod.xyz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 h-10 px-4 border border-[var(--color-line)] text-[var(--color-ink-2)] text-[12px] font-mono uppercase tracking-[0.12em] hover:border-[var(--color-ink)] transition-colors"
            >
              Blog <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        {/* identity card */}
        <aside className="lg:col-span-5">
          <div className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div
                className="shrink-0 w-16 h-16 grid place-items-center bg-[var(--color-ink)] text-[var(--color-paper)] font-mono font-semibold text-[18px] leading-none"
                aria-hidden
              >
                FR
              </div>
              <div className="min-w-0">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                  Identity
                </div>
                <div className="text-[18px] font-semibold tracking-tight mt-0.5">陳思蒝</div>
                <div className="text-[14px] text-[var(--color-mute)]">Finrod Chen</div>
              </div>
            </div>

            <dl className="mt-5 space-y-3 text-[13px]">
              <SpecRow k="Email" v={<a href="mailto:me@finrod.xyz" className="link-line">me@finrod.xyz</a>} />
              <SpecRow k="Location" v="新北市, TW" />
              <SpecRow k="Role" v="研發主任 · 喜躍生醫" />
              <SpecRow k="Industry" v="Cell Therapy / Regenerative Medicine" />
              <SpecRow k="Side" v="Web dev · 3D print · Arduino · Cloud" />
            </dl>
          </div>

          <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] p-5 sm:p-6 mt-5">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              Languages
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-[13px]">
              {LANGUAGES.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-2">
                  <span className="text-[var(--color-ink-2)]">{l.name}</span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* ── SKILLS ─────────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <SectionLabel index="02" label="Skills" meta="Core competencies" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {SKILLS.map((s) => (
            <div
              key={s.title}
              className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6 lift"
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <h3 className="text-[18px] font-semibold tracking-tight">{s.title}</h3>
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-accent)]">
                  {s.years}
                </span>
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] mb-3">
                {s.sub}
              </div>
              <p className="text-[14px] text-[var(--color-ink-2)] leading-[1.7]">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 border border-[var(--color-line)] bg-[var(--color-paper-2)] p-5 sm:p-6">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
            Tools & Tech
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {TOOLS.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── EXPERIENCE ─────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <SectionLabel index="03" label="Experience" meta="2012 — Present" />
        <ol className="border-y border-[var(--color-line)] divide-y divide-[var(--color-line)]">
          {TIMELINE.map((item, i) => (
            <li key={i} className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-8 py-6 sm:py-7">
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                {item.period}
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-[18px] sm:text-[20px] font-semibold tracking-tight">
                    {item.role}
                  </h3>
                  <span className="text-[14px] text-[var(--color-mute)]">@</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line text-[15px] text-[var(--color-ink-2)] font-medium"
                  >
                    {item.company}
                  </a>
                </div>
                <ul className="space-y-1.5 text-[14px] leading-[1.7] text-[var(--color-ink-2)]">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-[var(--color-accent)]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── PROJECTS ───────────────────────────────────────────── */}
      <section className="mb-14 sm:mb-20">
        <SectionLabel index="04" label="Projects" meta="Selected work" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6 flex flex-col lift"
            >
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] mb-2">
                {p.period}
              </div>
              <h3 className="text-[17px] font-semibold tracking-tight leading-snug mb-2">
                {p.title}
              </h3>
              <div className="text-[12px] text-[var(--color-mute)] mb-4">{p.role}</div>
              <ul className="space-y-1.5 text-[13px] leading-[1.65] text-[var(--color-ink-2)] flex-1">
                {p.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1 h-1 shrink-0 bg-[var(--color-ink-2)]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── EDUCATION + CERTS + INTERESTS ───────────────────────── */}
      <section>
        <SectionLabel index="05" label="Education & More" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Education */}
          <div className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              Education
            </div>
            <h3 className="text-[17px] font-semibold tracking-tight">大同大學</h3>
            <div className="text-[13px] text-[var(--color-mute)] mt-0.5">
              生物工程研究所 · 2009 — 2011
            </div>
            <ul className="mt-4 space-y-1.5 text-[13px] text-[var(--color-ink-2)] leading-[1.6]">
              <li>· 2012 產學: 小金櫻不同部位萃取物之美白功效</li>
              <li>· 2013 產學: 小金櫻抗過敏活性之研究</li>
            </ul>
            <p className="mt-4 text-[12px] text-[var(--color-mute)] leading-[1.6]">
              主要研究 — 中草藥萃取物化學活性及細胞活性分析,
              找出活性成分, 進一步純化作為保養品 / 保健食品原料。
            </p>
          </div>

          {/* Certs */}
          <div className="border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              Certifications
            </div>
            {CERTS.map((c) => (
              <div key={c.title}>
                <h3 className="text-[15px] font-semibold tracking-tight leading-snug">
                  {c.title}
                </h3>
                <div className="text-[12px] text-[var(--color-mute)] mt-0.5">{c.org}</div>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-accent)] mt-2">
                  {c.date}
                </div>
              </div>
            ))}
          </div>

          {/* Interests */}
          <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] p-5 sm:p-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              Interests
            </div>
            <p className="text-[14px] leading-[1.7] text-[var(--color-ink-2)]">
              嘗試各種新世代科技, 空閒時自學 IT / Maker 技能:
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {["Blog", "Cloud deploy", "3D print", "Arduino", "Web FE/BE", "Server ops"].map(
                (t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line-soft)] pb-2 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-right text-[var(--color-ink-2)] font-medium">{v}</dd>
    </div>
  );
}
