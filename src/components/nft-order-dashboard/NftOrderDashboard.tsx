"use client";
import React, { useState } from "react";
import { useGetNftOrderStatsQuery, useGetNftOrderSalesQuery } from "@/services/nft-order-stats-api";
import { TimeSpan } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import Loading from "@/components/atoms/loading/loading";
import { useLanguage } from "@/components/common/LanguageContext";
import Select from "@/components/form/Select";
import { OrderStatsCards } from "./OrderStatsCards";
import { OrderStatusBreakdown } from "./OrderStatusBreakdown";
import { SalesChart } from "./SalesChart";
import { TopSellingNfts } from "./TopSellingNfts";
import { SalesBreakdown } from "./SalesBreakdown";

const TIME_SPANS: { label: string; value: TimeSpan }[] = [
  { label: "All Time", value: "all" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Last Quarter", value: "lastQuarter" },
  { label: "Yearly", value: "yearly" },
];

export default function NftOrderDashboard() {
  const { t } = useLanguage();
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("all");

  const { data: stats, isLoading: statsLoading } = useGetNftOrderStatsQuery(timeSpan);
  const { data: salesData, isLoading: salesLoading } = useGetNftOrderSalesQuery(timeSpan);

  if (statsLoading || salesLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading size="lg" className="border-[#32AA00]" />
      </div>
    );
  }

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      {/* Header with time span filter */}
      <div className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-white text-[22px] font-semibold tracking-tight">
          {t("nftOrderDashboard")}
        </h2>
        <Select
          options={TIME_SPANS}
          defaultValue={timeSpan}
          onChange={(value) => setTimeSpan(value as TimeSpan)}
          className="w-[160px]"
        />
      </div>

      {/* Stats Cards */}
      <div className="col-span-12">
        <OrderStatsCards stats={stats} />
      </div>

      {/* Order Status Breakdown */}
      <div className="col-span-12 lg:col-span-6">
        <OrderStatusBreakdown stats={stats} />
      </div>

      {/* Sales Chart */}
      <div className="col-span-12 lg:col-span-6">
        <SalesChart salesData={salesData} />
      </div>

      {/* Top Selling NFTs */}
      <div className="col-span-12">
        <TopSellingNfts nfts={stats?.topSellingNfts} />
      </div>

      {/* Sales by Chain & Payment Token */}
      <div className="col-span-12 lg:col-span-6">
        <SalesBreakdown
          title={t("salesByChain")}
          data={stats?.salesByChain}
        />
      </div>
      <div className="col-span-12 lg:col-span-6">
        <SalesBreakdown
          title={t("salesByPaymentToken")}
          data={stats?.salesByPaymentToken}
        />
      </div>
    </div>
  );
}
