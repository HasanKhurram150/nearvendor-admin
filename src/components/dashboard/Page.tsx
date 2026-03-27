"use client";
import { States } from "@/components/dashboard/States";
import React from "react";
import RecentOrders from "@/components/dashboard/Users";
import { useGetDashboardStatsQuery } from "@/services/dashboard-api";
import Loading from "@/components/atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";
import Select from "../form/Select";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading || !stats) return;
  <div className="flex justify-center">
    <Loading size="lg" className="border-[#32AA00]" />
  </div>;

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      <div className="col-span-12 flex items-center justify-between mb-2">
        <h2 className="text-white text-[22px] font-semibold tracking-tight">
          {t("dashboard")}
        </h2>
        <Select
          options={[
            { value: "all", label: "All Time" },
            { value: "daily", label: "Daily" },
            { value: "weekly", label: "Weekly" },
            { value: "monthly", label: "Monthly" },
          ]}
          defaultValue="all"
          onChange={() => {}}
          className="w-[160px]"
        />
      </div>
      <div className="col-span-12">
        <States stats={stats} />
      </div>
      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
