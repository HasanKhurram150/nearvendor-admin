import { useLanguage } from "../common/LanguageContext";

export const useEventColumns = () => {
  const { t } = useLanguage();

  return [
    { id: "1", header: t("name"), className: "min-w-[10rem]" },
    { id: "2", header: t("phoneNumber"), className: "min-w-[10rem]" },
    { id: "3", header: t("telegram"), className: "min-w-[10rem]" },
    { id: "4", header: t("date"), className: "min-w-[10rem]" },
    { id: "5", header: t("time"), className: "min-w-[10rem]" },
    { id: "6", header: t("type"), className: "min-w-[10rem]" },
    { id: "7", header: t("link"), className: "min-w-[8rem]" },
    { id: "8", header: t("markAsFeatured"), className: "min-w-[9.5rem]" },
    { id: "9", header: t("approvalStatus"), className: "min-w-[9.5rem]" },
    { id: "10", header: t("actions"), className: "min-w-[12rem]" },
  ];
};
