import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { posts, categories } from "@/data/blog";
import { useReveal } from "@/hooks/useReveal";
import { BigSectionNumber } from "@/components/BigSectionNumber";

/**
 * BlogIndexPage — v5 bold
 * 巨型章節編號 02 + 彩色 disc 背景 + 多色 stat rail。
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

      <section className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-6 sm:pb-10 relative">
        <div
          aria-hidden
          className="absolute -top-10 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
          style={{ background: "radial-gradient(circle, var(--color-amber), transparent 70%)" }}
        />
        <span className="sticker is-amber absolute top-14 right-5 sm:right-8 lg:right-12 rotate-[-3deg] z-10 hidden sm:inline-block">Blog ✦</span>
        <div data-reveal>
          <BigSectionNumber
            number="02"
            label="文章"
            title={
              <>
                文章<span className="hl-coral">.</span>
              </>
            }
            tone="amber"
            right={
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                {posts.length} 篇文章 · {categories.length} 分類
              </span>
            }
          />
        </div>
        <p className="mt-2 text-[14px] text-[var(--color-mute)] max-w-prose" data-reveal>
          從 2013 到現在累積的 {posts.length} 篇文章, 散落在生技法規、
          細胞治療實務、side project 紀錄、與一些雜談。
        </p>
        <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-[13px] border-t border-[var(--color-line)] pt-6" data-reveal>
          <Stat k="篇數" v={String(posts.length)} rail="var(--color-accent)" />
          <Stat k="分類" v={String(categories.length)} rail="var(--color-coral)" />
          <Stat k="最早" v={formatDate(posts[posts.length - 1].date)} rail="var(--color-amber)" />
          <Stat k="最新" v={formatDate(posts[0].date)} rail="var(--color-accent-soft)" />
        </dl>
      </section>

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
                className={`shrink-0 chip transition-colors ${
                  isActive
                    ? "is-blue !text-[var(--color-accent-hover)]"
                    : "is-out hover:border-[var(--color-ink)]"
                }`}
              >
                <span>{c.name}</span>
                <span className={`font-mono ${isActive ? "opacity-60" : "opacity-50"}`}>
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

function Stat({ k, v, rail }: { k: string; v: string; rail?: string }) {
  return (
    <div className={rail ? "pl-3 border-l-2" : ""} style={rail ? { borderColor: rail } : undefined}>
      <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-1 font-serif text-[18px] sm:text-[20px] font-medium leading-snug text-[var(--color-ink)] tabular-nums">
        {v}
      </dd>
    </div>
  );
}
