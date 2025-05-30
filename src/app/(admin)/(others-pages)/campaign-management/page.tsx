import CampaignManagement from "@/components/campaign-management/campaign-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Campaign Management",
  description: "Campaign Management",
};
export default function page() {
  return (
    <div>
      <CampaignManagement />
    </div>
  );
}
