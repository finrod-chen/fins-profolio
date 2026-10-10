# FIN / Portfolio

> 個人作品集 web app — 工業感設計、淺色簡潔、手機優先瀏覽友善。
> 為「獨立網站」這類作品量身打造, 標題 / 簡介 / 截圖 / 連結等欄位都預留好。

---

## 啟動

```bash
# 1. 安裝依賴
npm install

# 2. 開發伺服器
npm run dev
# → http://localhost:5173

# 3. 生產建置
npm run build

# 4. 預覽生產建置
npm run preview
```

Node ≥ 20。

---

## 檔案結構

```
src/
├── main.tsx                 # 入口（Router + ArcProvider）
├── App.tsx                  # 路由 + 版面骨架
├── types.ts                 # Project 型別定義
│
├── components/arc/          # ★ Arc 元件庫（shadcn CLI 安裝，不要手改）
│   ├── foundation.css       #   設計 token：顏色、間距、圓角、字級、動態
│   └── blocks/              #   site-header / site-footer / hero-section / cta-section
│
├── components/              # 本站自己的組裝層
│   ├── SiteNav.tsx          #   Arc site-header 接上 React Router
│   ├── SiteFoot.tsx         #   Arc site-footer + 深色模式開關
│   ├── PageIntro.tsx        #   內頁抬頭（麵包屑 + 標題 + 說明）
│   ├── WorkList.tsx         #   作品列表 + 分類篩選
│   ├── WorkCover.tsx        #   作品預覽圖（截圖 → OG 圖 → 文字卡）
│   └── Markdown.tsx         #   文章內文（含 Arc code-block）
│
├── lib/
│   ├── arc-link.tsx         # Arc 內部連結改走 React Router
│   ├── theme.ts             # 淺色 / 深色切換
│   └── format.ts            # 日期格式（固定 zh-TW + Asia/Taipei）
│
├── styles/global.css        # reset + 字型接線 + 頁面容器 + .prose
├── shims/next-image.tsx     # Arc block 用到的 next/image 替身
│
├── data/
│   ├── projects.ts          # ★ 作品資料
│   └── blog.ts              # 文章載入（讀 src/content/**/*.md）
│
└── pages/                   # 首頁 / 關於 / 文章列表 / 文章內頁 / 作品內頁 / 好物
```

---

## Arc 元件庫

介面全部建立在 [Arc](https://uiarc.dev) 上。新增元件用 shadcn CLI：

```bash
npx shadcn@latest add @uiarc/dialog
```

`components.json` 已註冊 `@uiarc` registry，檔案會裝進 `src/components/arc/`。
這個資料夾是外來程式碼，CLI 重裝會覆寫，所以 **不要直接改裡面的檔案**，
也已經在 `eslint.config.js` 的 ignore 清單中。需要客製時在外面包一層。

幾條跟著 Arc 的規則：顏色只用語意 token（`--foreground`、`--accent`⋯）、
字重只用 400 / 500、不用全大寫標籤、不用裝飾性漸層。

---

## 新增 / 修改作品

打開 `src/data/projects.ts`, 編輯 `projects` 陣列:

```ts
{
  id: "my-new-site",            // 路由會變成 /work/my-new-site
  title: "My New Site",
  tagline: "一句話的副標",
  description: "詳細介紹⋯",
  url: "https://example.com",   // 選填
  repoUrl: "https://github.com/...", // 選填
  year: "2025",
  role: "Design + Build",
  stack: ["Next.js", "Tailwind"],
  category: "Web",              // Web | Tool | Editorial | Brand | Experiment
  status: "live",               // live | draft | archived
  featured: true,               // 是否出現在首頁 Featured 區
  screenshot: "/shots/my-new.png", // 放 public/ 目錄下, 沒填會用 ogImage 或文字卡
}
```

---

## 設計系統

- **Token**：全部來自 `src/components/arc/foundation.css`
- **字體**：Geist（標題） + Inter（內文） + Noto Sans TC（中文） + JetBrains Mono（程式碼）
- **深色模式**：`<html data-theme="dark">`，`index.html` 的 inline script 在首次繪製前就決定
- **強調色**：`<html data-accent="blue">`，可換成 neutral / violet / green / amber / orange / coral / rose

---

## 替換成真實截圖

把圖片放到 `public/screenshots/` 然後在 `Project.screenshot` 引用路徑, 例如:

```ts
screenshot: "/screenshots/aquaflow.png"
```

若留空, `WorkCover` 會依序退回 `ogImage`、再退回一張寫著作品名稱的文字卡, 永遠不會出現空白。

---

## 部署

`npm run build` 會輸出 `dist/`, 任何靜態主機都吃:

- **Vercel / Netlify / Cloudflare Pages**: 直接連結 repo, build command = `npm run build`, output = `dist`
- **GitHub Pages**: 需把 `vite.config.ts` 的 `base` 設成 repo 名
