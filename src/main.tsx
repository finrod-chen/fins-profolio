import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ArcProvider } from "@/components/arc/lib/arc-provider";
import { ArcRouterLink } from "@/lib/arc-link";
import "./styles/global.css";
import App from "./App.tsx";

const app = (
  <StrictMode>
    <BrowserRouter>
      {/* Every link an Arc component renders goes through the router. */}
      <ArcProvider link={ArcRouterLink}>
        <App />
      </ArcProvider>
    </BrowserRouter>
  </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs), so React adopts that
// markup. The dev server and unknown paths start from an empty root.
const root = document.getElementById("root")!;
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
