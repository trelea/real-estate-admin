import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import i18n from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { Suspense } from "react";

const resources = {
  en: { translation: { "welcome": "Welcome" } },
  ro: { translation: { "welcome": "Bine ai venit" } },
  ru: { translation: { "welcome": "Добро пожаловать" } },
};

const getLanguageFromUrl = () => {
  const match = window.location.pathname.match(/^\/(en|ro|ru)(\/|$)/);
  return match ? match[1] : "en";
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getLanguageFromUrl(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    detection: {
      order: ["path"],
      lookupFromPathIndex: 0,
    },
  });

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
