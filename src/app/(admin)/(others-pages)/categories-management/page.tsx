

import CategoriesManagement from "@/components/categories-management/categories-management";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Categories Management",
  description: "Categories Management",
};
export default function page() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Categories Management" categoryInfo={true} />
      <CategoriesManagement />
    </div>
  );
}
