
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PlacementList from "@/components/placement-list/placement-list";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Placement List",
  description: "Placement List",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Placement List" />
      <PlacementList />
    </div>
  );
}
