import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Header — sticky, three-zone: logo left, nav center, CTA right.
 * No issue-strip, no masthead. Just a clean working nav.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { to: "/", label: "作品", end: true },
    { to: "/blog", label: "文章" },
    { to: "/about", label: "關於" },
    { to: "/recommends", label: "好物" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/80 border-b border-[var(--color-line)]">
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-12 h-16">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <div className="w-9 h-9 grid place-items-center bg-[var(--color-accent)] text-white">
            <span className="font-mono text-[12px] font-semibold leading-none">FR</span>
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

        <nav className="hidden md:flex items-center gap-7 text-[14px]">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `link-line ${
                  isActive
                    ? "text-[var(--color-ink)] font-medium"
                    : "text-[var(--color-ink-2)]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href="mailto:me@finrod.xyz"
            className="ml-3 inline-flex items-center gap-1.5 px-4 h-9 bg-[var(--color-ink)] text-white text-[12px] font-medium hover:bg-[var(--color-accent)] transition-colors"
          >
            聯絡
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
                    isActive ? "font-medium" : "text-[var(--color-ink-2)]"
                  }`
                }
              >
                <span>{item.label}</span>
                <span className="text-[var(--color-mute)]">→</span>
              </NavLink>
            ))}
            <a
              href="mailto:me@finrod.xyz"
              onClick={() => setOpen(false)}
              className="py-3 border-b border-[var(--color-line-soft)] flex items-center justify-between"
            >
              <span>聯絡</span>
              <span className="text-[var(--color-mute)]">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
