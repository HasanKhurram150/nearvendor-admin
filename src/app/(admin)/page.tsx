import type { Metadata } from "next";
import { States } from "@/components/dashboard/States";
import React from "react";
import RecentOrders from "@/components/dashboard/Users";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <h2 className="mb-4 text-xl text-[#201D1D] font-AzoSansTest-medium">
          Dashboard
        </h2>
      </div>
      <div className="col-span-12">
        <States />
      </div>
      <div className="col-span-12">
        <RecentOrders />
      </div>
    </div>
  );
}
