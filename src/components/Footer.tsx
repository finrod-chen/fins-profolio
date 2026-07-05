import { Link } from "react-router-dom";

/**
 * Footer — 三列平實 (個人 / 網站 / 其它)，加上底部 marquee。
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper-2)]">
      <div className="px-5 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 grid place-items-center bg-[var(--color-accent)] text-white">
                <span className="font-mono text-[11px] font-bold leading-none">FR</span>
              </div>
              <div className="font-serif text-[20px] font-semibold leading-tight text-[var(--color-ink)]">
                Finrod Chen
              </div>
            </div>
            <p className="mt-4 text-[14px] text-[var(--color-ink-2)] leading-relaxed max-w-md">
              個人作品集 — 網站、雲端、3D 列印、Arduino，以及細胞治療的種種紀錄。<br />
              <span className="text-[var(--color-mute)]">平常 9–17 點在研究室</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="chip is-blue">個人</span>
              <span className="chip is-coral">細胞治療</span>
              <span className="chip is-amber">side project</span>
              <span className="chip is-out">2026</span>
            </div>
            <a
              href="mailto:me@finrod.xyz"
              className="mt-5 inline-block text-[14px] text-[var(--color-accent-hover)] font-medium link-line"
            >
              me@finrod.xyz →
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">網站</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link to="/" className="link-line hover:text-[var(--color-accent)]">作品</Link></li>
              <li><Link to="/blog" className="link-line hover:text-[var(--color-accent)]">文章</Link></li>
              <li><Link to="/about" className="link-line hover:text-[var(--color-accent)]">關於</Link></li>
              <li><Link to="/recommends" className="link-line hover:text-[var(--color-accent)]">好物</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-4">其它</div>
            <ul className="space-y-2 text-[14px]">
              <li><a href="https://github.com/finrodchen" target="_blank" rel="noreferrer" className="link-line hover:text-[var(--color-accent)]">GitHub ↗</a></li>
              <li><a href="https://linkedin.com/in/finrodchen" target="_blank" rel="noreferrer" className="link-line hover:text-[var(--color-accent)]">LinkedIn ↗</a></li>
              <li><a href="https://astro.finrod.xyz" target="_blank" rel="noreferrer" className="link-line hover:text-[var(--color-accent)]">部落格 ↗</a></li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {["React", "Vite", "Tailwind", "Cloudflare", "Arduino"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-line-soft)]">
        <div className="px-5 sm:px-8 lg:px-12 h-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] text-[var(--color-mute)]">
          <div>© {new Date().getFullYear()} Finrod Chen</div>
          <div>本站以 Vite + React + Tailwind 構建</div>
        </div>
      </div>
    </footer>
  );
}
