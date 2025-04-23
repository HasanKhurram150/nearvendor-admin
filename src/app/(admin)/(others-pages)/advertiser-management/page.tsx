
import AdvertiserManagement from "@/components/advertiser-management/advertiser-management";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Advertiser Management",
  description: "Advertiser Management",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Advertiser Management" />
      <AdvertiserManagement />
    </div>
  );
}
