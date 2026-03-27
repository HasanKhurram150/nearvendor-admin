import React from "react";
import { useLanguage } from "./LanguageContext";
import { GlobalIcon } from "@/icons";

export const LanguageToggleButton: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/[0.06] shadow-theme-xs"
    >
      <GlobalIcon className="h-5 w-5 text-white/50" />
      <span className="text-white/90">
        {language === "en" ? "Eng" : "Ko"}
      </span>
      <svg
        className="h-4 w-4 text-white/40"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
