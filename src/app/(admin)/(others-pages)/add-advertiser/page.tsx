import AddAdvertiser from "@/components/add-advertiser/add-advertiser";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Advertisern",
  description: "Add Advertiser",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add Advertiser" />
      <AddAdvertiser />
    </div>
  );
}
