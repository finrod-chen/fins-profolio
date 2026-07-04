import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

/**
 * Header — sticky, with a top "bar" line and a slightly
 * industrial nav. Collapses to a clean row on mobile.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Taipei",
  });
  const tz = "TPE";

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/75 border-b border-[var(--color-line)]">
      {/* status bar — desktop only */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-10 h-7 text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--color-mute)] border-b border-[var(--color-line-soft)]">
        <div className="flex items-center gap-6">
          <span>● ONLINE</span>
          <span>LAT 25.03°N</span>
          <span>LON 121.57°E</span>
        </div>
        <div className="flex items-center gap-6">
          <span>FW · 2025.06</span>
          <span>{tz} {time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 sm:px-6 lg:px-10 h-14 md:h-16">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <div className="w-7 h-7 grid place-items-center bg-[var(--color-ink)] text-[var(--color-paper)]">
            <span className="font-mono text-[11px] font-semibold leading-none">FR</span>
          </div>
          <div className="leading-none">
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
              Side projects
            </div>
            <div className="font-semibold text-[15px] tracking-tight">FINROD&nbsp;CHEN</div>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-[13px]">
          <NavLink to="/" end className={({ isActive }) => `link-line ${isActive ? "text-[var(--color-ink)] font-semibold" : "text-[var(--color-ink-2)]"}`}>
            Works
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `link-line ${isActive ? "text-[var(--color-ink)] font-semibold" : "text-[var(--color-ink-2)]"}`}>
            Writing
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `link-line ${isActive ? "text-[var(--color-ink)] font-semibold" : "text-[var(--color-ink-2)]"}`}>
            About
          </NavLink>
          <NavLink to="/recommends" className={({ isActive }) => `link-line ${isActive ? "text-[var(--color-ink)] font-semibold" : "text-[var(--color-ink-2)]"}`}>
            Shop
          </NavLink>
          <a
            href="mailto:me@finrod.xyz"
            className="ml-2 inline-flex items-center gap-2 px-3.5 h-9 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
          >
            <span>Contact</span>
          </a>
        </nav>

        {/* mobile menu button */}
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

      {/* mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-line-soft)] bg-[var(--color-paper)]">
          <nav className="flex flex-col px-5 py-3 text-[15px]">
            {[
              { to: "/", label: "Works" },
              { to: "/blog", label: "Writing" },
              { to: "/about", label: "About" },
              { to: "/recommends", label: "Shop" },
              { to: "mailto:me@finrod.xyz", label: "Contact", ext: true },
            ].map((item) =>
              item.ext ? (
                <a
                  key={item.to}
                  href={item.to}
                  className="py-3 border-b border-[var(--color-line-soft)] flex items-center justify-between"
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--color-mute)]">↗</span>
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `py-3 border-b border-[var(--color-line-soft)] flex items-center justify-between ${
                      isActive ? "font-semibold" : "text-[var(--color-ink-2)]"
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <span className="text-[var(--color-mute)]">→</span>
                </NavLink>
              )
            )}
            <a
              href="https://astro.finrod.xyz"
              target="_blank"
              rel="noreferrer"
              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 h-11 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em]"
            >
              Blog <span aria-hidden>↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
