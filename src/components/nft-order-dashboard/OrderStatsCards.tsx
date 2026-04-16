"use client";
import React from "react";
// import { INftOrderStats } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import { useLanguage } from "@/components/common/LanguageContext";

interface StatCard {
  label: string;
  value: string | number;
  subLabel?: string;
}

function formatAmount(value: string | undefined): string {
  if (!value) return "0";
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function OrderStatsCards({ stats }: { stats: any }) {
  const { t } = useLanguage();

  if (!stats) return null;

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
    },
    {
      label: "Total Vendors",
      value: stats.totalVendors,
    },
    {
      label: "Pending Apps",
      value: stats.pendingVendors,
    },
    {
      label: "Buyers",
      value: stats.roleDistribution.buyers,
    },
    {
      label: "Vendors",
      value: stats.roleDistribution.vendors,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="dashboard-card p-5 md:p-6 flex flex-col justify-center border border-white/[0.04]"
        >
          <span className="text-[12px] font-medium text-gray-500 uppercase tracking-wider">
            {card.label}
          </span>
          <h4 className="mt-3 font-bold text-white text-[28px]">
            {card.value}
          </h4>
        </div>
      ))}
    </div>
  );
}
