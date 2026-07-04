import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * MagazineHeader — masthead-style top bar.
 * - Top hairline + "issue" line (REAL current date, no fake meta).
 * - Big "FIN" display-serif logo + tagline.
 * - Slim nav, Contact as accent button.
 * - Mobile: collapses to a clean drawer.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  const navItems: Array<{ to: string; label: string; end?: boolean }> = [
    { to: "/", label: "Works", end: true },
    { to: "/blog", label: "Writing" },
    { to: "/about", label: "About" },
    { to: "/recommends", label: "Shop" },
  ];

  const today = new Date();
  const issueLine = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-[var(--color-paper)] border-b border-[var(--color-ink)]/15 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/85">
      {/* Tiny masthead rule — issue / volume / weather-free */}
      <div className="border-b border-[var(--color-line-soft)] px-5 sm:px-8 lg:px-12 h-8 flex items-center justify-between text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--color-mute)]">
        <span>Issue · {issueLine}</span>
        <span className="hidden sm:inline">Taipei / Remote</span>
        <span className="hidden md:inline">Vol. IV</span>
      </div>

      {/* Masthead bar */}
      <div className="px-5 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-baseline gap-2 leading-none">
            <span className="font-display text-[34px] sm:text-[42px] font-medium tracking-tight text-[var(--color-ink)]">
              FIN
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
              Finrod Chen
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[13px]">
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
            className="ml-2 inline-flex items-center gap-2 px-4 h-9 bg-[var(--color-ink)] text-[var(--color-paper)] text-[11px] font-mono uppercase tracking-[0.16em] hover:bg-[var(--color-accent)] transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
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
              <span>Contact</span>
              <span className="text-[var(--color-mute)]">↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
