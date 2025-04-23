
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InventoryList from "@/components/inventory-list/inventory-list";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Inventory List",
  description: "Inventory List",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Inventory List" />
      <InventoryList />
    </div>
  );
}
