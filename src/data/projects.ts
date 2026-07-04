import type { Project } from "@/types";

/**
 * Placeholder data — replace with real projects later.
 * Each entry intentionally uses lorem-style fill so the layout
 * is easy to evaluate without committing to real content.
 */
export const projects: Project[] = [
  {
    id: "calcnest",
    title: "算算匯",
    tagline: "「算出智慧, 匯聚便利」— 日常與專業計算工具的一站整合。",
    description:
      "CalcNest 的主站, 收錄多種實用計算工具 — 從日常計算、單位換算到專業運算, 一站搞定所有計算需求。強調跨平台、無障礙 (WCAG), 全部本地運算保護隱私, 速度與準確度優先。",
    url: "https://calcnest.tw",
    year: "2025",
    role: "Design + Build",
    stack: ["Next.js", "WCAG", "PWA"],
    category: "Web",
    status: "live",
    featured: true,
    notes: [
      { kind: "p", text: "算算匯的目標很簡單: 把日常會用到的計算 — 匯率、單位、BMI、房貸、稅額 — 收進同一個網址, 不要再為了一個簡單換算打開 Excel 或手機備忘錄。" },
      { kind: "p", text: "幾個核心決策: 全部運算在瀏覽器本地完成, 不送資料回 server; 表單與按鈕遵循 WCAG 2.1 AA, 鍵盤可達、螢幕閱讀器友善; 用 PWA 讓手機可以「加到主畫面」, 體感接近原生 app。" },
      { kind: "ul", items: [
        "每個工具都是獨立路由, 之後要新增不會牽動主結構",
        "計算核心用 TypeScript 寫成純函式, 確保在 server / client / 測試環境跑出相同結果",
        "字體與排版優先用戶長時間閱讀, 不用大色塊或動畫干擾",
      ]},
      { kind: "p", text: "下一步計畫: 開放第三方貢獻工具 (Markdown-based 元件), 讓同領域的人都能放上自己常用的計算。" },
    ],
  },
  {
    id: "ff14-calcnest",
    title: "艾歐澤亞助手",
    tagline: "FFXIV 玩家的小工具合輯 — 時計、掉落、查詢一把抓。",
    description:
      "掛在 calcnest.tw 子網域的 FFXIV 玩家工具集, 整合 ET / LT 時鐘、市場價格追蹤、採集定點查詢等常用功能。零登入、可離線, 為日常登入的艾歐澤亞冒險者省下切換視窗的時間。",
    url: "https://ff14-tw.xyz",
    ogImage: "https://ff14.calcnest.tw/og-image-compressed.jpg",
    year: "2026",
    role: "Build",
    stack: ["Vite", "React", "PWA"],
    category: "Tool",
    status: "live",
    featured: true,
    notes: [
      { kind: "p", text: "打 FF14 的時候切到桌面查東西很麻煩 — 開瀏覽器、等載入、找到頁面、再切回遊戲, 整套動作十秒起跳。艾歐澤亞助手把所有常用查詢做成 PWA, 點開就到位。" },
      { kind: "ul", items: [
        "ET / LT 雙時鐘, 切主機時不用再算時差",
        "市場價格追蹤, 收藏自己關注的物品",
        "採集定點收藏, 標註已經挖完的點位",
      ]},
      { kind: "p", text: "技術上走 Vite + React, PWA service worker 處理離線快取, 收藏資料存在 localStorage 讓玩家不登入也能用。下次開分頁時不用重選伺服器或重置時鐘。" },
      { kind: "quote", text: "「能一秒看到答案, 就不該花五秒找工具。」" },
    ],
  },
  {
    id: "cinema-of-taiwan",
    title: "光影紀年",
    tagline: "當膠卷成為記憶的載體 — 一座島嶼, 由影像寫成的編年史。",
    description:
      "「Cinema of an Island」, 以清領、日治、戰後、近代四個時代為軸的臺灣歷史影視作品資料庫。共收錄 129 部作品, 涵蓋 158 年光陰。強調可依時代滑動的時間軸閱讀體驗, 讓你看見「為什麼是這部片, 在這個年代」。",
    url: "https://cinema-of-taiwan.pages.dev",
    ogImage: "https://cinema-of-taiwan.pages.dev/og-image.jpg",
    year: "2026",
    role: "Design + Build",
    stack: ["Cloudflare Pages", "Astro", "Svelte"],
    category: "Editorial",
    status: "live",
    featured: true,
    notes: [
      { kind: "p", text: "電影資料庫很多, 但少有一個是「以時代為單位」閱讀的 — 大多按年份、按類型、按導演, 結果 2020 年的《消失的情人節》跟 1945 年的舞台劇平鋪在一起, 看不到時代的脈絡。" },
      { kind: "p", text: "光影紀年的設計選擇是: 把時間軸切到「清領 / 日治 / 戰後 / 近代」四個大時代, 滑動時是時代而非年份, 讓你看見「為什麼是這部片, 在這個年代」。共 129 部作品、158 年光陰。" },
      { kind: "ul", items: [
        "以 Cloudflare Pages 託管, 部署成本壓到接近零",
        "內容資料用 Markdown 撰寫, 寫新片只要加一個 .md",
        "時間軸互動用 Svelte 元件, 桌面 / 手機都流暢",
      ]},
      { kind: "p", text: "如果你覺得有片應該被收錄、或時代分類需要再調整, 站上提供修正管道, 這是個持續長大的公民檔案, 不是一次到位的封閉資料庫。" },
    ],
  },
  {
    id: "fifa2026-calcnest",
    title: "2026 國際足總世界盃賽程表",
    tagline: "48 隊 · 104 場 · 39 天 — 官方賽程正體中文版。",
    description:
      "2026 FIFA 世界盃的賽程一覽, 涵蓋小組賽、三十二強、十六強、八強、準決賽、決賽。所有時間已轉為台灣時間 (UTC+8), 並提供 Google 日曆訂閱連結, 一鍵加進自己的行事曆。",
    url: "https://fifa2026.calcnest.tw",
    ogImage: "https://fifa2026.calcnest.tw/og-image.png",
    year: "2026",
    role: "Build",
    stack: ["Vite", "Google Calendar API"],
    category: "Web",
    status: "live",
    featured: true,
    notes: [
      { kind: "p", text: "2026 FIFA 是史上第一次 48 隊、104 場的擴容賽事, 而且由美加墨三國主辦, 對台灣觀眾來說最痛的不是「看哪些比賽」, 而是「這場到底是幾點」 — 國際賽事的官方時間永遠是 UTC 或主辦國時區。" },
      { kind: "p", text: "這個站把所有時間預先換算成台灣時間 (UTC+8), 並以小組賽 / 三十二強 / 十六強 / 八強 / 準決賽 / 決賽 分頁切換, 找特定場次不用滑一百多場列表。" },
      { kind: "ul", items: [
        "Google Calendar 訂閱連結, 一鍵把所有場次加進自己的行事曆",
        "「距離開幕」倒數器, 放在首頁當釘子",
        "Ko-fi 贊助連結放在 footer, 純粹個人 side project 維運費用",
      ]},
      { kind: "p", text: "這個站純粹做給身邊想看賽事但又懶得自己轉時區的球迷, 不賣東西、不接廣告、不寫球評。資料來源是 FIFA 官方釋出的 .csv, 每場都核對過兩次, 才進到前端。" },
    ],
  },
  {
    id: "kmt-facts",
    title: "中國國民黨弊案紀錄",
    tagline: "事實查核檔案 — 公開監督, 逐筆比對判決書與新聞報導。",
    description:
      "以流傳網路的「國民黨貪汙一覽表」為底本, 逐筆比對中央社、自由時報、聯合新聞網、中時、公視新聞、維基百科等公開資料, 對事件陳述進行查核與更正。以「全部 / 判刑定讞 / 審理中 / 無判決定讞 / 指控待查核」分類, 1990 年代舊案因無電子化新聞存檔標注「查核資料不足」。公民研究整理, 不代表任何政治立場, 歡迎提供更正補充。",
    url: "https://kmt-facts.pages.dev",
    ogImage: "https://kmt-facts.pages.dev/og-image.png",
    year: "2026",
    role: "Editorial + Build",
    stack: ["Cloudflare Pages", "Astro"],
    category: "Editorial",
    status: "live",
    featured: true,
    notes: [
      { kind: "p", text: "這份「國民黨貪汙一覽表」在網路流傳多年, 但內容良莠不齊 — 有些是事實、有些是段子、有些年代久遠查無新聞存檔。直接轉傳容易誤導, 不傳又可惜這份整理本身。" },
      { kind: "p", text: "這個站把每一筆拉出來, 逐筆比對中央社、自由、聯合、中時、公視、維基百科等公開資料, 然後依「判刑定讞 / 審理中 / 無判決定讞 / 指控待查核」四類標記, 1990 年代無電子化新聞存檔的舊案就誠實寫「查核資料不足」, 而不是硬補一個來源。" },
      { kind: "ul", items: [
        "立場聲明: 公民研究整理, 不代表任何政治立場",
        "歡迎提供更正補充, 站上有明確的提交流程",
        "所有引用都附原始連結, 任何人都能自己再查一次",
      ]},
      { kind: "p", text: "這個站的精神不是「給結論」, 而是「給讀者足夠的原料, 讓你自己判斷」。能查到的就標查到, 查不到的就明說查不到, 這件事本身在當今的資訊環境裡已經不容易。" },
    ],
  },
  {
    id: "long-cat",
    title: "Long Cat",
    tagline: "拉伸到不成比例的貓 — 3D 列印的桌面寵物, 筆架、筷架, 看你高興。",
    description:
      "Long Cat 是迷因界知名的「無限拉長貓」, 這個 3D 列印版本把它立體化, 做成可立在桌面的長形擺飾。長到不科學的身體配上短手短腳, 怎麼看都很有事。",
    url: "https://www.tinkercad.com/things/iCBf93WKJvC-long-cat",
    year: "2024",
    role: "Design + 3D Print",
    stack: ["Tinkercad", "PLA", "FDM"],
    category: "Design",
    status: "live",
    screenshot: "/screenshots/long-cat.png",
    notes: [
      { kind: "p", text: "Long Cat 是 2000 年代後期日本 2ch 迷因圈的代表作 — 一隻被刻意拉長到不成比例的貓, 「長い」跟「猫」拆開各自萌, 合體之後反而有一種莫名的和諧。把這個概念做成桌上立體擺飾, 視覺效果比預期好, 同事看到都會笑出來。" },
      { kind: "p", text: "設計上有三件事特別處理: 身體做得夠長才有迷因感, 但要避免列印時頭部因重心不穩倒下, 所以肚子底部有內凹的配重槽; 眼睛做成圓盤外凸 (不挖洞), 列印不需要支撐, 失敗率低; 短手短腳刻意維持低多邊形手感, 不追求細節, 整體才有「Q 版迷因」的氣場。" },
      { kind: "ul", items: [
        "筆架 — 身體平放, 短腿剛好當筆擋, 4 隻腳的凹槽各卡一支筆",
        "筷架 — 一對擺在筷筒口, 橫躺當筷枕",
        "名片座 — 頭部翹起當支點, 名片靠著身體立著不倒",
        "純擺飾 — 立著當桌面公仔, 每天上班看到心情好",
        "貓奴禮物 — 印一隻送朋友, 包裝加個小紙箱就是完整迷因",
      ]},
      { kind: "p", text: "印刷設定: PLA / 0.2mm 層高 / 15% 填充 (沒有結構負載, 輕量化優先) / 無支撐。整件一體列印, 不用組裝, 從切片到脫模大約 4 小時。列印方向讓身體平躺、腳朝上, 這樣支撐面積最大, 不需要任何樹狀支撐。" },
      { kind: "quote", text: "「長いだけじゃない。役に立つ。」— 不只是長, 還能用。" },
    ],
  },
  {
    id: "htit-wb32c-v3",
    title: "HTIT-WB32C (V3) 外殼設計",
    tagline: "Heltec V3 LoRa 開發板的分件式 3D 列印外殼, 為 Meshtastic 節點設計。",
    description:
      "為 HTIT-WB32C (V3) 開發板設計的 3D 列印外殼, 共 4 件式: 前板 / 底板 / 背板 / 板架。為了在戶外架設容易, 採用可拆式設計, 方便更換天線與電池。",
    url: "https://www.tinkercad.com/things/9zt0YS0shMW-heltec-v3-frontplate",
    year: "2024",
    role: "Design + 3D Print",
    stack: ["Tinkercad", "PLA", "FDM"],
    category: "Design",
    status: "live",
    screenshot: "/screenshots/htit-frontplate.png",
    gallery: [
      "/screenshots/htit-frontplate.png",
      "/screenshots/htit-bottom.png",
      "/screenshots/htit-backplate.png",
      "/screenshots/htit-boardholder.png",
    ],
    notes: [
      { kind: "p", text: "Heltec WiFi LoRa 32 (V3) 是 Meshtastic 社群的主力開發板之一, 但原廠出貨時不附外殼, 裸板的天線接頭與 USB-C 在戶外架設時容易受損或進水。市面上能找到的列印外殼要不是一體式難拆, 就是夾具設計太緊, 換天線得整顆拔下來。" },
      { kind: "p", text: "這個外殼刻意拆成 4 件: 前板 (露出 OLED 與按鈕) / 底板 (固定 PCB) / 背板 (留天線孔與走線槽) / 板架 (嵌入軌道讓整顆外殼能滑入 / 抽出)。需要更換天線時, 鬆開 4 顆螺絲就能打開背板, 主體不動。" },
      { kind: "ul", items: [
        "前板 — 露出 OLED 螢幕、PRG 與 RST 按鈕, 設計導角方便嵌入",
        "底板 — 鎖 PCB 鎖點, 留 USB-C 與 GPIO 開孔",
        "背板 — SMA 天線孔位 + 走線槽, 4 顆 M2 螺絲固定",
        "板架 — 嵌入軌道, 讓前 / 底 / 背三件可沿軌道滑動組裝",
      ]},
      { kind: "ul", items: [
        "前板 Tinkercad: https://www.tinkercad.com/things/9zt0YS0shMW-heltec-v3-frontplate",
        "底板 Tinkercad: https://www.tinkercad.com/things/jKZFlDjljza-heltec-v3-botton",
        "背板 Tinkercad: https://www.tinkercad.com/things/c5Hhtnfti4g-heltec-v3-backplate",
        "板架 Tinkercad: https://www.tinkercad.com/things/5HCEkCDXaKL-heltec-v3-boardholder",
      ]},
      { kind: "p", text: "印刷設定: PLA / 0.2mm 層高 / 20% 填充 / 無支撐 (刻意避開需要支撐的懸垂)。前板因為有 OLED 開窗, 列印方向要讓窗框朝下, 確保開口整齊不翹邊。背板 SMA 孔位公差抓 +0.2mm, 讓天線接頭可以直插不用硬轉。" },
      { kind: "p", text: "設計取捨: 沒做防水, 因為 LoRa 32 V3 本身也沒有防水設計, 為外殼單獨做防水是過度工程。實際戶外架設是搭配防水袋, 外殼負責「防呆 + 美觀 + 散熱」三件事就夠。" },
    ],
  },
  {
    id: "cat-laser-tower",
    title: "雷射逗貓塔",
    tagline: "隨機亂動的雷射光點 — 自動逗貓, 不用手。",
    description:
      "用 Arduino UNO 加兩個 SG90 servo 做的自動逗貓玩具。兩個 servo 分別控制左右與上下, 雷射模組固定在末端, 每 2-5 秒隨機抽一個角度, 雷射光點在牆上或地板上亂跑, 讓貓追蹤捕捉。",
    url: "https://www.tinkercad.com/things/3bbDwoGDltZ-cat-laser-tower?sharecode=ZHVHaFGHaLJ0w8RrscNEKkmBNvlvGYpsjin6tOlP6eQ",
    year: "2026",
    role: "Design + Build",
    stack: ["Tinkercad", "Arduino UNO", "SG90", "5V Laser Module", "Slide Switch"],
    category: "Experiment",
    status: "live",
    featured: true,
    screenshot: "/screenshots/cat-laser-layout.png",
    gallery: [
      "/screenshots/cat-laser-SG90-mount.webp",
      "/screenshots/cat-laser-5V-laser-module.webp",
    ],
    notes: [
      { kind: "p", text: "養貓之後最常做的事是拿雷射筆逗她 — 但人總不能一直蹲在地上揮, 久了手腕也痠。把「隨機亂動」這件事交給 Arduino, 讓光點自己跑, 人只需要坐著看貓出糗。" },
      { kind: "p", text: "機構很簡單: 兩個 SG90 疊成 2 軸雲台, base 負責左右 (0-180° 全範圍), shoulder 負責上下 (40-140° 安全範圍, 避免打到桌面或機構本身)。雷射模組用束帶固定在最上層 servo 的 horn 上, 光點跟著手臂走。" },
      { kind: "p", text: "動作策略刻意設計成「貓能追上但無法預測」: 每個 cycle 先動左右 → 停 300ms 觀察窗口 → 再動上下 → 停 300ms → 下一輪。間隔時間在 2-5 秒內均勻隨機, 每次 X 軸動作至少跳 20°, 避免貓看到光點「原地抖動」就失去興趣。" },
      { kind: "ul", items: [
        "6V AA 電池盒獨立供電給兩個 servo, 與 UNO 共 GND — servo 抖動電流會拖累 UNO 邏輯",
        "5V 雷射模組從 UNO 5V 取電, 透過 LED 限流",
        "滑動開關取代按鈕 — 保持性、一眼能看出 ON/OFF、不需要 debounce",
        "Serial Monitor 印出每次狀態與角度, 除錯時一眼看出哪個 step 卡住",
      ]},
      { kind: "quote", text: "「能讓貓忙 30 分鐘的東西, 就值得花一個下午做。」" },
      { kind: "p", text: "下一步考慮換成 ESP32, 內建 BLE 之後可以用手機 App 控制節奏; 或加 PIR 感測器, 貓靠近才啟動、離開自動暫停, 更省電也更安靜 (貓不在的時候機器也不會自己跑)。" },
    ],
  },
  {
    id: "name-keyring",
    title: "Name Keyring",
    tagline: "把你的名字刻上吊牌 — Tinkercad 上 5 分鐘做好的 3D 列印名牌。",
    description:
      "一個最基礎的 3D 列印練習: 直立長方形吊牌、上方挖一個掛繩孔、平面用浮雕字刻上「Name」字樣, 紅色 PLA 一體列印, 不用支撐、零組裝, 印完穿條繩就是鑰匙圈或背包吊飾。",
    url: "https://www.tinkercad.com/things/0KKi3VKiFQg-name-keyring?sharecode=fJEYJPD-rTz90ob0HPTHEMytUCGxQ_0NOPCGOzkoNjA",
    year: "2024",
    role: "Design + 3D Print",
    stack: ["Tinkercad", "PLA", "FDM"],
    category: "Design",
    status: "live",
    screenshot: "/screenshots/name-keyring.png",
    notes: [
      { kind: "p", text: "這是 3D 列印初學者最常見的「Hello World」延伸 — 不再只印一個方塊, 而是把自己的名字刻上去。直立式吊牌比橫式多一點個性, 掛在背包側邊時字是直的, 比較醒目。" },
      { kind: "p", text: "設計上有兩個重點: 文字用 Tinkercad 內建的 Text 物件內嵌 1.5mm, 做成「凹刻」而不是「凸字」, 列印時不需要支撐, 而且觸摸時指尖會感覺到字的輪廓; 掛繩孔直徑 4mm, 配 3mm 傘繩剛好, 也不會因為孔太大讓吊牌頭部顯得單薄。" },
      { kind: "ul", items: [
        "整件一體列印, 印完直接穿繩, 零組裝",
        "直立式長方形, 字在吊牌中央, 閱讀方向自然",
        "掛繩孔避開字的筆畫, 結構不會被切到",
        "可以印一整組不同人的名字, 送人當小禮物",
      ]},
      { kind: "p", text: "印刷設定: PLA / 0.2mm 層高 / 15% 填充 / 無支撐 / 列印方向讓吊牌平躺、文字面朝上, 字凹刻的細節才不會被支撐破壞。整件大約 25-30 分鐘就能印完, 切片完直接把 Tinkercad 連結附給切片軟體即可。" },
      { kind: "quote", text: "「第一件有自己名字的 3D 列印品, 之後就停不下來了。」" },
    ],
  },
  {
    id: "fins-profolio",
    title: "Fins Portfolio",
    tagline: "這個作品集本體 — 自製模板與部署流程。",
    description:
      "以 Vite + React + Tailwind 打造的作品集框架, 響應式排版、淺色工業風, 後續所有作品都會放上來。設計目標是在桌機與行動裝置上都能有乾淨、可閱讀的呈現。",
    year: "2026",
    role: "Design + Build",
    stack: ["Vite", "React", "TypeScript", "Tailwind"],
    category: "Web",
    status: "draft",
    notes: [
      { kind: "p", text: "這個作品集本身也算一個 side project — 每次要介紹自己的東西就要重新整理一次, 索性寫成可重複使用的模板。" },
      { kind: "p", text: "技術選擇刻意走輕: Vite 開 dev server 不到一秒、HMR 反應即時, 改字看效果不用等。Tailwind v4 + CSS variables 做設計 token, 換色或調字距一處改全站生效。" },
      { kind: "ul", items: [
        "響應式優先: 桌機 1440 寬展開雙欄 grid, 手機 390 寬自動堆疊成單欄",
        "工業風設計: 細 hairline、等寬字標籤、spec sheet 風的編號區段",
        "無障礙: focus ring 顯眼、跳轉 anchor 預留 scroll-margin",
      ]},
      { kind: "p", text: "目前這份模板用在自己這個作品集, 之後若有人想 fork, README 寫好 build / deploy / 加新作品的流程 — 從 `projects.ts` 加一筆, push 上去就上線, 不需要碰框架設定。" },
    ],
  },
];

/** Helper to lookup a project by id */
export function findProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Categories — keep order stable for filter UI */
export const categories: Project["category"][] = [
  "Web",
  "Tool",
  "Editorial",
  "Brand",
  "Design",
  "Experiment",
];
