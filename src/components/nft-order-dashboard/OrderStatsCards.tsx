"use client";
import React from "react";
import { INftOrderStats } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
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

export function OrderStatsCards({ stats }: { stats: INftOrderStats | undefined }) {
  const { t } = useLanguage();

  if (!stats) return null;

  const cards: StatCard[] = [
    {
      label: t("totalOrders"),
      value: stats.totalOrders,
    },
    {
      label: t("completedOrders"),
      value: stats.completedOrders,
    },
    {
      label: t("totalAmountSold"),
      value: formatAmount(stats.totalAmountSold),
    },
    {
      label: t("totalQuantitySold"),
      value: stats.totalQuantitySold,
    },
    {
      label: t("uniqueBuyers"),
      value: stats.uniqueBuyers,
    },
    {
      label: t("completionRate"),
      value: `${stats.completionRate}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="dashboard-card p-5 md:p-6 flex flex-col justify-center"
        >
          <span className="text-[14px] font-medium text-gray-400 tracking-wide">{card.label}</span>
          <h4 className="mt-3 font-bold text-white text-[24px]">
            {card.value}
          </h4>
        </div>
      ))}
    </div>
  );
}
