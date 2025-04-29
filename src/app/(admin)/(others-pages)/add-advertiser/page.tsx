import AddAdvertiser from "@/components/add-advertiser/add-advertiser";
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
      <PageBreadcrumb pageTitle="Add Advertiser" />
      <AddAdvertiser />
    </div>
  );
}
