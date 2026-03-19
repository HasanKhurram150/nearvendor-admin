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
    colors: ["#50FF56"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 280,
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 100],
      },
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
        formatter: (val: number) => val.toFixed(2),
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
        formatter: (val: number) => `${val.toFixed(6)}`,
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
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 md:p-6 h-full">
      <h3 className="text-lg font-semibold text-white mb-4">{t("salesOverTime")}</h3>
      {chartData.length > 0 ? (
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={280}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[280px] text-gray-500">
          {t("noSalesData")}
        </div>
      )}
    </div>
  );
}
