
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CreateInventory from "@/components/create-inventory/create-inventory";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Inventory",
  description: "Create Inventory",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Create Inventory" />
      <CreateInventory />
    </div>
  );
}
