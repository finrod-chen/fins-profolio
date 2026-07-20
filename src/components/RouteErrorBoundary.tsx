import { Component, type ReactNode } from "react";

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
      if (isChunkLoadError(this.state.error)) {
        // Reload is already in flight (or was already tried this
        // session) — show a minimal message instead of a blank screen.
        return (
          <div className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 text-center">
            <p className="text-[14px] text-[var(--color-mute)]">
              頁面載入失敗，正在重新整理⋯
            </p>
            <a
              href={window.location.href}
              className="mt-4 inline-block btn btn-ghost"
            >
              手動重新整理
            </a>
          </div>
        );
      }
      return (
        <div className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 text-center">
          <p className="text-[14px] text-[var(--color-mute)]">
            這裡出了點問題。
          </p>
          <a href="/" className="mt-4 inline-block btn btn-ghost">
            回首頁
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
