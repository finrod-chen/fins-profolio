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

interface Heading {
  id: string;
  level: number;
  text: string;
}

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
      <div className="page-in px-5 sm:px-8 lg:px-12 py-24 text-center">
        <div className="eyebrow mb-3">404 · 找不到文章</div>
        <h1 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold text-[var(--color-ink)]">
          找不到這篇文章
        </h1>
        <p className="mt-3 text-[14px] text-[var(--color-mute)] max-w-md mx-auto">
          文章可能已搬移、刪除、或連結拼錯。
        </p>
        <Link
          to="/blog"
          className="mt-7 btn btn-primary"
        >
          <span aria-hidden>←</span> 回到文章列表
        </Link>
      </div>
    );
  }

  const related = relatedPosts(post, 4);
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const prev = idx < posts.length - 1 ? posts[idx + 1] : null;
  const next = idx > 0 ? posts[idx - 1] : null;

  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <article className="page-in">
      <title>{post.title} — 文章</title>
      <meta
        name="description"
        content={post.description || post.title}
      />

      <div className="px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-mute)] hover:text-[var(--color-accent)] transition-colors"
        >
          <span aria-hidden>←</span> 回到文章列表
        </Link>
      </div>

      <header
        className="px-5 sm:px-8 lg:px-12 mt-8 sm:mt-10 relative"
        data-reveal
      >
        <span className="sticker is-coral absolute -top-2 right-5 sm:right-8 lg:right-12 rotate-[3deg] hidden sm:inline-block">Article ✦</span>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link
            to={`/blog?cat=${post.category}`}
            className="chip is-blue"
          >
            {post.category}
          </Link>
          <span className="chip is-out">{formatDate(post.date)}</span>
          {post.tags.slice(0, 4).map((t) => (
            <span key={t} className="chip is-amber">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="font-serif text-[clamp(36px,5.5vw,64px)] font-semibold leading-[1.15] tracking-tight text-[var(--color-ink)] max-w-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 max-w-3xl text-[16px] sm:text-[17px] leading-[1.8] text-[var(--color-ink-2)]">
            {post.description}
          </p>
        )}
      </header>

      {post.heroImage && (
        <div
          className="px-5 sm:px-8 lg:px-12 mt-10 sm:mt-12"
          data-reveal
        >
          <div className="border border-[var(--color-line)] bg-[var(--color-paper-2)] overflow-hidden">
            <img
              src={post.heroImage}
              alt=""
              className="w-full h-auto max-h-[440px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      <div className="px-5 sm:px-8 lg:px-12 mt-12 sm:mt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="prose max-w-prose" data-reveal>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </div>

        <aside className="lg:col-span-4" data-reveal>
          <div className="lg:sticky lg:top-24 space-y-8">
            {toc.length > 1 && (
              <div>
                <SectionLabel title="目錄" />
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
                            className={`block py-1 pr-2 text-[13px] leading-[1.5] border-l-2 -ml-px transition-colors ${
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

            {related.length > 0 && (
              <div>
                <SectionLabel title="相關文章" />
                <ul className="border-t border-[var(--color-line)]">
                  {related.map((r) => (
                    <li
                      key={r.slug}
                      className="border-b border-[var(--color-line)]"
                    >
                      <Link
                        to={`/blog/${r.slug}`}
                        className="block py-3 group"
                      >
                        <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] mb-0.5">
                          {formatDate(r.date)}
                        </div>
                        <div className="font-serif text-[15px] font-medium leading-[1.3] text-[var(--color-ink)] group-hover:text-[var(--color-accent-hover)] transition-colors line-clamp-2">
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

      <nav className="border-t border-[var(--color-line)]">
        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-line)]">
          {prev ? (
            <Link
              to={`/blog/${prev.slug}`}
              className="py-7 sm:pr-6 group block"
            >
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] mb-2">
                ← 較舊 · {formatDate(prev.date)}
              </div>
              <div className="font-serif text-[clamp(16px,1.8vw,20px)] font-medium leading-snug text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {prev.title}
              </div>
            </Link>
          ) : (
            <div className="py-7 sm:pr-6" />
          )}
          {next ? (
            <Link
              to={`/blog/${next.slug}`}
              className="py-7 sm:pl-6 group block text-left sm:text-right"
            >
              <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--color-mute)] mb-2">
                較新 · {formatDate(next.date)} →
              </div>
              <div className="font-serif text-[clamp(16px,1.8vw,20px)] font-medium leading-snug text-[var(--color-ink-2)] group-hover:text-[var(--color-ink)] transition-colors line-clamp-2">
                {next.title}
              </div>
            </Link>
          ) : (
            <div className="py-7 sm:pl-6" />
          )}
        </div>
      </nav>
    </article>
  );
}
