"use client";
import React from "react";
import { INftOrderStats } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import { useLanguage } from "@/components/common/LanguageContext";

function formatAmount(value: string | undefined): string {
  if (!value) return "0";
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

interface StatusItem {
  label: string;
  value: number;
  color: string;
}

export function OrderStatusBreakdown({ stats }: { stats: INftOrderStats | undefined }) {
  const { t } = useLanguage();

  if (!stats) return null;

  const statuses: StatusItem[] = [
    { label: t("awaitingPayment"), value: stats.awaitingPaymentOrders, color: "bg-gray-400" },
    { label: t("completed"), value: stats.completedOrders, color: "bg-[#32AA00]" },
    { label: t("expired"), value: stats.expiredOrders, color: "bg-red-500" },
  ];

  const total = stats.totalOrders || 1;

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="px-6 py-5 border-b border-[#222328]">
        <h3 className="text-[16px] font-medium text-white">{t("orderStatus")}</h3>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        {/* Status bars */}
        <div className="space-y-6">
          {statuses.map((status) => (
            <div key={status.label}>
              <div className="flex justify-between text-[13px] mb-2">
                <span className="text-gray-400 font-medium">{status.label}</span>
                <span className="text-white font-semibold">{status.value}</span>
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-[6px]">
                <div
                  className={`${status.color} h-[6px] rounded-full transition-all duration-500`}
                  style={{ width: `${(status.value / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary metrics */}
        <div className="mt-8 grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <span className="text-[12px] text-gray-500 font-medium">{t("averageSaleAmount")}</span>
            <p className="text-white font-bold text-[15px] mt-1">{formatAmount(stats.averageSaleAmount)}</p>
          </div>
          <div>
            <span className="text-[12px] text-gray-500 font-medium">{t("pendingRevenue")}</span>
            <p className="text-white font-bold text-[15px] mt-1">{formatAmount(stats.pendingRevenue)}</p>
          </div>
          <div>
            <span className="text-[12px] text-gray-500 font-medium">{t("expiredOrderValue")}</span>
            <p className="text-white font-bold text-[15px] mt-1">{formatAmount(stats.expiredOrderValue)}</p>
          </div>
          <div>
            <span className="text-[12px] text-gray-500 font-medium">{t("avgItemsPerSale")}</span>
            <p className="text-white font-bold text-[15px] mt-1">{parseFloat(stats.averageItemsPerSale || "0").toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
