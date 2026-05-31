import type { Metadata } from "next";
import React from "react";
import MainDashboard from "@/components/main-dashboard/MainDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "User and Vendor Analytics Dashboard",
};

export default function Page() {
  return <MainDashboard />;
}
