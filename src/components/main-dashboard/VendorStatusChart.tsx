"use client";

import React from "react";
import { useLanguage } from "@/components/common/LanguageContext";

interface BreakdownData {
  approved: number;
  pending: number;
  rejected: number;
}

export function VendorStatusChart({
  title,
  data,
}: {
  title: string;
  data: BreakdownData | undefined;
}) {
  const { t } = useLanguage();

  if (!data) return null;

  const items = [
    {
      label: "Approved",
      value: data.approved || 0,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Pending",
      value: data.pending || 0,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Rejected",
      value: data.rejected || 0,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="dashboard-card p-5 md:p-6 h-full border border-white/4">
      <h3 className="text-lg font-semibold text-white mb-6 tracking-tight">
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex items-center justify-between p-4 rounded-2xl ${item.bg} border border-white/5 transition-transform hover:scale-[1.01] duration-300`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${item.color.replace(
                  "text",
                  "bg",
                )}`}
              />
              <span className="text-white font-medium text-sm">
                {item.label}
              </span>
            </div>
            <span className={`${item.color} font-bold text-lg`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-5 border-t border-white/5">
        <div className="flex justify-between items-center text-[11px] text-gray-500 uppercase tracking-widest font-bold">
          <span>Total Applications</span>
          <span className="text-gray-300">
            {(data.approved || 0) + (data.pending || 0) + (data.rejected || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
