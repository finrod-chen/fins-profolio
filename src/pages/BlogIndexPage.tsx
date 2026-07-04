import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { posts, categories } from "@/data/blog";
import { SectionLabel } from "@/components/SectionLabel";

/**
 * BlogIndexPage
 * 全部文章列表, 預設依新→舊; 可用 category chip 切換。
 * Mobile: 1 欄; Desktop: 2 欄 "spec sheet" 風表格, 像閱讀清單。
 */
export function BlogIndexPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("cat") ?? "All";
  const active = catParam === "All" || categories.some((c) => c.name === catParam) ? catParam : "All";

  const setActive = (cat: string) => {
    if (cat === "All") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ cat }, { replace: true });
    }
  };

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.category === active);
  }, [active]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });

  const pageTitle = active === "All"
    ? "Writing — FIN / Finrod Chen"
    : `${active} — FIN / Writing`;

  return (
    <div className="page-in px-5 sm:px-6 lg:px-10 py-10 sm:py-14 max-w-7xl">
      <title>{pageTitle}</title>
      <meta name="description" content={`從 2013 到現在累積的 ${posts.length} 篇文章，散落在生技法規、細胞治療實務、side project 紀錄、與一些雜談。`} />
      <SectionLabel index="04" label="Writing" meta={`${posts.length} entries · ${categories.length} categories`} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-14">
        <div className="lg:col-span-8">
          <h1 className="text-[clamp(36px,6vw,72px)] font-semibold leading-[1.05] tracking-[-0.02em]">
            寫下來,
            <br />
            才算發生過。
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] sm:text-[16px] leading-[1.7] text-[var(--color-ink-2)]">
            從 2013 到現在累積的 {posts.length} 篇文章, 散落在生技法規、
            細胞治療實務、side project 紀錄、與一些雜談。點開任一篇, 都是某個當下
            試著把事情想清楚的痕跡。
          </p>
        </div>
        <div className="lg:col-span-4">
          <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-[13px]">
            <Stat k="Total" v={String(posts.length)} />
            <Stat k="Categories" v={String(categories.length)} />
            <Stat k="Oldest" v={formatDate(posts[posts.length - 1].date)} />
            <Stat k="Latest" v={formatDate(posts[0].date)} />
          </dl>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-5 sm:mx-0 px-5 sm:px-0">
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

      {/* List */}
      {filtered.length === 0 ? (
        <div className="border border-dashed border-[var(--color-line)] py-16 text-center">
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-2">
            No entries
          </div>
          <p className="text-[14px] text-[var(--color-ink-2)]">這個分類目前還沒有文章。</p>
        </div>
      ) : (
        <>
          {/* Desktop "spec sheet" table */}
          <div className="hidden md:block border border-[var(--color-line)]">
            <div className="grid grid-cols-[110px_120px_1fr_140px] font-mono text-[10px] tracking-[0.16em] uppercase bg-[var(--color-ink)] text-[var(--color-paper)]">
              <div className="px-3 py-2.5">Date</div>
              <div className="px-3 py-2.5">Category</div>
              <div className="px-3 py-2.5">Title</div>
              <div className="px-3 py-2.5 text-right">Tags</div>
            </div>
            <ul className="divide-y divide-[var(--color-line)]">
              {filtered.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="grid grid-cols-[110px_120px_1fr_140px] items-baseline px-3 py-3.5 hover:bg-[var(--color-paper-2)] transition-colors group"
                  >
                    <span className="font-mono text-[12px] tabular-nums text-[var(--color-mute)]">
                      {formatDate(p.date)}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-2)]">
                      {p.category}
                    </span>
                    <span className="min-w-0 pr-4">
                      <span className="block text-[15px] font-medium leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {p.title}
                      </span>
                      {p.description && (
                        <span className="block text-[12px] text-[var(--color-mute)] line-clamp-1 mt-0.5">
                          {p.description}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--color-mute)] text-right truncate">
                      {p.tags.slice(0, 2).join(" · ")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile compact list */}
          <ul className="md:hidden border-y border-[var(--color-line)] divide-y divide-[var(--color-line)]">
            {filtered.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`} className="block py-4 group">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-mute)]">
                      {formatDate(p.date)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-line)]" />
                    <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-ink-2)]">
                      {p.category}
                    </span>
                  </div>
                  <div className="text-[16px] font-semibold leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                    {p.title}
                  </div>
                  {p.description && (
                    <p className="mt-1 text-[13px] text-[var(--color-mute)] line-clamp-2">
                      {p.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
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
      className={`shrink-0 inline-flex items-center gap-2 h-9 px-3.5 border text-[12px] font-mono uppercase tracking-[0.12em] transition-colors ${
        active
          ? "bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]"
          : "bg-[var(--color-paper)] text-[var(--color-ink-2)] border-[var(--color-line)] hover:border-[var(--color-ink)]"
      }`}
    >
      <span>{label}</span>
      <span className={active ? "text-[var(--color-paper)]/70" : "text-[var(--color-mute)]"}>
        {String(count).padStart(2, "0")}
      </span>
    </button>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="font-mono text-[15px] tabular-nums text-[var(--color-ink)] mt-0.5">{v}</dd>
    </div>
  );
}
