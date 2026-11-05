import { absoluteUrl } from "@/lib/site";

const SITE_NAME = "Finrod Chen";
const DEFAULT_IMAGE = "/og-image.png";

interface SeoProps {
  title: string;
  description: string;
  /** Site path of this page, e.g. "/about". Becomes the canonical URL. */
  path: string;
  /** Path or absolute URL. Defaults to the site-wide OG image. */
  image?: string;
  type?: "website" | "article";
  /** Structured data for the page, written out as one JSON-LD script. */
  jsonLd?: Record<string, unknown>;
}

/**
 * Every head tag a page needs. React 19 hoists these into <head>, both in the
 * prerendered HTML (scripts/prerender.mjs) and on client-side navigation.
 */
export function Seo({ title, description, path, image, type = "website", jsonLd }: SeoProps) {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image ?? DEFAULT_IMAGE);
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {jsonLd && (
        <script
          type="application/ld+json"
          // "<" is escaped so no string in the data can close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}

/** Head tags for a not-found state: a title, and keep it out of the index. */
export function NotFoundSeo({ title }: { title: string }) {
  return (
    <>
      <title>{title}</title>
      <meta name="robots" content="noindex" />
    </>
  );
}
