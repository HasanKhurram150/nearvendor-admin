import React from "react";
import { useLanguage } from "./LanguageContext";

export const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-full border border-gray-300 dark:border-gray-800 overflow-hidden text-sm font-medium">
    <button
      onClick={() => language !== "en" && toggleLanguage()}
      className={`px-4 py-2 transition ${
        language === "en"
          ? "bg-[#1862D4] text-white"
          : "bg-transparent dark:text-white text-gray-800 hover:bg-transparent"
      }`}
    >
      🇺🇸 EN
    </button>
    <button
      onClick={() => language !== "ko" && toggleLanguage()}
      className={`px-4 py-2 transition ${
        language === "ko"
          ? "bg-[#1862D4] text-white"
          : "bg-transparent dark:text-white text-gray-800 hover:bg-transparent"
      }`}
    >
      🇰🇷 KO
    </button>
  </div>
  );
};
