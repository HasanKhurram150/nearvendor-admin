"use client";
import { States } from "@/components/dashboard/States";
import React from "react";
import RecentOrders from "@/components/dashboard/Users";
import { useGetDashboardStatsQuery } from "@/services/dashboard-api";
import Loading from "@/components/atoms/loading/loading";

export default function DashboardPage() {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading || !stats) return;
  <div className="flex justify-center">
    <Loading size="lg" />
  </div>;

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h2 className="mb-4 text-xl text-[#201D1D] font-AzoSansTest-medium">
          Dashboard
        </h2>
      </div>
      <div className="col-span-12">
        <States stats={stats} />
      </div>
      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
