"use client";
import React from "react";
import { useLanguage } from "@/components/common/LanguageContext";

interface DistributionItem {
  label: string;
  value: number;
  color: string;
}

interface StatCard {
  label: string;
  value: string | number;
  subLabel?: string;
}

export function OrderStatusBreakdown({ stats }: { stats: any }) {
  const { t } = useLanguage();

  if (!stats) return null;

  const distributions: DistributionItem[] = [
    { label: "Buyers", value: stats.roleDistribution.buyers, color: "bg-[#FFFF00]" },
    { label: "Vendors", value: stats.roleDistribution.vendors, color: "bg-blue-500" },
  ];

  const total = stats.totalUsers || 1;

  return (
    <div className="dashboard-card h-full flex flex-col border border-white/[0.04]">
      <div className="px-6 py-5 border-b border-[#222328]">
        <h3 className="text-[16px] font-medium text-white">User Role Distribution</h3>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* Status bars */}
        <div className="space-y-8">
          {distributions.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-[14px] mb-3">
                <span className="text-gray-400 font-medium">{item.label}</span>
                <span className="text-white font-bold">{item.value}</span>
              </div>
              <div className="w-full bg-white/[0.06] rounded-full h-[8px]">
                <div
                  className={`${item.color} h-[8px] rounded-full transition-all duration-500`}
                  style={{ width: `${(item.value / total) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04]">
            <p className="text-xs text-gray-500 leading-relaxed">
                This breakdown shows the current ratio of Buyers to Vendors across the entire platform based on your active filters.
            </p>
        </div>
      </div>
    </div>
  );
}
