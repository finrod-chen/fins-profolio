// ============================================================
// Blog data layer
//
// Build-time loader for markdown posts under src/content.
// - the ?meta glob is eager and holds frontmatter only, so listing posts
//   costs a few kB instead of the whole corpus (see src/plugins/markdown-meta.ts)
// - the ?raw glob is lazy: a post's body arrives with the post that shows it
// - filename pattern YYYY-MM-DD-... gives us the publish date
// - relative path ../content/<category>/... gives us the category
// - sorted newest first
// ============================================================
import { stripFrontmatter, type Frontmatter } from "./frontmatter";

// Frontmatter for every post, resolved at build time.
const metaFiles = import.meta.glob<Frontmatter>("../content/**/*.md", {
  eager: true,
  query: "?meta",
  import: "default",
});

// One loader per post body, each its own chunk.
const bodyFiles = import.meta.glob<string>("../content/**/*.md", {
  query: "?raw",
  import: "default",
});

export interface BlogPost {
  /** url slug, e.g. "biotechnology/2013-10-08-57th-pharmacyforum" */
  slug: string;
  /** display title from frontmatter.title, fallback to filename */
  title: string;
  /** short description */
  description: string;
  /** ISO date string YYYY-MM-DD */
  pubDate: string;
  /** Date object for sorting */
  date: Date;
  /** tags */
  tags: string[];
  /** hero image url, optional */
  heroImage?: string;
  /** category (folder name) */
  category: string;
}

/** The glob key a post's body lives under, kept out of the public type. */
const bodyPathBySlug = new Map<string, string>();

// parse + normalise
const allPosts: BlogPost[] = Object.entries(metaFiles)
  .map(([path, data]) => {
    const m = path.match(/\/content\/([^/]+)\/([^/]+)\.md$/);
    if (!m) return null;
    const [, category, filename] = m;

    // date from filename or frontmatter
    const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
    let isoDate = "1970-01-01";
    if (dateMatch) {
      isoDate = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
    } else if (data.pubDate) {
      const d = new Date(data.pubDate);
      if (!Number.isNaN(d.getTime())) isoDate = d.toISOString().slice(0, 10);
    }

    // tags: comma-separated string
    const tags = data.tags
      ? data.tags.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const slug = `${category}/${filename}`;
    bodyPathBySlug.set(slug, path);

    return {
      slug,
      title: data.title || filename,
      description: data.description || "",
      pubDate: isoDate,
      date: new Date(isoDate),
      tags,
      heroImage: data.heroImage || undefined,
      category,
    } as BlogPost;
  })
  .filter((p): p is BlogPost => p !== null);

// newest first
allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

export const posts: readonly BlogPost[] = Object.freeze(allPosts);

// categories sorted by their newest post
export const categories: { name: string; count: number; latest: Date }[] = (() => {
  const map = new Map<string, { count: number; latest: Date }>();
  for (const p of posts) {
    const cur = map.get(p.category);
    if (!cur) map.set(p.category, { count: 1, latest: p.date });
    else {
      cur.count++;
      if (p.date > cur.latest) cur.latest = p.date;
    }
  }
  return Array.from(map.entries())
    .map(([name, info]) => ({ name, ...info }))
    .sort((a, b) => b.latest.getTime() - a.latest.getTime());
})();

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function postsByCategory(category: string | "All"): readonly BlogPost[] {
  if (category === "All") return posts;
  return posts.filter((p) => p.category === category);
}

export function relatedPosts(post: BlogPost, n = 4): readonly BlogPost[] {
  return posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, n);
}

/** Fetches one post's markdown body. Rejects if the slug has no file. */
export async function loadPostBody(slug: string): Promise<string> {
  const path = bodyPathBySlug.get(slug);
  const load = path ? bodyFiles[path] : undefined;
  if (!load) throw new Error(`No markdown body for "${slug}"`);
  return stripFrontmatter(await load());
}
