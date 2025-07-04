import CategoriesManagement from "@/components/categories-management/categories-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Categories Management",
  description: "Categories Management",
};
export default function page() {
  return <CategoriesManagement />;
}
