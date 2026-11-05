// Prerenders every route to static HTML after `vite build`.
//
// The site is a client-rendered SPA, so without this a crawler fetching any
// URL got an empty <div id="root"> and the same head tags on every page. Here
// each route from src/entry-server.tsx is rendered in Node (waiting for lazy
// pages and post bodies), its <Seo> tags are lifted into <head>, and the
// result is written next to the client build. The browser then hydrates it.
//
// Files are written as /about -> about.html, which Cloudflare Pages serves at
// the extensionless URL our links already use (no trailing-slash redirect).
// dist/404.html is the not-found page: its presence turns off Pages' SPA
// fallback, so an unknown path gets this page with a real 404 status.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, routes, SITE_URL, NOT_FOUND_PATH } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);
const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) throw new Error("index.html is missing <!--app-html-->");

// React emits hoisted head tags (title, meta, link) ahead of the app markup.
const HEAD_TAG = /^(?:<title>[^<]*<\/title>|<(?:meta|link)\b[^>]*\/?>)/;
function splitHead(html) {
  let head = "";
  let rest = html;
  for (let m = rest.match(HEAD_TAG); m; m = rest.match(HEAD_TAG)) {
    head += m[0];
    rest = rest.slice(m[0].length);
  }
  return { head, body: rest };
}

function fileFor(route) {
  return route === "/" ? path.join(dist, "index.html") : path.join(dist, `${decodeURI(route)}.html`);
}

// A 404.html makes Pages answer unknown paths with a real 404 (and this page),
// instead of its single-page-app fallback of index.html with a 200.
const targets = [...routes.map((r) => r.path), NOT_FOUND_PATH];

let failures = 0;
for (const route of targets) {
  try {
    const { head, body } = splitHead(await render(route));
    const marker = route === NOT_FOUND_PATH ? 'content="noindex"' : 'rel="canonical"';
    if (!head.includes(marker)) throw new Error("rendered without its head tags");
    const html = template
      .replace("</head>", `${head}\n  </head>`)
      .replace("<!--app-html-->", body);
    const file = route === NOT_FOUND_PATH ? path.join(dist, "404.html") : fileFor(route);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, html);
  } catch (err) {
    failures++;
    console.error(`prerender ${route}: ${err instanceof Error ? err.message : err}`);
  }
}
if (failures) throw new Error(`${failures} route(s) failed to prerender`);

const urls = routes
  .map(({ path: route, lastmod }) =>
    `  <url><loc>${SITE_URL}${route}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`)
  .join("\n");
await writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
await writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${routes.length} routes, wrote sitemap.xml and robots.txt`);
