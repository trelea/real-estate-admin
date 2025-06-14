import { useTranslation } from "react-i18next";

export function useChangeLanguage() {
  const { i18n } = useTranslation();
  const languages = ["ro", "ru", "en"];
  const currentLang = i18n.language;

  const changeLanguage = (lang: string) => {
    if (lang === currentLang) return;
    const pathParts = location.pathname.split("/");
    if (languages.includes(pathParts[1])) {
      pathParts[1] = lang;
    } else {
      pathParts.splice(1, 0, lang);
    }
    const newPath = pathParts.join("/") || "/";
    i18n.changeLanguage(lang);
    window.location.replace(newPath + window.location.search);
  };

  return {
    currentLang,
    languages,
    changeLanguage,
  };
} 