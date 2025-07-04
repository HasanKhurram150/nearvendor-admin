import { useLanguage } from "../common/LanguageContext";

export const useInventoryColumns = () => {
  const { t } = useLanguage();

  return [
    { id: "1", header: t("inventoryName"), className: "min-w-[15rem]" },
    { id: "2", header: t("inventoryCode"), className: "min-w-[12rem]" },
    { id: "3", header: t("status"), className: "min-w-[8.125rem]" },
    { id: "4", header: t("placement"), className: "min-w-[15rem]" },
    { id: "5", header: t("advertiser"), className: "min-w-[12rem]" },
    { id: "6", header: t("campaignName"), className: "min-w-[10rem]" },
    { id: "7", header: t("exposure"), className: "min-w-[8rem]" },
    { id: "8", header: t("totalClicks"), className: "min-w-[8rem]" },
    { id: "9", header: t("action"), className: "min-w-[8.125rem]" },
  ];
};
