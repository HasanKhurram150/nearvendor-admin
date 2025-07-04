import { useLanguage } from "../common/LanguageContext";

export const useAdvertiserColumns = () => {
  const { t } = useLanguage();

  return [
    {
      id: "1",
      header: t("companyName"),
      className: "min-w-[15rem]",
    },
    {
      id: "2",
      header: t("advertiserName"),
      className: "min-w-[15rem]",
    },
    {
      id: "3",
      header: t("registrationNo"),
      className: "min-w-[12rem]",
    },
    {
      id: "4",
      header: t("representative"),
      className: "min-w-[8.125rem]",
    },
    {
      id: "5",
      header: t("departmentName"),
      className: "min-w-[15rem]",
    },
    {
      id: "6",
      header: t("bankName"),
      className: "min-w-[12rem]",
    },
    {
      id: "7",
      header: t("businessRegDoc"),
      className: "min-w-[12rem]",
    },
    {
      id: "7",
      header: t("action"),
      className: "min-w-[8.125rem]",
    },
  ];
};
