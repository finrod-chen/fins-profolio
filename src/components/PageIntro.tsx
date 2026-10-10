import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/arc/breadcrumb/breadcrumb";
import { InViewTitle } from "@/components/arc/in-view-title/in-view-title";
import styles from "./PageIntro.module.css";

export interface PageIntroProps {
  /** The page's one h1. */
  title: string;
  /** One or two lines saying what the page holds. */
  description?: string;
  /** Path to this page, ending with the page itself. */
  breadcrumbs?: BreadcrumbItem[];
  /** Short facts under the description, such as counts or a date. */
  meta?: string[];
  /** Badges, filters, or actions that belong to the heading. */
  children?: ReactNode;
}

/**
 * The top of an inner page: path, title, one supporting line.
 *
 * The title is the page's single entrance animation, so no other region
 * animates in on scroll.
 */
export function PageIntro({ title, description, breadcrumbs, meta, children }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className={styles.path}>
          <Breadcrumb items={breadcrumbs} ariaLabel="頁面路徑" />
        </div>
      )}
      <InViewTitle as="h1" variant="blur" text={title} className={styles.title} />
      {description && <p className={styles.description}>{description}</p>}
      {meta && meta.length > 0 && (
        <p className={styles.meta}>
          {meta.map((line, index) => (
            <span key={line}>
              {index > 0 && <span aria-hidden="true"> · </span>}
              {line}
            </span>
          ))}
        </p>
      )}
      {children && <div className={styles.extra}>{children}</div>}
    </header>
  );
}
