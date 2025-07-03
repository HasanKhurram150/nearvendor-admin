import { useLanguage } from "../common/LanguageContext";

export const usePackageColumns = () => {
  const { t } = useLanguage();

  return [
    { id: "1", header: t("interval"), className: "min-w-[15rem]" },
    { id: "2", header: t("amount"), className: "min-w-[15rem]" },
    { id: "3", header: t("action"), className: "min-w-[10rem]" },
  ];
};
