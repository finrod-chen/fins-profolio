/**
 * Decides what raw HTML from a post is allowed to reach the page.
 *
 * Post bodies go through rehype-raw, so whatever HTML a markdown file holds
 * renders verbatim. Google once flagged this site over embedded third-party
 * content, so the renderer now makes that call instead of the file: anything
 * that can execute or collect input is dropped, and an iframe survives only
 * when its src is on a host we vouch for.
 */

/** Hosts whose embeds we stand behind, spelled exactly as they are served. */
const allowedEmbedHosts = new Set([
  "www.youtube-nocookie.com",
  "www.youtube.com",
  "www.google.com",
  "www.figma.com",
  "hackmd.io",
]);

/** Tags that run code, load code, or collect input. None belong in a post. */
const strippedTags = new Set([
  "script",
  "style",
  "object",
  "embed",
  "form",
  "input",
  "textarea",
  "select",
  "button",
  "base",
  "link",
  "meta",
]);

/** The only schemes a post may link to or load from. */
const safeProtocols = new Set(["http:", "https:", "mailto:"]);

const urlAttributes = ["href", "src", "action", "formAction", "poster"];

interface HastText {
  type: "text";
  value: string;
}

interface HastElement {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

interface HastParent {
  type: string;
  children?: HastNode[];
}

type HastNode = HastElement | HastText | HastParent;

function isElement(node: HastNode): node is HastElement {
  return node.type === "element";
}

function hasChildren(node: HastNode): node is HastNode & { children: HastNode[] } {
  return Array.isArray((node as { children?: unknown }).children);
}

/** Absolute http(s) URLs only: a relative src can never reach a third party. */
function embedHost(src: unknown): string | undefined {
  if (typeof src !== "string") return undefined;
  try {
    const url = new URL(src, "https://finrod.xyz");
    return url.protocol === "https:" || url.protocol === "http:" ? url.host : undefined;
  } catch {
    return undefined;
  }
}

function isSafeUrl(value: unknown): boolean {
  if (typeof value !== "string") return true;
  const trimmed = value.trim();
  // Relative and anchor links never carry a scheme, so they are fine as they are.
  if (trimmed === "" || !/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return true;
  try {
    return safeProtocols.has(new URL(trimmed).protocol);
  } catch {
    return false;
  }
}

/**
 * A blocked embed becomes a plain link, so the reader still gets the source.
 * With nothing linkable left (no src, or a src we would strip anyway) the
 * embed just goes, rather than leaving a dead link behind.
 */
function linkInstead(src: unknown): HastElement[] {
  if (typeof src !== "string" || src.trim() === "" || !isSafeUrl(src)) return [];
  const href = src.trim();
  return [
    {
      type: "element",
      tagName: "p",
      properties: {},
      children: [
        {
          type: "element",
          tagName: "a",
          properties: { href, target: "_blank", rel: ["nofollow", "noopener", "noreferrer"] },
          children: [{ type: "text", value: href }],
        },
      ],
    },
  ];
}

function cleanProperties(node: HastElement) {
  const properties = node.properties;
  if (!properties) return;
  for (const key of Object.keys(properties)) {
    // Inline handlers and javascript: URLs are the two ways markup runs code.
    if (/^on[a-z]/i.test(key)) delete properties[key];
    else if (urlAttributes.includes(key) && !isSafeUrl(properties[key])) delete properties[key];
  }
}

function clean(node: HastNode): HastNode[] {
  if (!isElement(node)) {
    if (hasChildren(node)) node.children = node.children.flatMap(clean);
    return [node];
  }

  if (strippedTags.has(node.tagName)) return [];

  if (node.tagName === "iframe") {
    const properties = node.properties ?? {};
    // srcdoc renders its own document, so it would walk straight past the host check.
    delete properties.srcDoc;
    delete properties.srcdoc;
    const host = embedHost(properties.src);
    if (!host || !allowedEmbedHosts.has(host)) return linkInstead(properties.src);
    node.properties = { ...properties, loading: "lazy" };
    cleanProperties(node);
    return [node];
  }

  cleanProperties(node);
  if (hasChildren(node)) node.children = node.children.flatMap(clean);
  return [node];
}

export function rehypeSafeEmbeds() {
  return function transform(tree: HastParent) {
    if (Array.isArray(tree.children)) tree.children = tree.children.flatMap(clean);
  };
}
