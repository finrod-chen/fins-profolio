import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CursorDot } from "@/components/CursorDot";
import { HomePage } from "@/pages/HomePage";

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

/** Minimal fallback while a lazily-loaded route chunk arrives. */
function RouteFallback() {
  return (
    <div className="px-5 sm:px-6 lg:px-10 py-20 sm:py-28 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--color-mute)]">
      Loading…
    </div>
  );
}

function App() {
  return (
    <div className="min-h-svh flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
      <ScrollToTop />
      <CursorDot />
      <Header />
      <main className="flex-1">
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
