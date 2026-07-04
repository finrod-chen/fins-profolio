import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-paper)]">
      <div className="px-5 sm:px-6 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-6">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              Get in touch
            </div>
            <a
              href="mailto:me@finrod.xyz"
              className="block text-[clamp(28px,5vw,52px)] font-semibold leading-[1.05] tracking-tight link-line"
            >
              me@finrod.xyz
            </a>
            <p className="mt-4 text-[14px] text-[var(--color-mute)] max-w-md">
              開放聊聊天 — side project 合作、技術交換、或是細胞治療產業的有趣問題。
              回信時間通常在 1 — 2 個工作天。
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
              {/* Elsewhere
            </div>
            <ul className="space-y-2 text-[14px]">
              <li><a href="https://github.com/finrodchen" target="_blank" rel="noreferrer" className="link-line">GitHub</a></li>
              <li><a href="https://linkedin.com/in/finrodchen" target="_blank" rel="noreferrer" className="link-line">LinkedIn</a></li>
              <li><a href="https://astro.finrod.xyz" target="_blank" rel="noreferrer" className="link-line">Blog</a></li>
              <li><a href="https://astro.finrod.xyz/blog" target="_blank" rel="noreferrer" className="link-line">雜談</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3"> */}
              Sitemap
            </div>
            <ul className="space-y-2 text-[14px]">
              <li><Link to="/" className="link-line">Works</Link></li>
              <li><Link to="/blog" className="link-line">Writing</Link></li>
              <li><Link to="/about" className="link-line">About</Link></li>
              <li><Link to="/recommends" className="link-line">Shop</Link></li>
              <li><a href="mailto:me@finrod.xyz" className="link-line">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-line-soft)]">
        <div className="px-5 sm:px-6 lg:px-10 h-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono tracking-[0.14em] uppercase text-[var(--color-mute)]">
          <div>© {new Date().getFullYear()} FINROD CHEN · ALL WRONGS RESERVED</div>
          <div className="flex items-center gap-4">
            <span>BUILT WITH VITE + REACT + TAILWIND</span>
            <span className="hidden sm:inline">v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
