"use client";
import React from "react";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { NftWalletSettings } from "./NftWalletSettings";

const Settings: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <PageBreadcrumb pageTitle={t("settings")} info={t("manageSettings")} />
      <NftWalletSettings />
    </>
  );
};

export default Settings;
