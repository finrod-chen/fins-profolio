import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Header — sticky, three-zone: logo left, nav center, CTA right.
 * Logo 用電光藍方塊 + amber 焦點點綴，活潑版。
 * 桌面 CTA 是 coral pill。
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
          <a
            href="mailto:me@finrod.xyz"
            className="ml-3 btn btn-coral"
          >
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
                <span className="text-[var(--color-mute)] hover-arrow">→</span>
              </NavLink>
            ))}
            <a
              href="mailto:me@finrod.xyz"
              onClick={() => setOpen(false)}
              className="py-3 border-b border-[var(--color-line-soft)] flex items-center justify-between text-[var(--color-coral)]"
            >
              <span>聯絡</span>
              <span className="hover-arrow">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
