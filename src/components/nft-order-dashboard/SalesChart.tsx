"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/common/LanguageContext";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function SalesChart({ salesData }: { salesData: [number, number][] | undefined }) {
  const { t } = useLanguage();

  const chartData = salesData ?? [];

  const categories = chartData.map(([ts]) =>
    new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  );
  const values = chartData.map(([, count]) => count);

  const options: ApexOptions = {
    colors: ["#FFFF00"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 280,
      toolbar: { show: false },
      background: "transparent",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#9CA3AF", fontSize: "11px" },
        formatter: (val: number) => Math.floor(val).toString(),
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.04)",
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val: number) => `${Math.floor(val)} Users`,
      },
    },
    markers: {
      size: 4,
      colors: ["#FFFF00"],
      strokeColors: "#000",
      strokeWidth: 2,
      hover: { size: 6 },
    },
  };

  const series = [
    {
      name: "New Users",
      data: values,
    },
  ];

  return (
    <div className="dashboard-card h-full flex flex-col border border-white/4">
      <div className="px-6 py-5 border-b border-[#222328]">
        <h3 className="text-[16px] font-medium text-white">User Registration Growth</h3>
      </div>
      
      <div className="p-6 flex-1">
        {chartData.length > 0 ? (
          <div className="max-w-full overflow-x-auto">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={280}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-[280px] text-gray-600 italic text-sm">
            No registration data available for this period
          </div>
        )}
      </div>
    </div>
  );
}
