// Server entry for scripts/prerender.mjs; never hot-reloaded, so it may export data.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { ArcProvider } from "@/components/arc/lib/arc-provider";
import { ArcRouterLink } from "@/lib/arc-link";
import { projects } from "@/data/projects";
import { posts } from "@/data/blog";
import App from "./App.tsx";

export { SITE_URL } from "@/lib/site";

/** Every path worth prerendering, which is also the sitemap. */
export const routes: { path: string; lastmod?: string }[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/blog", lastmod: posts[0]?.pubDate },
  { path: "/recommends" },
  ...projects.map((p) => ({ path: `/work/${p.id}` })),
  ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.pubDate })),
];

/** Renders one path to HTML, waiting for every lazy page and post body. */
export async function render(path: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={path}>
        <ArcProvider link={ArcRouterLink}>
          <App />
        </ArcProvider>
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
