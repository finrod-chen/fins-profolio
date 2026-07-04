import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { posts, categories } from "@/data/blog";
import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

/**
 * BlogIndexPage — an "essay anthology" index.
 *
 * Inspired by small-press literary journals: a long opening
 * standfirst, then a stack of articles, then a meta-trail
 * (archive view).
 *
 * The TOC sidebar (sticky) doubles as the table of contents for
 * THIS page. Categories are inline mono-caps chips.
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
    d.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });

  const pageTitle =
    active === "All"
      ? "Writing — FIN / Finrod Chen"
      : `${active} — FIN / Writing`;

  // The first post (most recent) gets a feature spread; the rest
  // get a list view.
  const [lead, ...rest] = filtered;

  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta
        name="description"
        content={`從 2013 到現在累積的 ${posts.length} 篇文章，散落在生技法規、細胞治療實務、side project 紀錄、與一些雜談。`}
      />

      <SectionLabel label="Writing" meta={`${posts.length} entries · ${categories.length} categories`} />

      {/* ─── Cover paragraph ─── */}
      <section className="px-5 sm:px-8 lg:px-12 pt-10 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8" data-reveal>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] font-medium leading-[1.0] tracking-[-0.025em] text-[var(--color-ink)]">
              寫下來,
              <br />
              <em className="text-[var(--color-accent-deep-2)] font-normal">
                才算
              </em>{" "}
              發生過。
            </h1>
          </div>
          <div className="lg:col-span-4 max-w-prose" data-reveal>
            <p className="text-[16px] leading-[1.75] text-[var(--color-ink-2)]">
              從 2013 到現在累積的 {posts.length} 篇文章,
              散落在生技法規、細胞治療實務、side project 紀錄、
              與一些雜談。點開任一篇,
              都是某個當下試著把事情想清楚的痕跡。
            </p>
          </div>
        </div>

        {/* stat strip */}
        <dl
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-y border-[var(--color-ink)]/15 py-8"
          data-reveal
        >
          <Stat k="Entries" v={String(posts.length)} />
          <Stat k="Categories" v={String(categories.length)} />
          <Stat k="Oldest" v={formatDate(posts[posts.length - 1].date)} />
          <Stat k="Latest" v={formatDate(posts[0].date)} />
        </dl>
      </section>

      {/* ─── Filter chips ─── */}
      <section
        className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-ink)]/15 py-10"
        data-reveal
      >
        <div className="flex items-center flex-wrap gap-3">
          <FilterChip
            label="All"
            count={posts.length}
            active={active === "All"}
            onClick={() => setActive("All")}
          />
          {categories.map((c) => (
            <FilterChip
              key={c.name}
              label={c.name}
              count={c.count}
              active={active === c.name}
              onClick={() => setActive(c.name)}
            />
          ))}
        </div>
      </section>

      {/* ─── List ─── */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--color-ink)]/20 py-20 mx-5 sm:mx-8 lg:mx-12 text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-2">
            No entries
          </div>
          <p className="text-[14px] text-[var(--color-ink-2)]">這個分類目前還沒有文章。</p>
        </div>
      ) : (
        <ul className="px-5 sm:px-8 lg:px-12 border-t border-[var(--color-ink)]/15">
          {lead && (
            <li
              key={lead.slug}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 sm:py-16 border-b border-[var(--color-line)]"
            >
              <div className="lg:col-span-4">
                <div className="mag-eyebrow border-transparent mb-3">
                  Latest · {formatDate(lead.date)}
                </div>
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                  {lead.category}
                </div>
              </div>
              <Link
                to={`/blog/${lead.slug}`}
                className="lg:col-span-8 group block"
              >
                <h2 className="font-display text-[clamp(32px,4vw,56px)] font-medium leading-[1.05] tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep-2)] transition-colors">
                  {lead.title}
                </h2>
                {lead.description && (
                  <p className="mt-4 font-display italic text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-[var(--color-ink-2)] max-w-prose">
                    {lead.description}
                  </p>
                )}
                <div className="mt-6 font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-mute)]">
                  Read → {lead.tags?.slice(0, 3).join(" · ")}
                </div>
              </Link>
            </li>
          )}
          {rest.map((p, i) => (
            <li
              key={p.slug}
              data-reveal
              data-reveal-delay={String((i % 5) + 1)}
              className="border-b border-[var(--color-line)]"
            >
              <Link
                to={`/blog/${p.slug}`}
                className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-4 md:gap-10 py-7 sm:py-8 group transition-colors hover:bg-[var(--color-paper-2)]"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--color-mute)] tabular-nums">
                  {formatDate(p.date)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-accent-deep-2)]">
                      {p.category}
                    </span>
                    <span className="hidden md:inline font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                      · {p.tags?.slice(0, 2).join(" · ")}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[clamp(20px,2.6vw,30px)] font-medium leading-[1.15] tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep-2)] transition-colors">
                    {p.title}
                  </h3>
                  {p.description && (
                    <p className="mt-2 text-[14px] text-[var(--color-ink-2)] line-clamp-2 leading-[1.6] max-w-prose">
                      {p.description}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 inline-flex items-center gap-2 h-9 px-4 border text-[11px] font-mono uppercase tracking-[0.18em] transition-colors ${
        active
          ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
          : "bg-transparent text-[var(--color-ink-2)] border-[var(--color-ink)]/30 hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
      }`}
    >
      <span>{label}</span>
      <span
        className={
          active ? "text-[var(--color-paper)]/70" : "text-[var(--color-mute)]"
        }
      >
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="mt-2 font-display text-[clamp(24px,3vw,38px)] font-medium leading-none tracking-tight text-[var(--color-ink)]">
        {v}
      </dd>
    </div>
  );
}
