import { Link } from "react-router-dom";

/**
 * MagazineFooter — colophon-style closing page.
 * Like the back of a magazine: a "colophon" block (manifesto /
 * "what is this site"), Elsewhere, Sitemap, and a metro line.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-ink)] bg-[var(--color-paper)]">
      <div className="px-5 sm:px-8 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="eyebrow mb-5">Colophon</div>
            <p className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.25] tracking-tight text-[var(--color-ink)] italic">
              A working notebook — half portfolio, half field log.
              Built and typeset each weekend from a small desk in
              新北永和. Set in Fraunces and Geist. Long-form posts
              arrive when they arrive.
            </p>
            <a
              href="mailto:me@finrod.xyz"
              className="mt-7 inline-block text-[clamp(28px,5vw,52px)] font-display font-medium leading-[1.02] tracking-tight text-[var(--color-ink)] link-line"
            >
              me@finrod.xyz
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="mag-eyebrow mb-4">Elsewhere</div>
            <ul className="space-y-2 text-[14px]">
              <li><a href="https://github.com/finrodchen" target="_blank" rel="noreferrer" className="link-line">GitHub</a></li>
              <li><a href="https://linkedin.com/in/finrodchen" target="_blank" rel="noreferrer" className="link-line">LinkedIn</a></li>
              <li><a href="https://astro.finrod.xyz" target="_blank" rel="noreferrer" className="link-line">Blog</a></li>
              <li><a href="https://astro.finrod.xyz/blog" target="_blank" rel="noreferrer" className="link-line">雜談</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="mag-eyebrow mb-4">Sitemap</div>
            <ul className="space-y-2 text-[14px]">
              <li><Link to="/" className="link-line">Works</Link></li>
              <li><Link to="/blog" className="link-line">Writing</Link></li>
              <li><Link to="/about" className="link-line">About</Link></li>
              <li><Link to="/recommends" className="link-line">Shop</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--color-line-soft)]">
        <div className="px-5 sm:px-8 lg:px-12 h-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[11px] font-mono tracking-[0.16em] uppercase text-[var(--color-mute)]">
          <div>© {new Date().getFullYear()} Finrod Chen</div>
          <div className="flex items-center gap-3">
            <span>Set in Fraunces &amp; Geist</span>
            <span aria-hidden>·</span>
            <span>Vite + React + Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
