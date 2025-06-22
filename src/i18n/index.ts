import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";

const resources = {
  en,
  ro,
  ru,
};

const getInitialLanguage = () => {
  const storedLang = localStorage.getItem("language");
  if (storedLang && ["en", "ro", "ru"].includes(storedLang)) return storedLang;

  const match = window.location.pathname.match(/^\/(en|ro|ru)(\/|$)/);
  return match ? match[1] : "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("language", lng);
});
