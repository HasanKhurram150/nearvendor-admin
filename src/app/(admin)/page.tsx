import type { Metadata } from "next";
import React from "react";
import DashboardPage from "@/components/dashboard/Page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
};

export default function Page() {
  return <DashboardPage />;
}
