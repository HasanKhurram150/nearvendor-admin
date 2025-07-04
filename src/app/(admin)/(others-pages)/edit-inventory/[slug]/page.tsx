import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EditInventory from "@/components/edit-inventory/edit-inventory";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Update Inventory",
  description: "Update Inventory",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Update Inventory" />
      <EditInventory />
    </div>
  );
}
