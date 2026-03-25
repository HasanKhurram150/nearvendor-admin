import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "../../../i18n/en.json";
import ko from "../../../i18n/kr.json";

type Translations = typeof en;
type Language = "en" | "ko";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (
    key: keyof Translations,
    params?: Record<string, string | number>,
  ) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ko" : "en"));
  };

  const enTranslations = en as Translations;
  const koTranslations = ko as unknown as Translations;

  const translations = language === "en" ? enTranslations : koTranslations;

  const t = (
    key: keyof Translations,
    params?: Record<string, string | number>,
  ) => {
    const template = translations[key] ?? key;

    if (!params) {
      return template;
    }

    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replaceAll(`{{${paramKey}}}`, String(value));
    }, template);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
