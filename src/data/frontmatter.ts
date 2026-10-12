/**
 * Tiny frontmatter parser, only the shape these posts use:
 *
 *   key: value
 *   tags: a, b, c           (comma-separated)
 *   heroImage: https://...
 *
 * Lines of `---` delimit the block.
 *
 * Shared by the browser bundle and the `markdown-meta` Vite plugin, which
 * runs it in Node at build time, so it must stay free of browser globals.
 */
export interface Frontmatter {
  [key: string]: string;
}

export function parseFrontmatter(raw: string): { data: Frontmatter; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const [, yamlBlock, content] = m;
  const data: Frontmatter = {};
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

/** Everything after the frontmatter block. */
export function stripFrontmatter(raw: string): string {
  return parseFrontmatter(raw).content;
}
