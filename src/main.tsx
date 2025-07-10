import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import "./i18n/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18n}>
        <NuqsAdapter>
          <App />
        </NuqsAdapter>
      </I18nextProvider>
    </Suspense>
  </StrictMode>
);
