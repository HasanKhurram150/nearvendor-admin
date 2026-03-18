"use client";
import { States } from "@/components/dashboard/States";
import React from "react";
import RecentOrders from "@/components/dashboard/Users";
import { useGetDashboardStatsQuery } from "@/services/dashboard-api";
import Loading from "@/components/atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";

export default function DashboardPage() {
  const { t } = useLanguage();
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading || !stats) return;
  <div className="flex justify-center">
    <Loading size="lg" className="border-[#50FF56]" />
  </div>;

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      <div className="col-span-12">
        <h2 className="mb-4 font-Arbutus text-white text-xl">
          {t("dashboard")}
        </h2>
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
