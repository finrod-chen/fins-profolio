import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "@/components/ScrambleText";
import styles from "./ProcessSteps.module.css";

interface Step {
  title: string;
  body: string;
  /** What a terminal might show at this step. Flavor, not a real log. */
  log: string[];
}

const steps: Step[] = [
  {
    title: "遇到一個具體的麻煩",
    body: "防災包放了三年沒檢查、證件照要跑相館。每個作品都從一個說得出來的不方便開始。",
    log: ["> 問題：防災包裡的東西過期了沒？", "> 範圍：只做檢點，不做商城", "> 使用者：我自己，和家人"],
  },
  {
    title: "做出最小能用的版本",
    body: "一個晚上寫得完的範圍先上線。單檔 HTML 也沒關係，能用比好看重要。",
    log: ["$ touch index.html", "$ git add -A", '$ git commit -m "第一個能用的版本"', "[main 1a2b3c4] 1 file changed"],
  },
  {
    title: "部署到 Cloudflare",
    body: "推到 main，GitHub Actions 建置後上傳，幾分鐘後就在網路上，不用管伺服器。",
    log: ["$ git push origin main", "  lint ............ ok", "  build ........... ok", "  deploy .......... ok", "→ 已上線"],
  },
  {
    title: "自己天天用",
    body: "上線之後先當第一個使用者。卡住的地方、手機上點不到的按鈕，都記下來。",
    log: ["note: 手機上的按鈕太小", "note: 列印時日期被切掉", "note: 想要一鍵分享清單"],
  },
  {
    title: "改到順手為止",
    body: "一次修一點，直到不會再想起它，才算做完。然後換下一個麻煩。",
    log: ["$ git log --oneline | wc -l", "  128", "> 狀態：順手了", "> 下一個：？"],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * How a side project gets made, as five numbered steps.
 *
 * On wide screens the steps scroll past a pinned terminal panel, and the step
 * in the middle of the viewport lights up and fills the panel. On narrow
 * screens there is no pinned panel: each step carries its own lines. The
 * first render always shows step 01, so the prerendered page and the first
 * client render agree.
 */
export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // A thin band across the middle of the viewport: whichever step crosses it is current.
      { rootMargin: "-48% 0px -48% 0px" },
    );
    for (const node of items.current) if (node) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-labelledby="process-heading">
      <div className={styles.intro}>
        <p className="label">Process</p>
        <h2 id="process-heading" className={styles.heading}>
          <ScrambleText lines={["從一個麻煩，", "到天天在用。"]} onView />
        </h2>
        <p className={styles.lede}>這裡的作品，大多走過同樣的五步。</p>
      </div>

      <div className={styles.layout}>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li
              key={step.title}
              ref={(node) => {
                items.current[index] = node;
              }}
              data-index={index}
              data-active={index === active}
              className={styles.step}
            >
              <span className={`mono ${styles.number}`}>{pad(index + 1)}</span>
              <div className={styles.stepText}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <pre className={styles.inlineLog} aria-hidden="true">
                  {step.log.join("\n")}
                </pre>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.panel} aria-hidden="true">
          <div className={styles.panelHead}>
            <span>~/finrod</span>
            <span className={styles.counter}>
              {pad(active + 1)} / {pad(steps.length)}
            </span>
          </div>
          <pre key={active} className={styles.log}>
            {steps[active].log.join("\n")}
          </pre>
          <div className={styles.panelFoot}>
            <span className={styles.led} />
            <span>{steps[active].title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
