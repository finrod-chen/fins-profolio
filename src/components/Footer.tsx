import { Link } from "react-router-dom";

/**
 * Footer — minimal document-style three-column footer.
 * No colophon, no manifesto. Just links, contact, and credit.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper-2)]">
      <div className="px-5 sm:px-8 lg:px-12 py-12 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-5">
            <div className="font-serif text-[20px] font-semibold leading-tight text-[var(--color-ink)]">
              Finrod Chen
            </div>
            <p className="mt-2 text-[13px] text-[var(--color-mute)] leading-relaxed">
              個人作品集 — 網站作品彙整、技術雜談、偶爾的 3D 列印與 Arduino 紀錄。
            </p>
            <a
              href="mailto:me@finrod.xyz"
              className="mt-4 inline-block text-[14px] text-[var(--color-accent-hover)] link-line"
            >
              me@finrod.xyz
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-3">網站</div>
            <ul className="space-y-1.5 text-[14px]">
              <li><Link to="/" className="link-line">作品</Link></li>
              <li><Link to="/blog" className="link-line">文章</Link></li>
              <li><Link to="/about" className="link-line">關於</Link></li>
              <li><Link to="/recommends" className="link-line">好物</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-3">其它</div>
            <ul className="space-y-1.5 text-[14px]">
              <li><a href="https://github.com/finrodchen" target="_blank" rel="noreferrer" className="link-line">GitHub</a></li>
              <li><a href="https://linkedin.com/in/finrodchen" target="_blank" rel="noreferrer" className="link-line">LinkedIn</a></li>
              <li><a href="https://astro.finrod.xyz" target="_blank" rel="noreferrer" className="link-line">部落格</a></li>
            </ul>
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
