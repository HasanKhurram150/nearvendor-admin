import CampaignManagement from "@/components/campaign-management/campaign-management";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Campaign Management",
  description: "Campaign Management",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb
        pageTitle="Campaign Management"
        counter={true}
        counterText="Total Campaign"
        counterValue={0}
        btnCampaign={true}
      />
      <CampaignManagement />
    </div>
  );
}
