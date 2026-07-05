import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Header — v5 bold
 * 預設：寬版 sticky 條
 * scroll-down 時縮成 floating pill（max-width 720px，圓角），scroll-up 拉回全寬
 * Logo 仍藍方塊 + amber 焦點點綴，Coral 桌面 CTA。
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const tick = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (delta > 8 && y > 240) setShrunk(true);
      else if (delta < -8) setShrunk(false);
      lastY = y;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navItems = [
    { to: "/", label: "作品", end: true },
    { to: "/blog", label: "文章" },
    { to: "/about", label: "關於" },
    { to: "/recommends", label: "好物" },
  ];

  return (
    <>
      <header
        className={`sticky z-40 bg-[var(--color-paper)] border-b border-[var(--color-line)] ${
          shrunk ? "md:top-3 top-0" : "top-0"
        }`}
      >
        {/* 手機版：rectangular full-width */}
        <div
          className={`md:hidden h-14 px-5 flex items-center justify-between`}
        >
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <div className="relative w-8 h-8 grid place-items-center bg-[var(--color-accent)] text-white">
              <span className="font-mono text-[11px] font-bold leading-none">FR</span>
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber)] ring-2 ring-[var(--color-paper)]" />
            </div>
            <div className="font-serif font-semibold text-[15px] tracking-tight text-[var(--color-ink)]">
              Finrod Chen
            </div>
          </Link>
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            className="-mr-2 p-2 text-[var(--color-ink)]"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block w-5 h-[1.5px] bg-current mb-[5px]" />
            <span className="block w-5 h-[1.5px] bg-current mb-[5px]" />
            <span className="block w-5 h-[1.5px] bg-current" />
          </button>
        </div>

        {/* 桌面版：floating pill 在 top-3 scroll 時縮成 720 */}
        <div
          className={`hidden md:block px-3 sm:px-6 ${shrunk ? "fixed top-3 left-0 right-0 z-40" : ""}`}
        >
          <div
            className={`floating-pill ${shrunk ? "is-shrunk" : ""} h-14 sm:h-16 mx-auto`}
            style={{ maxWidth: shrunk ? 720 : "100%" }}
          >
            <div className="h-full flex items-center justify-between px-5 sm:px-6 lg:px-8">
              <Link
                to="/"
                className="flex items-center gap-3 group"
                onClick={() => setOpen(false)}
              >
                <div className="relative w-9 h-9 grid place-items-center bg-[var(--color-accent)] text-white transition-transform group-hover:rotate-[-6deg] duration-300">
                  <span className="font-mono text-[12px] font-bold leading-none">FR</span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-amber)] ring-2 ring-[var(--color-paper)]" />
                </div>
                <div className="leading-tight">
                  <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                    個人作品集
                  </div>
                  <div className="font-serif font-semibold text-[15px] tracking-tight text-[var(--color-ink)]">
                    Finrod Chen
                  </div>
                </div>
              </Link>

              <nav className="flex items-center gap-6 text-[14px]">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `link-line transition-colors ${
                        isActive
                          ? "text-[var(--color-ink)] font-medium"
                          : "text-[var(--color-ink-2)] hover:text-[var(--color-accent)]"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <a href="mailto:me@finrod.xyz" className="ml-3 btn btn-coral">
                  <span>聯絡</span>
                  <span className="hover-arrow" aria-hidden>↗</span>
                </a>
              </nav>
            </div>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t border-[var(--color-line-soft)] bg-[var(--color-paper)]">
            <nav className="flex flex-col px-5 py-3 text-[15px]">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 border-b border-[var(--color-line-soft)] flex items-center justify-between ${
                      isActive ? "font-medium text-[var(--color-accent)]" : "text-[var(--color-ink-2)]"
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <span className="hover-arrow text-[var(--color-mute)]">→</span>
                </NavLink>
              ))}
              <a
                href="mailto:me@finrod.xyz"
                onClick={() => setOpen(false)}
                className="py-3 flex items-center justify-between text-[var(--color-coral)] font-medium"
              >
                <span>聯絡</span>
                <span className="hover-arrow">↗</span>
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
