"use client";
import React from "react";
import { useLanguage } from "@/components/common/LanguageContext";

interface BreakdownItem {
  key: string;
  label: string;
  completedOrders: number;
  quantitySold: number;
  totalAmountSold: string;
}

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function SalesBreakdown({
  title,
  data,
}: {
  title: string;
  data: BreakdownItem[] | undefined;
}) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-5">{title}</h3>

      {!data || data.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t("noDataAvailable")}</p>
      ) : (
        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]"
            >
              <div>
                <span className="text-white font-medium">{item.label}</span>
                <div className="flex gap-3 mt-1 text-xs text-gray-500">
                  <span>
                    {item.completedOrders} {t("orders")}
                  </span>
                  <span>
                    {item.quantitySold} {t("qtySold")}
                  </span>
                </div>
              </div>
              <span className="text-[#50FF56] font-semibold">
                {formatAmount(item.totalAmountSold)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
