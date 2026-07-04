import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { findPost, posts, relatedPosts } from "@/data/blog";
import { SectionLabel } from "@/components/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

// ─── TOC extract ─────────────────────────────────────────────
interface Heading {
  id: string;
  level: number;
  text: string;
}
function extractToc(body: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = body.split(/\r?\n/);
  let inFence = false;
  const out: Heading[] = [];
  for (const line of lines) {
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
        if (bestId === null && els[0]) {
          if (els[0].getBoundingClientRect().top < window.innerHeight) {
            bestId = els[0].id;
          }
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

// ─── Main ────────────────────────────────────────────────────

export function BlogPostPage() {
  useReveal();
  const { "*": splat } = useParams();
  const slug = splat ?? "";
  const post = useMemo(() => findPost(slug), [slug]);
  const toc = useMemo(() => (post ? extractToc(post.body) : []), [post]);
  const tocIds = useMemo(() => toc.map((h) => h.id), [toc]);
  const activeId = useScrollSpy(tocIds);

  if (!post) {
    return (
      <div className="page-in px-5 sm:px-8 lg:px-12 py-24 sm:py-36 text-center">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-3">
          Error · 404
        </div>
        <h1 className="font-display text-[clamp(28px,5vw,48px)] font-medium tracking-tight text-[var(--color-ink)]">
          找不到這篇文章
        </h1>
        <p className="mt-3 text-[15px] text-[var(--color-mute)] max-w-md mx-auto">
          文章可能已搬移、刪除、或連結拼錯。
        </p>
        <Link
          to="/blog"
          className="mt-7 inline-flex items-center gap-2 h-11 px-5 bg-[var(--color-ink)] text-[var(--color-paper)] text-[12px] font-mono uppercase tracking-[0.18em] hover:bg-[var(--color-accent)] transition-colors"
        >
          ← Back to blog
        </Link>
      </div>
    );
  }

  const related = relatedPosts(post, 4);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null;
  const next = idx > 0 ? posts[idx - 1] : null;

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit" });

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
      <div className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--color-mute)] hover:text-[var(--color-accent-deep-2)] transition-colors"
        >
          <span aria-hidden>←</span> All Writing
        </Link>
      </div>

      {/* header */}
      <header className="px-5 sm:px-8 lg:px-12 mt-8 sm:mt-10" data-reveal>
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <Link to={`/blog?cat=${post.category}`} className="tag is-accent">
            {post.category}
          </Link>
          <span className="tag">{formatDate(post.date)}</span>
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-display text-[clamp(36px,6vw,72px)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] max-w-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-6 max-w-3xl font-display italic text-[clamp(18px,1.6vw,22px)] leading-[1.5] text-[var(--color-ink-2)]">
            {post.description}
          </p>
        )}
      </header>

      {/* hero image */}
      {post.heroImage && (
        <div
          className="px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16"
          data-reveal
        >
          <div className="border border-[var(--color-ink)]/15 bg-[var(--color-paper-2)] overflow-hidden">
            <img
              src={post.heroImage}
              alt=""
              className="w-full h-auto max-h-[440px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* body + sidebar */}
      <div className="px-5 sm:px-8 lg:px-12 mt-14 sm:mt-20 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-8">
          <div className="prose" data-reveal>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-28 space-y-10">
            {toc.length > 1 && (
              <div>
                <SectionLabel label="Contents" meta={`${toc.length}`} />
                <nav aria-label="Table of contents">
                  <ul className="border-l border-[var(--color-line)]">
                    {toc.map((h) => {
                      const isActive = h.id === activeId;
                      return (
                        <li
                          key={h.id}
                          className={`relative ${
                            h.level >= 3
                              ? "pl-6"
                              : h.level === 2
                                ? "pl-4"
                                : "pl-3"
                          }`}
                        >
                          <a
                            href={`#${h.id}`}
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
              <SectionLabel label="About this entry" />
              <dl className="space-y-3 text-[13px]">
                <SpecRow k="Published" v={formatDate(post.date)} />
                <SpecRow k="Category" v={post.category} />
                {post.tags.length > 0 && (
                  <SpecRow k="Tags" v={post.tags.join(", ")} />
                )}
              </dl>
            </div>

            {related.length > 0 && (
              <div>
                <SectionLabel label="More in this category" />
                <ul className="border-t border-[var(--color-line)]">
                  {related.map((r) => (
                    <li key={r.slug} className="border-b border-[var(--color-line)]">
                      <Link to={`/blog/${r.slug}`} className="block py-3 group">
                        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-mute)] mb-0.5">
                          {formatDate(r.date)}
                        </div>
                        <div className="font-display text-[16px] leading-[1.3] text-[var(--color-ink)] group-hover:text-[var(--color-accent-deep-2)] transition-colors line-clamp-2">
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
      <nav className="border-t border-[var(--color-ink)]/15">
        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-ink)]/15">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="py-8 sm:py-10 sm:pr-6 group block"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-2">
                ← Older · {formatDate(prev.date)}
              </div>
              <div className="font-display text-[clamp(18px,2vw,24px)] font-medium leading-[1.2] tracking-tight text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="py-8 sm:py-10 sm:pr-6" />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="py-8 sm:py-10 sm:pl-6 group block text-left sm:text-right"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)] mb-2">
                Newer · {formatDate(next.date)} →
              </div>
              <div className="font-display text-[clamp(18px,2vw,24px)] font-medium leading-[1.2] tracking-tight text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {next.title}
              </div>
            </Link>
          ) : (
            <div className="py-8 sm:py-10 sm:pl-6" />
          )}
        </div>
      </nav>
    </article>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-baseline gap-3">
      <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--color-mute)]">
        {k}
      </dt>
      <dd className="text-[13px] text-[var(--color-ink)] leading-[1.4]">{v}</dd>
    </div>
  );
}
