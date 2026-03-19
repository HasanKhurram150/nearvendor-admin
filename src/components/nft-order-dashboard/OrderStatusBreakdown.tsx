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
    { label: t("awaitingPayment"), value: stats.awaitingPaymentOrders, color: "bg-yellow-500" },
    { label: t("partiallyPaid"), value: stats.partiallyPaidOrders, color: "bg-orange-500" },
    { label: t("paymentReceived"), value: stats.paymentReceivedOrders, color: "bg-blue-500" },
    { label: t("processing"), value: stats.processingOrders, color: "bg-purple-500" },
    { label: t("completed"), value: stats.completedOrders, color: "bg-[#50FF56]" },
    { label: t("expired"), value: stats.expiredOrders, color: "bg-red-500" },
  ];

  const total = stats.totalOrders || 1;

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-5">{t("orderStatus")}</h3>

      {/* Status bars */}
      <div className="space-y-4">
        {statuses.map((status) => (
          <div key={status.label}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-400">{status.label}</span>
              <span className="text-white font-medium">{status.value}</span>
            </div>
            <div className="w-full bg-white/[0.06] rounded-full h-2">
              <div
                className={`${status.color} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${(status.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary metrics */}
      <div className="mt-6 pt-5 border-t border-white/[0.06] grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-gray-500">{t("averageSaleAmount")}</span>
          <p className="text-white font-semibold mt-1">{formatAmount(stats.averageSaleAmount)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">{t("pendingRevenue")}</span>
          <p className="text-white font-semibold mt-1">{formatAmount(stats.pendingRevenue)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">{t("expiredOrderValue")}</span>
          <p className="text-white font-semibold mt-1">{formatAmount(stats.expiredOrderValue)}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">{t("avgItemsPerSale")}</span>
          <p className="text-white font-semibold mt-1">{parseFloat(stats.averageItemsPerSale || "0").toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
}
