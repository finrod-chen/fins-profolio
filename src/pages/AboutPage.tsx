import { Badge } from "@/components/arc/badge/badge";
import { CopyButton } from "@/components/arc/copy-button/copy-button";
import { PageIntro } from "@/components/PageIntro";
import styles from "./AboutPage.module.css";

/** Career, oldest first: a résumé reads forward, not newest first. */
const career = [
  {
    year: "2012",
    role: "製程工程師",
    place: "光麗生醫",
    note: "脂肪與臍帶間質幹細胞製程，建置 ISO 文件系統。",
  },
  {
    year: "2014",
    role: "副研究員",
    place: "光麗生醫",
    note: "漸凍症恩慈治療，從臨床研究一路負責到細胞放行。",
  },
  {
    year: "2018",
    role: "生產主任",
    place: "光麗生醫",
    note: "免疫殺手細胞製程開發，加上特管辦法專案管理。",
  },
  {
    year: "2020",
    role: "資訊管理人",
    place: "喜躍生醫",
    note: "公司內部資安、進銷存系統與企業內部服務。",
  },
  {
    year: "2022",
    role: "研發主任",
    place: "喜躍生醫",
    note: "協調各研發專案，負責特管辦法案件的完整流程。",
  },
];

const facts = [
  { label: "本職", value: "研發主任 · 喜躍生醫" },
  { label: "領域", value: "細胞治療 / 再生醫療" },
  { label: "業餘", value: "網站、雲端、3D 列印、Arduino" },
  { label: "所在", value: "台灣" },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/finrodchen" },
  { label: "LinkedIn", href: "https://linkedin.com/in/finrodchen" },
  { label: "舊部落格", href: "https://astro.finrod.xyz" },
];

export function AboutPage() {
  return (
    <div className="page">
      <title>關於 · Finrod Chen</title>
      <meta
        name="description"
        content="Finrod Chen，喜躍生醫研發主任。生物工程研究所畢業後一直在細胞治療產業，業餘寫網站、玩雲端、3D 列印與 Arduino。"
      />

      <PageIntro
        title="關於"
        description="我是 Finrod Chen，喜躍生醫的研發主任。生物工程研究所畢業後一直待在細胞治療產業，從製程工程師做到生產主任、資訊管理，到現在帶研發團隊與特管辦法案件。"
        breadcrumbs={[{ label: "作品", href: "/" }, { label: "關於" }]}
        meta={["2012 年至今", "台灣"]}
      >
        <div className={styles.tags}>
          <Badge tone="info">細胞治療</Badge>
          <Badge tone="neutral">生物工程</Badge>
          <Badge tone="neutral">品管與法規</Badge>
          <Badge tone="neutral">side project</Badge>
        </div>
      </PageIntro>

      <div className={styles.columns}>
        <div>
          <div className="prose">
            <p>
              白天大部分時間都在跟 SOP、放行報告和品質系統打交道。每一個計畫背後都是一位病人，
              所以沒有「大概可以」這種選項。
            </p>
            <p>
              寫網站、做 3D 列印、玩 Arduino 是另一回事：沒人審查、可以失敗、可以隨便亂改。
              這個網站收的就是那些東西，多半是工作之餘的實驗，不一定嚴謹，
              但每個都是為了一個很具體的理由而生。
            </p>
            <p>
              想聊些什麼的話，技術的、做東西的、細胞治療的，或純粹好奇的，寫信給我就好。
            </p>
          </div>

          <div className={styles.contact}>
            <a className={styles.email} href="mailto:me@finrod.xyz">
              me@finrod.xyz
            </a>
            <CopyButton value="me@finrod.xyz" label="複製 Email" variant="outline" />
          </div>
        </div>

        <aside className={styles.side} aria-labelledby="about-facts">
          <h2 id="about-facts" className={styles.sideHeading}>
            基本資料
          </h2>
          <dl className={styles.group}>
            {facts.map((fact) => (
              <div key={fact.label} className={styles.row}>
                <dt className={styles.rowLabel}>{fact.label}</dt>
                <dd className={styles.rowValue}>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className={styles.sideHeading}>其它連結</h2>
          <ul className={styles.linkList}>
            {elsewhere.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className={styles.career} aria-labelledby="about-career">
        <h2 id="about-career" className={styles.careerHeading}>
          工作經歷
        </h2>
        <ol className={styles.group}>
          {career.map((item) => (
            <li key={item.year} className={styles.careerRow}>
              <span className={styles.careerYear}>{item.year}</span>
              <span className={styles.careerBody}>
                <span className={styles.careerRole}>
                  {item.role}
                  <span className={styles.careerPlace}> · {item.place}</span>
                </span>
                <span className={styles.careerNote}>{item.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
