"use client";
import React from "react";
import Image from "next/image";
import { IDashboardStats } from "@/services/dashboard-api/dashboard-api.types";
import { formatNumber } from "@/utils";
import { dashboardAPI } from "@/services/dashboard-api";
import { useLanguage } from "../common/LanguageContext";

export const States = ({ stats }: { stats: IDashboardStats | undefined }) => {
  const { t } = useLanguage();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {/* <!-- State Item Start --> */}
      <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-xl text-black dark:text-white">
              {t("totalEvents")}
            </span>
            <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
              {!!stats && formatNumber(stats.totalEvents)}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
          <Image
            src="/images/logo/total-events.webp"
            width={180}
            height={160}
            alt="state"
            className="rounded-xl"
          />
        </div>
      </div>
      {/* <!-- State Item End --> */}

      {/* <!-- State Item Start --> */}
      <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-5">
          <div>
                <span className="text-xl text-black dark:text-white">
              {t("totalUsers")}
            </span>
            <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
              {!!stats && formatNumber(stats.totalUsers)}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
          <Image
            src="/images/logo/total-users.webp"
            width={180}
            height={160}
            alt="state"
            className="rounded-xl"
          />
        </div>
      </div>
      {/* <!-- State Item End --> */}
      {/* <!-- State Item Start --> */}
      <div className="flex justify-between items-center rounded-2xl bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-end justify-between mt-5">
          <div>
                <span className="text-xl text-black dark:text-white">
              {t("dailyEvents")}
            </span>
            <h4 className="mt-2 font-bold text-[#202224] text-[2.25rem] dark:text-white/90">
              {!!stats && formatNumber(stats.dailyEvents)}
            </h4>
          </div>
        </div>
        <div className="flex items-center justify-center w-[11.25rem] h-[10rem] rounded-xl dark:bg-gray-800">
          <Image
            src="/images/logo/daily-events.webp"
            width={180}
            height={160}
            alt="state"
            className="rounded-xl"
          />
        </div>
      </div>
      {/* <!-- State Item End --> */}
    </div>
  );
};
