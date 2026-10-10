import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ArcProvider } from "@/components/arc/lib/arc-provider";
import { ArcRouterLink } from "@/lib/arc-link";
import "./styles/global.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Every link an Arc component renders goes through the router. */}
      <ArcProvider link={ArcRouterLink}>
        <App />
      </ArcProvider>
    </BrowserRouter>
  </StrictMode>,
);
