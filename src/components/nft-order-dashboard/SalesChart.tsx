"use client";
import React from "react";
import dynamic from "next/dynamic";
import { INftOrderSalesData } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import { useLanguage } from "@/components/common/LanguageContext";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function SalesChart({ salesData }: { salesData: INftOrderSalesData | undefined }) {
  const { t } = useLanguage();

  const chartData = salesData ?? [];

  const categories = chartData.map(([ts]) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );
  const values = chartData.map(([, amount]) => amount);

  const options: ApexOptions = {
    colors: ["#32AA00"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "line",
      height: 280,
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "12px" },
        formatter: (val: number) => `${parseInt(val.toString(), 10)}%`,
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.06)",
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${val.toFixed(2)}%`,
      },
    },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
  };

  const series = [
    {
      name: t("salesAmount"),
      data: values,
    },
  ];

  return (
    <div className="dashboard-card h-full flex flex-col">
      <div className="px-6 py-5 border-b border-[#222328]">
        <h3 className="text-[16px] font-medium text-white">{t("salesOverTime")}</h3>
      </div>
      
      <div className="p-6 flex-1">
        {chartData.length > 0 ? (
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={280}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[280px] text-gray-500">
            {t("noSalesData")}
          </div>
        )}
      </div>
    </div>
  );
}
