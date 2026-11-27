# fins-profolio

Vite + React + React Router 的個人作品集，介面建立在 [Arc](https://uiarc.dev) 上。
部署在 Cloudflare Pages 的 Direct Upload 專案 `finrod-portfolio`。這個專案沒有接 Git，
所以是 `.github/workflows/deploy.yml` 在 push 到 main 時 build 並用 wrangler 上傳 `dist/`；
本機後路是 `npm run deploy`。

## 專案慣例

- `src/components/arc/` 是 shadcn CLI 裝進來的外來程式碼：**不要直接編輯**，
  CLI 重裝會覆寫。要客製就在外面包一層（例如 `SiteNav.tsx` 包 `site-header`）。
  這個資料夾已排除在 eslint 之外。
- 新增 Arc 元件：`npx shadcn@latest add @uiarc/<id>`（`components.json` 已註冊 registry）。
- 版面用 CSS Modules，顏色與尺寸用 token（`src/styles/global.css` 覆寫 Arc 的值）。專案沒有 Tailwind。
- CSS Modules 的 class 名稱固定為 `<檔名>__<class>`（`vite.config.ts`），不帶雜湊。
  `src/styles/theme.css` 靠這個在不改 Arc 原始碼的前提下重新上色 Arc 元件，選擇器以 `:root` 開頭。
  所以 `*.module.css` 的檔名在 `src` 裡必須唯一。
- Arc 的 block 是為 Next.js 寫的，`next/image` 由 `src/shims/next-image.tsx` 接手
  （在 `vite.config.ts` 與 `tsconfig.app.json` 設 alias）。
- 文章來源是 `src/content/**/*.md`，由 `src/data/blog.ts` 在 build 時讀進來。
- 正式網址是 `https://finrod.xyz`（`src/lib/site.ts`）。每個頁面用 `<Seo>`（`src/components/Seo.tsx`）
  給 title、description、canonical 與 og 標籤，不要寫回 `index.html`。
- Logo 的唯一來源是 `finrod-logo-pack/`（原始 PNG 和描好的 SVG，填色用 `currentColor`）。
  `BrandMark.tsx` 以 `?raw` 讀 SVG；`scripts/generate-og.mjs` 也讀它們產生 `public/og-image.png`
  （換 logo 後要重跑）；`public/logos/favicon.svg` 要手動更新。
- 像素字：英文用 Geist Pixel Square（`public/fonts`），中文用縫合像素字型（Fusion Pixel 12px TC，
  `@fontsource` 套件）。build 時 `scripts/prerender.mjs` 收集所有 h1、h2 與 `data-pixel` 元素的字，
  裁成 `dist/fonts/pixel-tc.woff2`。`public/fonts/pixel-tc.woff2` 只是開發時的備用檔。
- `npm run build` 會預先渲染：`src/entry-server.tsx` 列出所有路由，`scripts/prerender.mjs`
  在 Node 裡渲染成 `dist/<path>.html`，並產生 `sitemap.xml`、`robots.txt`。新增路由要記得加進
  `routes`。元件的第一次 render 必須能在 Node 跑（不碰 `window`），否則 build 會失敗。

---

# Design rules (2026-11 改版，參考 giga.ai)

這份取代原本的 Arc 設計禁令。Arc 仍是元件庫，但外觀由本專案決定。

## 風格

1. 只有深色。背景純黑，`index.html` 固定 `data-theme="dark"`，沒有主題切換。
2. 主色是橘色 `--accent`，只用在主要動作、目前位置、編號與狀態小點。一個畫面一個實心橘色按鈕。
3. 大標題（h1、h2，約 36px 以上）用像素字 `--font-display`；內文用 Geist `--font-body`；
   小標、編號、按鈕文字用 Geist Mono `--font-mono`。像素字在 24px 以下會糊，小字不要用。
4. 區塊標題上方可以放等寬小標：`<p className="label">Works</p>`，英文大寫、前面有橘色小方塊。
5. 細線系統：1px `--border` 細框、小圓角（`--radius-*` 已調小）、全頁背景的直線欄格（`.gridlines`）。
6. 編號用兩位數等寬字（01、02），步驟類內容可以隨捲動亮起（參考 `ProcessSteps`）。
7. 漸層、光暈不是禁止，但目前不用；要加請先確認效果。
8. 動畫可以多，但都是一次性或由使用者觸發：
   - `ScrambleText`：像素標題從亂碼定格（開頁或 `onView` 捲到時跑一次）。亂碼只取自同一段文字的字，
     才不會超出裁過的像素字型。
   - `Reveal`：區塊捲進畫面時浮入一次（`index.html` 加的 `js` class 決定要不要先藏起來）。
   - `WorkDeck`：作品的橫向疊卡，寬度切換動畫；收起的卡片是 `inert`，但連結都在 HTML 裡。
   - `StackTicker`：唯一的循環動畫，滑鼠移上去會暫停。

## 一定要做

1. 首次 render 要能在 Node 跑（不碰 `window`、`localStorage`、`Date.now()`、`Math.random()`），
   而且和預渲染的 HTML 一致；只跟使用者偏好有關的差異（例如減少動態）用 CSS media query 處理。
2. 每個動畫都有 `prefers-reduced-motion` 的版本；動畫只動 transform 與 opacity。
3. 觸控目標至少 44px；檢查 390、768、1024、1440px，不能有橫向捲動。
4. 鍵盤焦點用 `foundation.css` 的 `:focus-visible`，不要自己做 focus ring。
5. 文案不用破折號（em dash），改用句號、逗號、冒號或括號。
