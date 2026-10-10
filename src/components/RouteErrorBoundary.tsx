import { Component, type ReactNode } from "react";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import styles from "./RouteErrorBoundary.module.css";

const RELOAD_FLAG = "route-error-reload-attempted";

function isChunkLoadError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  return /dynamically imported module|Failed to fetch|Importing a module script failed/i.test(
    msg
  );
}

/**
 * RouteErrorBoundary — catches render/lazy-import errors from the routed
 * page tree. Without this, a failed `React.lazy()` chunk fetch (e.g. a
 * browser holding a stale index.html right after a new deploy replaces
 * the old hashed chunk files) unmounts the entire app with no fallback —
 * the user just sees a blank page.
 *
 * Chunk-load failures are usually resolved by one fresh page load (new
 * index.html → matching chunk hashes), so we reload once automatically,
 * guarded by sessionStorage so a persistent error can't reload-loop.
 */
export class RouteErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (isChunkLoadError(error) && !sessionStorage.getItem(RELOAD_FLAG)) {
      sessionStorage.setItem(RELOAD_FLAG, "1");
      window.location.reload();
    }
  }

  render() {
    if (this.state.error) {
      const chunk = isChunkLoadError(this.state.error);
      return (
        <div className="page band">
          <EmptyState
            label={chunk ? "頁面載入失敗" : "發生錯誤"}
            title={chunk ? "這一頁沒載進來" : "這裡出了點問題"}
            description={
              chunk
                ? "通常是剛好碰上網站更新，重新整理一次就會好。"
                : "可以重新整理，或先回首頁看看。"
            }
            action={
              <a className={styles.action} href={chunk ? window.location.href : "/"}>
                {chunk ? "重新整理" : "回首頁"}
              </a>
            }
          />
        </div>
      );
    }
    return this.props.children;
  }
}
