// ============================================================
// Blog data layer
//
// Build-time loader for markdown posts under src/content.
// - import.meta.glob pulls every .md in at build time as raw text
// - tiny inline frontmatter parser (we don't need full YAML)
// - filename pattern YYYY-MM-DD-... gives us the publish date
// - relative path ../content/<category>/... gives us the category
// - sorted newest first
// ============================================================

// eager:true, query:?raw → string at build time
const rawFiles = import.meta.glob<string>("../content/**/*.md", {
  eager: true,
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
  /** raw markdown body (frontmatter stripped) */
  body: string;
}

/**
 * Tiny frontmatter parser — only handles the shape Astro uses:
 *   key: value
 *   tags: a, b, c           (comma-separated)
 *   heroImage: https://...
 * Lines starting with `---` delimit the block.
 */
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const [, yamlBlock, content] = m;
  const data: Record<string, string> = {};
  for (const line of yamlBlock.split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    // strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, content };
}

// parse + normalise
const allPosts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const m = path.match(/\/content\/([^/]+)\/([^/]+)\.md$/);
    if (!m) return null;
    const [, category, filename] = m;

    const { data, content } = parseFrontmatter(raw);

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

    return {
      slug: `${category}/${filename}`,
      title: data.title || filename,
      description: data.description || "",
      pubDate: isoDate,
      date: new Date(isoDate),
      tags,
      heroImage: data.heroImage || undefined,
      category,
      body: content,
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

