// ============================================================
// Domain Types
// ============================================================

export type ProjectStatus = "live" | "draft" | "archived";

export interface Project {
  /** Stable id, used for routing */
  id: string;
  /** Display title (zh or en) */
  title: string;
  /** Subtitle / one-line tagline */
  tagline: string;
  /** Long-form description (markdown-free plain text) */
  description: string;
  /** Live URL of the site */
  url?: string;
  /** Source code URL */
  repoUrl?: string;
  /** Year the project was built (or "2024 — 2025") */
  year: string;
  /** Role on the project (e.g. "Design + Build") */
  role: string;
  /** Stack / tools used */
  stack: string[];
  /** Domain / category */
  category: "Web" | "Tool" | "Brand" | "Design" | "Experiment" | "Editorial";
  /** Current status */
  status: ProjectStatus;
  /** Whether this is a featured work */
  featured?: boolean;
  /** Screenshot — local image path under /public. Highest priority. */
  screenshot?: string;
  /**
   * OG image URL of the live site (the og:image meta of `url`).
   * Used as the big preview when no local `screenshot` is set.
   * If it fails to load, the SitePlaceholder name card is shown instead.
   */
  ogImage?: string;
  /** Accent color override, falls back to default accent */
  accent?: string;
  /** Optional gallery */
  gallery?: string[];
  /**
   * Long-form notes for the §02 "Notes" section on the detail page.
   * Each entry becomes its own paragraph; arrays of objects let you
   * mix prose paragraphs with bulleted highlights.
   */
  notes?: NoteSection[];
}

export type NoteSection =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string };

