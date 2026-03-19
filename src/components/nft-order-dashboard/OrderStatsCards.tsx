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
          className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4 md:p-5"
        >
          <span className="text-sm text-gray-400">{card.label}</span>
          <h4 className="mt-2 font-bold text-white text-2xl">
            {card.value}
          </h4>
        </div>
      ))}
    </div>
  );
}
