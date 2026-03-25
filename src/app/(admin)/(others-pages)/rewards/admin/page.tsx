import type { Metadata } from "next";
import React from "react";
import AdminRewards from "@/components/rewards/AdminRewards";

export const metadata: Metadata = {
  title: "Rewards Disbursement",
  description: "Browse all rewards disbursement records",
};

export default function AdminRewardsPage() {
  return <AdminRewards />;
}