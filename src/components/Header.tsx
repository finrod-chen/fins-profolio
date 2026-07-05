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
      {/* 占位 spacer，當 shrunk 時 header 變 floating，需保留上方空間 */}
      <header className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6">
        <div
          className={`floating-pill ${shrunk ? "is-shrunk" : ""} h-14 sm:h-16`}
          style={shrunk ? { maxWidth: 720, margin: "0 auto" } : { maxWidth: "100%" }}
        >
          <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setOpen(false)}
            >
              <div className="relative w-9 h-9 grid place-items-center bg-[var(--color-accent)] text-white transition-transform group-hover:rotate-[-6deg] duration-300">
                <span className="font-mono text-[12px] font-bold leading-none">FR</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-amber)] ring-2 ring-[var(--color-paper)]" />
              </div>
              <div className="leading-tight hidden sm:block">
                <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                  個人作品集
                </div>
                <div className="font-serif font-semibold text-[15px] tracking-tight text-[var(--color-ink)]">
                  Finrod Chen
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-[14px]">
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

            <button
              type="button"
              aria-label={open ? "關閉選單" : "開啟選單"}
              aria-expanded={open}
              className="md:hidden -mr-2 p-2 text-[var(--color-ink)]"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="block w-5 h-[1.5px] bg-current mb-[5px]" />
              <span className="block w-5 h-[1.5px] bg-current mb-[5px]" />
              <span className="block w-5 h-[1.5px] bg-current" />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 floating-pill overflow-hidden">
            <nav className="flex flex-col px-4 py-3 text-[15px]">
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
