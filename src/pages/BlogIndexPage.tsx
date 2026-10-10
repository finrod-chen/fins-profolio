import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { posts, categories } from "@/data/blog";
import { Badge } from "@/components/arc/badge/badge";
import { Button } from "@/components/arc/button/button";
import { ChipGroup } from "@/components/arc/chip-group/chip-group";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { Pagination } from "@/components/arc/pagination/pagination";
import { SearchField } from "@/components/arc/search-field/search-field";
import { PageIntro } from "@/components/PageIntro";
import { formatDate } from "@/lib/format";
import styles from "./BlogIndexPage.module.css";

const PER_PAGE = 20;

const options = [
  { value: "All", label: "全部" },
  ...categories.map((c) => ({ value: c.name, label: c.name })),
];

export function BlogIndexPage() {
  const [params, setParams] = useSearchParams();

  const requestedCategory = params.get("cat") ?? "All";
  const category =
    requestedCategory === "All" || categories.some((c) => c.name === requestedCategory)
      ? requestedCategory
      : "All";
  const query = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") ?? 1) || 1);

  /** Writes the next filter state into the URL, so a filtered list is shareable. */
  const update = (next: { cat?: string; q?: string; page?: number }) => {
    const draft = new URLSearchParams(params);
    const apply = (key: string, value: string | undefined, blank: string) => {
      if (value === undefined) return;
      if (value === blank) draft.delete(key);
      else draft.set(key, value);
    };
    apply("cat", next.cat, "All");
    apply("q", next.q, "");
    // Any new filter starts the list again from the first page.
    if (next.page === undefined || next.page === 1) draft.delete("page");
    else draft.set("page", String(next.page));
    setParams(draft, { replace: true });
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (!needle) return true;
      return (
        post.title.toLowerCase().includes(needle) ||
        post.description.toLowerCase().includes(needle) ||
        post.tags.some((tag) => tag.toLowerCase().includes(needle))
      );
    });
  }, [category, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const filtering = category !== "All" || query.trim() !== "";

  return (
    <div className="page">
      <title>{category === "All" ? "文章 · Finrod Chen" : `${category} · 文章`}</title>
      <meta
        name="description"
        content={`從 2013 到現在累積的 ${posts.length} 篇文章，散落在生技法規、細胞治療實務、side project 紀錄，以及一些雜談。`}
      />

      <PageIntro
        title="文章"
        description="從 2013 到現在累積下來的紀錄，散落在生技法規、細胞治療實務、side project，以及一些雜談。"
        breadcrumbs={[{ label: "作品", href: "/" }, { label: "文章" }]}
        meta={[
          `${posts.length} 篇`,
          `${categories.length} 個分類`,
          `最新 ${formatDate(posts[0].date)}`,
        ]}
      />

      <div className={styles.toolbar}>
        <SearchField
          label="搜尋文章"
          placeholder="標題、摘要或標籤"
          value={query}
          onValueChange={(value) => update({ q: value, page: 1 })}
          className={styles.search}
        />
        <ChipGroup
          label="文章分類"
          options={options}
          value={[category]}
          maxVisible={6}
          onValueChange={(next) => update({ cat: next.at(-1) ?? "All", page: 1 })}
        />
      </div>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <EmptyState
            title="沒有符合的文章"
            description="試試別的關鍵字，或把分類切回全部。"
            label="沒有符合的文章"
            action={
              <Button variant="secondary" onClick={() => update({ cat: "All", q: "", page: 1 })}>
                清掉篩選條件
              </Button>
            }
          />
        </div>
      ) : (
        <>
          <p className={styles.resultCount} aria-live="polite">
            {filtering ? `符合 ${filtered.length} 篇` : `共 ${filtered.length} 篇`}
          </p>
          <ul className={styles.list}>
            {visible.map((post) => (
              <li key={post.slug} className={styles.item}>
                <Link to={`/blog/${post.slug}`} className={styles.row}>
                  <span className={styles.date}>{formatDate(post.date)}</span>
                  <span className={styles.body}>
                    <span className={styles.titleRow}>
                      <span className={styles.title}>{post.title}</span>
                      <Badge tone="neutral" size="sm">
                        {post.category}
                      </Badge>
                    </span>
                    {post.description && (
                      <span className={styles.description}>{post.description}</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {pageCount > 1 && (
            <div className={styles.pagination}>
              <Pagination
                label="文章分頁"
                page={current}
                pageCount={pageCount}
                onPageChange={(next) => update({ page: next })}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
