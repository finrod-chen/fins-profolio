import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { SiteFoot } from "@/components/SiteFoot";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { Skeleton } from "@/components/arc/skeleton/skeleton";
import { HomePage } from "@/pages/HomePage";
import styles from "./App.module.css";

// Route-level code splitting: keep the landing page lean. The About page,
// work detail, and especially the blog pages (which pull in react-markdown
// and the full markdown corpus) load only when their route is visited.
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage }))
);
const WorkDetailPage = lazy(() =>
  import("@/pages/WorkDetailPage").then((m) => ({ default: m.WorkDetailPage }))
);
const BlogIndexPage = lazy(() =>
  import("@/pages/BlogIndexPage").then((m) => ({ default: m.BlogIndexPage }))
);
const BlogPostPage = lazy(() =>
  import("@/pages/BlogPostPage").then((m) => ({ default: m.BlogPostPage }))
);
const RecommendsPage = lazy(() =>
  import("@/pages/RecommendsPage").then((m) => ({ default: m.RecommendsPage }))
);

/** Reset scroll on route change so deep links start at the top. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

/** Placeholder in the shape of a page, while a lazily-loaded chunk arrives. */
function RouteFallback() {
  return (
    <div className="page band" aria-busy="true">
      <Skeleton label="載入頁面" lines={6} />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();
  return (
    <div className={styles.shell}>
      <ScrollToTop />
      <SiteNav />
      <main className={styles.main}>
        {/* key={pathname} resets the boundary's error state on navigation,
            so a one-off chunk failure doesn't lock out later routes. */}
        <RouteErrorBoundary key={pathname}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work/:id" element={<WorkDetailPage />} />
              <Route path="/blog" element={<BlogIndexPage />} />
              <Route path="/blog/*" element={<BlogPostPage />} />
              <Route path="/recommends" element={<RecommendsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <SiteFoot />
    </div>
  );
}

export default App;
