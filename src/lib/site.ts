/**
 * The site's public origin. Canonical URLs, og:url and og:image all resolve
 * against it, so search engines credit finrod.xyz and not the pages.dev alias.
 */
export const SITE_URL = "https://finrod.xyz";

/** Turns a site path or an absolute URL into an absolute URL. */
export function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE_URL).href;
}
