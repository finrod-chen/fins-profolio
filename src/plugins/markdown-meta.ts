import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";
import { parseFrontmatter } from "../data/frontmatter";

const SUFFIX = "?meta";

/**
 * Serves `*.md?meta` as a module holding only that post's frontmatter.
 *
 * The blog index, the home page's post count and every related-posts list
 * need titles and dates, not prose. Without this, the one eager `?raw` glob
 * that used to build the index pulled all 59 post bodies into any chunk that
 * touched the blog data (about 138 kB gzipped, on the landing page included).
 * Metadata now comes from here and a body loads only with the post that
 * shows it.
 */
export function markdownMeta(): Plugin {
  return {
    name: "markdown-meta",
    // Ahead of Vite's own handling, which would treat an .md import as an asset.
    enforce: "pre",
    async load(id) {
      if (!id.endsWith(SUFFIX)) return null;
      const file = id.slice(0, -SUFFIX.length);
      if (!file.endsWith(".md")) return null;
      this.addWatchFile(file);
      const raw = await readFile(file, "utf8");
      const { data } = parseFrontmatter(raw);
      return `export default ${JSON.stringify(data)};`;
    },
    // Editing a post should refresh its metadata module too, not only its body.
    handleHotUpdate({ file, server, modules }) {
      if (!file.endsWith(".md")) return;
      const meta = server.moduleGraph.getModuleById(file + SUFFIX);
      return meta ? [...modules, meta] : modules;
    },
  };
}
