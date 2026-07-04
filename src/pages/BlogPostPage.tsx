import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { findPost, posts, relatedPosts } from "@/data/blog";
import { SectionLabel } from "@/components/SectionLabel";

// ============================================================
// Types
// ============================================================

interface Heading {
  /** slug id, matches what rehype-slug puts on the DOM */
  id: string;
  /** 1..6 */
  level: number;
  /** text content */
  text: string;
}

// ============================================================
// extract TOC from markdown body
//
// We walk the source body in document order, skip code fences,
// and call the same GithubSlugger that rehype-slug uses so the
// ids we render into the sidebar match the ids rehype-slug
// stamps onto the rendered <hN> elements.
// ============================================================

function extractToc(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const out: Heading[] = [];
  const lines = body.split(/\r?\n/);
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    out.push({
      id: slugger.slug(m[2].trim()),
      level: m[1].length,
      text: m[2].trim(),
    });
  }
  return out;
}

// ============================================================
// Hook: scroll-spy
//
// Tracks which heading is currently "active" by watching
// IntersectionObserver. A heading is considered active when
// it has scrolled past the top (with an offset for the
// sticky header).
// ============================================================

function useScrollSpy(ids: string[], offsetTop = 140): string | null {
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
        // pick the heading whose top is closest to (but above) the offset line
        let bestId: string | null = null;
        let bestTop = -Infinity;
        for (const el of els) {
          const top = el.getBoundingClientRect().top - offsetTop;
          if (top <= 0 && top > bestTop) {
            bestTop = top;
            bestId = el.id;
          }
        }
        // if none have scrolled past yet, use the first
        if (bestId === null && els[0]) {
          // only if we're already inside the article
          const first = els[0].getBoundingClientRect().top;
          if (first < window.innerHeight) bestId = els[0].id;
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

// ============================================================
// Component
// ============================================================

export function BlogPostPage() {
  const { "*": splat } = useParams();
  const slug = splat ?? "";
  const post = useMemo(() => findPost(slug), [slug]);

  // TOC
  const toc = useMemo(() => (post ? extractToc(post.body) : []), [post]);
  const tocIds = useMemo(() => toc.map((h) => h.id), [toc]);
  const activeId = useScrollSpy(tocIds);

  // For heading click: smooth scroll to anchor, offset for sticky header
  const onTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  if (!post) {
    return (
      <div className="page-in px-5 sm:px-6 lg:px-10 py-20 sm:py-28 text-center">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
          Error · 404
        </div>
        <h1 className="text-[clamp(28px,5vw,48px)] font-semibold tracking-tight">
          找不到這篇文章
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-mute)]">
          文章可能已搬移、刪除、或連結拼錯。
        </p>
        <Link
          to="/blog"
          className="mt-7 inline-flex items-center gap-2 h-11 px-5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.12em] hover:bg-[var(--color-accent)] transition-colors"
        >
          ← Back to blog
        </Link>
      </div>
    );
  }

  const related = relatedPosts(post, 4);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null; // older
  const next = idx > 0 ? posts[idx - 1] : null; // newer

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });

  // rehype-slug handles id assignment for headings — no custom
  // components needed.

  const pageTitle = `${post.title} — FIN / Writing`;
  const pageDesc = post.description || post.title;

  return (
    <article className="page-in">
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content="article" />
      {post.heroImage && <meta property="og:image" content={post.heroImage} />}
      {/* breadcrumb */}
      <div className="px-5 sm:px-6 lg:px-10 pt-8 sm:pt-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.14em] uppercase text-[var(--color-mute)] hover:text-[var(--color-ink)]"
        >
          <span aria-hidden>←</span> All Writing
        </Link>
      </div>

      {/* header */}
      <header className="px-5 sm:px-6 lg:px-10 mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link to={`/blog?cat=${post.category}`} className="tag is-accent">
            {post.category}
          </Link>
          <span className="tag font-mono">{formatDate(post.date)}</span>
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-[clamp(32px,5.5vw,56px)] font-semibold leading-[1.08] tracking-[-0.02em] max-w-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-4 max-w-3xl text-[16px] sm:text-[18px] text-[var(--color-ink-2)]">
            {post.description}
          </p>
        )}
      </header>

      {/* hero image */}
      {post.heroImage && (
        <div className="px-5 sm:px-6 lg:px-10 mt-8 sm:mt-10">
          <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden">
            <img
              src={post.heroImage}
              alt=""
              className="w-full h-auto max-h-[420px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Mobile-only TOC — collapsible, sits at the top of the article */}
      {toc.length > 1 && (
        <div className="lg:hidden px-5 sm:px-6 mt-10 sm:mt-12">
          <details className="group border border-[var(--color-line)] bg-[var(--color-paper)] open:bg-[var(--color-paper-2)] transition-colors">
            <summary className="cursor-pointer list-none flex items-center justify-between px-4 py-3 select-none">
              <span className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                  § 00
                </span>
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-[var(--color-ink)]">
                  Contents
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
                  · {toc.length}
                </span>
              </span>
              <span
                aria-hidden
                className="text-[var(--color-mute)] text-[12px] transition-transform group-open:rotate-180"
              >
                ▾
              </span>
            </summary>
            <nav aria-label="Table of contents" className="px-4 pb-3 pt-1">
              <ul className="border-l border-[var(--color-line)] max-h-[280px] overflow-y-auto">
                {toc.map((h) => {
                  const isActive = h.id === activeId;
                  return (
                    <li
                      key={h.id}
                      className={`relative ${h.level >= 3 ? "pl-6" : h.level === 2 ? "pl-4" : "pl-3"}`}
                    >
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => onTocClick(e, h.id)}
                        className={`group block py-1.5 pr-2 text-[13px] leading-[1.5] border-l-2 -ml-px transition-colors ${
                          isActive
                            ? "border-[var(--color-accent)] text-[var(--color-ink)] font-medium"
                            : "border-transparent text-[var(--color-mute)] active:text-[var(--color-ink)]"
                        }`}
                      >
                        <span className="line-clamp-2">{h.text}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </details>
        </div>
      )}

      {/* body + sidebar (desktop) */}
      <div className="px-5 sm:px-6 lg:px-10 mt-10 sm:mt-12 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-8">
            {/* TOC — desktop only (mobile version is above) */}
            {toc.length > 1 && (
              <div className="hidden lg:block">
                <SectionLabel index="00" label="Contents" meta={`${toc.length}`} />
                <nav aria-label="Table of contents">
                  <ul className="border-l border-[var(--color-line)]">
                    {toc.map((h) => {
                      const isActive = h.id === activeId;
                      return (
                        <li
                          key={h.id}
                          className={`relative ${h.level >= 3 ? "pl-6" : h.level === 2 ? "pl-4" : "pl-3"}`}
                        >
                          <a
                            href={`#${h.id}`}
                            onClick={(e) => onTocClick(e, h.id)}
                            className={`group block py-1.5 pr-2 text-[13px] leading-[1.5] border-l-2 -ml-px transition-colors ${
                              isActive
                                ? "border-[var(--color-accent)] text-[var(--color-ink)] font-medium"
                                : "border-transparent text-[var(--color-mute)] hover:text-[var(--color-ink)]"
                            }`}
                          >
                            <span className="line-clamp-2">{h.text}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            )}

            <div>
              <SectionLabel index="01" label="About" />
              <dl className="text-[13px] space-y-2.5">
                <SpecRow k="Published" v={formatDate(post.date)} />
                <SpecRow k="Category" v={post.category} />
                {post.tags.length > 0 && (
                  <SpecRow k="Tags" v={post.tags.join(", ")} />
                )}
              </dl>
            </div>

            {related.length > 0 && (
              <div>
                <SectionLabel index="02" label="More in category" />
                <ul className="border-t border-[var(--color-line)]">
                  {related.map((r) => (
                    <li key={r.slug} className="border-b border-[var(--color-line)]">
                      <Link to={`/blog/${r.slug}`} className="block py-3 group">
                        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[var(--color-mute)] mb-0.5">
                          {formatDate(r.date)}
                        </div>
                        <div className="text-[14px] font-medium leading-snug text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                          {r.title}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* prev/next */}
      <nav className="border-t border-[var(--color-line)]">
        <div className="px-5 sm:px-6 lg:px-10 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-line)]">
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className="py-6 sm:py-8 sm:pr-6 group block">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-1.5">
                ← Older · {formatDate(prev.date)}
              </div>
              <div className="text-[16px] sm:text-[18px] font-semibold leading-snug text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="py-6 sm:py-8 sm:pr-6" />
          )}
          {next ? (
            <Link to={`/blog/${next.slug}`} className="py-6 sm:py-8 sm:pl-6 group block text-left sm:text-right">
              <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-1.5">
                Newer · {formatDate(next.date)} →
              </div>
              <div className="text-[16px] sm:text-[18px] font-semibold leading-snug text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {next.title}
              </div>
            </Link>
          ) : (
            <div className="py-6 sm:py-8 sm:pl-6" />
          )}
        </div>
      </nav>
    </article>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-[var(--color-line-soft)] pb-2 last:border-b-0 last:pb-0">
      <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-right text-[var(--color-ink-2)] font-medium">{v}</dd>
    </div>
  );
}
