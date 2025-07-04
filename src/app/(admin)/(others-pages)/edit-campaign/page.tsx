import AddCampaign from "@/components/add-campaign/add-campaign";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditCampaign from "@/components/edit-campaign/edit-campaign";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Campaign",
  description: "Edit Campaign",
};
export default function page() {
  return <EditCampaign />;
}
