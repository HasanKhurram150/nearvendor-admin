
import AddCampaign from "@/components/add-campaign/add-campaign";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Campaign",
  description: "Add Campaign",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Campaign" />
      <AddCampaign />
    </div>
  );
}
