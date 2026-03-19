"use client";
import React, { useState } from "react";
import { useGetNftOrderStatsQuery, useGetNftOrderSalesQuery } from "@/services/nft-order-stats-api";
import { TimeSpan } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import Loading from "@/components/atoms/loading/loading";
import { useLanguage } from "@/components/common/LanguageContext";
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
        <Loading size="lg" className="border-[#50FF56]" />
      </div>
    );
  }

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      {/* Header with time span filter */}
      <div className="col-span-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-Arbutus text-white text-xl">
          {t("nftOrderDashboard")}
        </h2>
        <div className="flex gap-2">
          {TIME_SPANS.map((ts) => (
            <button
              key={ts.value}
              onClick={() => setTimeSpan(ts.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeSpan === ts.value
                  ? "bg-[#50FF56] text-black"
                  : "bg-white/[0.05] text-gray-400 hover:bg-white/[0.1] hover:text-white"
              }`}
            >
              {ts.label}
            </button>
          ))}
        </div>
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
