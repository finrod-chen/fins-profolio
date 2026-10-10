import { useCallback, useSyncExternalStore } from "react";
import type { Theme } from "@/components/arc/theme-switch/theme-switch";

const STORAGE_KEY = "finrod-theme";

/**
 * Light/dark for Arc's token set, which keys off `data-theme` on <html>.
 *
 * The stored choice is read through useSyncExternalStore with a fixed
 * server snapshot, so the first render never depends on localStorage
 * (Arc's rule: no browser-only values in the first render). A tiny
 * inline script in index.html stamps the attribute before paint, so
 * there is no flash of the wrong theme.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function read(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    read,
    () => "light",
  );

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.dataset.theme = next;
    for (const listener of listeners) listener();
  }, []);

  return { theme, setTheme };
}
