"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useLanguage } from "./LanguageContext";

interface BreadcrumbProps {
  pageTitle: string;
  info?: string;
  calendarInfo?: boolean;
  eventsInfo?: boolean;
  pricingInfo?: boolean;
  settingsInfo?: boolean;
  counter?: boolean;
  counterText?: string;
  counterValue?: number;
  btnAdvertiser?: boolean;
  btnCampaign?: boolean;
  btnInventory?: boolean;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  info,
  calendarInfo,
  eventsInfo,
  pricingInfo,
  settingsInfo,
  counter,
  counterText,
  counterValue,
  btnCampaign,
  btnInventory,
  btnAdvertiser,
}) => {
  const { t } = useLanguage();
  const router = useRouter();

  const handleAddAdvertiser = () => {
    router.push("/add-advertiser");
  };

  const handleAddCampaign = () => {
    router.push("/add-campaign");
  };

  const handleCreateInventory = () => {
    router.push("/create-inventory");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
      <h2
        className="flex flex-col items-start text-xl font-semibold text-gray-800 dark:text-white/90"
        x-text="pageName"
      >
        {pageTitle}

        {info && (
          <span className="text-base font-normal mt-[1rem]">{info}</span>
        )}
        {/* {calendarInfo && (
          <span className="text-base font-normal mt-[1rem]">
            Manage your Calendars and their settings
          </span>
        )}
        {eventsInfo && (
          <span className="text-base font-normal mt-[1rem]">
            Manage your Events and their settings
          </span>
        )}
        {pricingInfo && (
          <span className="text-base font-normal mt-[1rem]">
            Manage pricing and their settings
          </span>
        )}
        {settingsInfo && (
          <span className="text-base font-normal mt-[1rem]">
            Admin manage receivable email
          </span>
        )} */}

        {counter && (
          <span className="text-base font-normal mt-[1rem]">
            {counterText}: {counterValue}
          </span>
        )}
      </h2>
      {btnAdvertiser && (
        <button
          className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[11.25rem] rounded-md"
          onClick={handleAddAdvertiser}
        >
          {t("createAdvertiser")}
        </button>
      )}
      {btnCampaign && (
        <button
          className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[11.25rem] rounded-md"
          onClick={handleAddCampaign}
        >
          {t("createCampaign")}
        </button>
      )}
      {btnInventory && (
        <button
          className="flex items-center justify-center text-white btn-bg h-[2.5rem] w-[11.25rem] rounded-md"
          onClick={handleCreateInventory}
        >
          {t("createInventory")}
        </button>
      )}

      <nav className="hidden">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800 dark:text-white/90">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
