import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { posts, categories } from "@/data/blog";
import { useReveal } from "@/hooks/useReveal";

/**
 * BlogIndexPage — list of articles, sorted newest-first, with
 * a category filter above. No spreads, no standfirsts —
 * just a working reading list.
 */
export function BlogIndexPage() {
  useReveal();
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat") ?? "All";
  const active =
    catParam === "All" || categories.some((c) => c.name === catParam)
      ? catParam
      : "All";

  const setActive = (cat: string) => {
    if (cat === "All") setSearchParams({}, { replace: true });
    else setSearchParams({ cat }, { replace: true });
  };

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const pageTitle =
    active === "All"
      ? "文章列表 — Finrod Chen"
      : `${active} — 文章列表`;

  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={`從 2013 到現在累積的 ${posts.length} 篇文章，散落在生技法規、細胞治療實務、side project 紀錄、與一些雜談。`}
      />

      <header
        className="px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-6 sm:pb-10"
        data-reveal
      >
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-semibold leading-[1.25] tracking-tight text-[var(--color-ink)]">
          文章
        </h1>
        <p className="mt-3 text-[14px] text-[var(--color-mute)] max-w-prose">
          從 2013 到現在累積的 {posts.length} 篇文章, 散落在生技法規、
          細胞治療實務、side project 紀錄、與一些雜談。
        </p>
        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-[13px] border-t border-[var(--color-line)] pt-6">
          <Stat k="篇數" v={String(posts.length)} />
          <Stat k="分類" v={String(categories.length)} />
          <Stat k="最早" v={formatDate(posts[posts.length - 1].date)} />
          <Stat k="最新" v={formatDate(posts[0].date)} />
        </dl>
      </header>

      {/* filter */}
      <section
        className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-line)] py-6 sm:py-8"
        data-reveal
      >
        <div className="flex items-center flex-wrap gap-2">
          {[
            { name: "All", count: posts.length },
            ...categories,
          ].map((c) => {
            const isActive = c.name === active;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(c.name)}
                className={`shrink-0 inline-flex items-center gap-2 h-9 px-3.5 text-[12px] font-mono uppercase tracking-[0.12em] transition-colors border ${
                  isActive
                    ? "bg-[var(--color-ink)] text-white border-[var(--color-ink)]"
                    : "bg-transparent text-[var(--color-ink-2)] border-[var(--color-line)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
                }`}
              >
                <span>{c.name}</span>
                <span
                  className={
                    isActive
                      ? "text-white/60"
                      : "text-[var(--color-mute)]"
                  }
                >
                  {String(c.count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* article list */}
      {filtered.length === 0 ? (
        <div className="border-y border-dashed border-[var(--color-line)] py-16 mx-5 sm:mx-8 lg:mx-12 text-center">
          <p className="text-[14px] text-[var(--color-ink-2)]">
            這個分類目前還沒有文章。
          </p>
        </div>
      ) : (
        <ul className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-line)]">
          {filtered.map((p, i) => (
            <li
              key={p.slug}
              data-reveal
              data-reveal-delay={String((i % 5) + 1)}
              className="border-b border-[var(--color-line)]"
            >
              <Link
                to={`/blog/${p.slug}`}
                className="group block py-6 sm:py-7 transition-colors hover:bg-[var(--color-paper-2)]"
              >
                <div className="grid grid-cols-1 md:grid-cols-[110px_140px_1fr] gap-3 md:gap-8">
                  <span className="font-mono text-[12px] tracking-[0.04em] text-[var(--color-mute)] tabular-nums">
                    {formatDate(p.date)}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-accent-hover)]">
                    {p.category}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-[clamp(18px,2vw,22px)] font-medium leading-[1.3] tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent-hover)] transition-colors">
                      {p.title}
                    </h3>
                    {p.description && (
                      <p className="mt-2 text-[14px] text-[var(--color-mute)] line-clamp-2 leading-[1.65]">
                        {p.description}
                      </p>
                    )}
                    {p.tags && p.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[10px] tracking-[0.12em] uppercase text-[var(--color-mute)]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-1 font-serif text-[18px] sm:text-[20px] font-medium leading-snug text-[var(--color-ink)] tabular-nums">
        {v}
      </dd>
    </div>
  );
}
