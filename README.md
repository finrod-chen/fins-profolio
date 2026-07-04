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
├── main.tsx                 # 入口（含 React Router）
├── App.tsx                  # 路由 + 版面
├── index.css                # 設計系統（Tailwind v4 + 自訂 tokens）
├── types.ts                 # Project 型別定義
│
├── data/
│   └── projects.ts          # ★ 作品資料（標題/簡介/截圖/連結⋯）
│
├── components/
│   ├── Header.tsx           # 頂部導覽（桌機有 status bar）
│   ├── Footer.tsx           # 底部資訊
│   ├── SectionLabel.tsx     # 區塊編號標籤
│   ├── Marquee.tsx          # 工業感跑馬燈
│   ├── ProjectCard.tsx      # 作品卡片
│   ├── ProjectGrid.tsx      # 作品 grid + 分類篩選
│   ├── ProjectPage.tsx      # 作品詳情（hero + spec sheet + 內文）
│   └── SitePlaceholder.tsx  # 沒截圖時的工業風 SVG 佔位圖
│
└── pages/
    ├── HomePage.tsx         # Hero / About / Featured / Works / CTA
    ├── AboutPage.tsx        # 關於頁 + 經歷時間軸
    └── WorkDetailPage.tsx   # 作品詳情路由
```

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
  screenshot: "/shots/my-new.png", // 放 public/ 目錄下, 沒填會用 SVG 佔位
}
```

---

## 設計系統

- **色票**：`#FAFAF9` (paper) · `#0A0A0A` (ink) · `#FF4D00` (accent)
- **字體**：Inter（主） + JetBrains Mono（編號 / UPPERCASE 標籤）
- **細節**：1px hairline、極少圓角、UPPERCASE + letter-spacing、stamp / spec sheet 元素

所有 token 集中在 `src/index.css` 的 `@theme {}` 區塊, 改一處全站生效。

---

## 替換成真實截圖

把圖片放到 `public/screenshots/` 然後在 `Project.screenshot` 引用路徑, 例如:

```ts
screenshot: "/screenshots/aquaflow.png"
```

若留空, `SitePlaceholder` 會自動生成一張藍圖風 SVG, 永遠不會出現空白卡片。

---

## 部署

`npm run build` 會輸出 `dist/`, 任何靜態主機都吃:

- **Vercel / Netlify / Cloudflare Pages**: 直接連結 repo, build command = `npm run build`, output = `dist`
- **GitHub Pages**: 需把 `vite.config.ts` 的 `base` 設成 repo 名
