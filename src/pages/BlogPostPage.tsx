import { Suspense, use, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GithubSlugger from "github-slugger";
import { findPost, loadPostBody, posts, relatedPosts, type BlogPost } from "@/data/blog";
import { Badge } from "@/components/arc/badge/badge";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import { Breadcrumb } from "@/components/arc/breadcrumb/breadcrumb";
import { InViewTitle } from "@/components/arc/in-view-title/in-view-title";
import { Skeleton } from "@/components/arc/skeleton/skeleton";
import { Markdown } from "@/components/Markdown";
import { formatDate } from "@/lib/format";
import styles from "./BlogPostPage.module.css";

interface Heading {
  id: string;
  level: number;
  text: string;
}

function extractToc(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    out.push({ id: slugger.slug(m[2].trim()), level: m[1].length, text: m[2].trim() });
  }
  return out;
}

/** Marks the heading the reader is currently under. */
function useScrollSpy(ids: string[], offsetTop = 140) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (ids.length === 0) return;
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        let bestId: string | null = null;
        let bestTop = -Infinity;
        for (const el of els) {
          const top = el.getBoundingClientRect().top - offsetTop;
          if (top <= 0 && top > bestTop) {
            bestTop = top;
            bestId = el.id;
          }
        }
        if (bestId === null && els[0] && els[0].getBoundingClientRect().top < window.innerHeight) {
          bestId = els[0].id;
        }
        setActive(bestId);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offsetTop]);
  return active;
}

/**
 * Post bodies are split out of the bundle (see src/data/blog.ts), so each one
 * is fetched the first time it is read. The promise is cached per slug, so a
 * re-render, or coming back to a post, does not fetch it again.
 */
const bodyRequests = new Map<string, Promise<string>>();

function requestBody(slug: string) {
  let request = bodyRequests.get(slug);
  if (!request) {
    request = loadPostBody(slug);
    bodyRequests.set(slug, request);
  }
  return request;
}

/**
 * The reading column and the sidebar beside it, which both need the body:
 * the article, and the table of contents built from its headings. Suspends
 * until the body arrives; a failed fetch reaches the route's error boundary.
 */
function PostContent({ post }: { post: BlogPost }) {
  const body = use(requestBody(post.slug));
  const toc = useMemo(() => extractToc(body), [body]);
  const tocIds = useMemo(() => toc.map((h) => h.id), [toc]);
  const activeId = useScrollSpy(tocIds);
  const related = relatedPosts(post, 4);

  return (
    <div className={styles.columns}>
      <div className={styles.bodyColumn}>
        <Markdown>{body}</Markdown>
      </div>

      <aside className={styles.side}>
        <div className={styles.sideSticky}>
          {toc.length > 1 && (
            <nav aria-labelledby="toc-heading">
              <h2 id="toc-heading" className={styles.sideHeading}>
                目錄
              </h2>
              <ul className={styles.toc}>
                {toc.map((heading) => (
                  <li key={heading.id} data-level={Math.min(heading.level, 3)}>
                    <a
                      href={`#${heading.id}`}
                      className={styles.tocLink}
                      aria-current={heading.id === activeId ? "true" : undefined}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {related.length > 0 && (
            <div>
              <h2 className={styles.sideHeading}>相關文章</h2>
              <ul className={styles.related}>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/blog/${item.slug}`} className={styles.relatedLink}>
                      <span className={styles.relatedDate}>{formatDate(item.date)}</span>
                      <span className={styles.relatedTitle}>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export function BlogPostPage() {
  const { "*": splat } = useParams();
  const slug = splat ?? "";
  const post = useMemo(() => findPost(slug), [slug]);

  if (!post) {
    return (
      <div className="page band">
        <title>找不到這篇文章 · Finrod Chen</title>
        <EmptyState
          title="找不到這篇文章"
          description="文章可能已經搬走、刪掉，或是連結拼錯了。"
          label="找不到文章"
          action={
            <Link to="/blog" className={styles.backLink}>
              回到文章列表
            </Link>
          }
        />
      </div>
    );
  }

  const index = posts.findIndex((p) => p.slug === post.slug);
  const older = index < posts.length - 1 ? posts[index + 1] : null;
  const newer = index > 0 ? posts[index - 1] : null;

  return (
    <article className="page">
      <title>{`${post.title} · 文章`}</title>
      <meta name="description" content={post.description || post.title} />

      <header className={styles.header}>
        <Breadcrumb
          ariaLabel="頁面路徑"
          items={[
            { label: "作品", href: "/" },
            { label: "文章", href: "/blog" },
            { label: post.category, href: `/blog?cat=${encodeURIComponent(post.category)}` },
            { label: post.title },
          ]}
        />
        <InViewTitle as="h1" variant="blur" text={post.title} className={styles.title} />
        {post.description && <p className={styles.standfirst}>{post.description}</p>}
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(post.date)}</span>
          <Badge tone="info" size="sm">
            {post.category}
          </Badge>
          {post.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} tone="neutral" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {post.heroImage && (
        <figure className={styles.hero}>
          <img src={post.heroImage} alt="" loading="lazy" decoding="async" />
        </figure>
      )}

      {/* The header above is ready at once; only the reading column waits. */}
      <Suspense
        key={post.slug}
        fallback={
          <div className={styles.columns} aria-busy="true">
            <div className={styles.bodyColumn}>
              <Skeleton label="載入內文" lines={10} />
            </div>
          </div>
        }
      >
        <PostContent post={post} />
      </Suspense>

      <nav className={styles.nextPrev} aria-label="上下篇文章">
        {older && (
          <Link to={`/blog/${older.slug}`} className={styles.nextPrevLink}>
            <span className={styles.nextPrevLabel}>較舊的一篇</span>
            <span className={styles.nextPrevTitle}>{older.title}</span>
          </Link>
        )}
        {newer && (
          <Link to={`/blog/${newer.slug}`} className={`${styles.nextPrevLink} ${styles.nextPrevEnd}`}>
            <span className={styles.nextPrevLabel}>較新的一篇</span>
            <span className={styles.nextPrevTitle}>{newer.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
