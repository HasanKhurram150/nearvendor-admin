

import CalendarsManagement from "@/components/calendars-management/calendars-management";
import CategoriesManagement from "@/components/categories-management/categories-management";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Calendars Management",
  description: "Calendars Management",
};
export default function page() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Calendars Management" calendarInfo={true} />
      <CalendarsManagement />
    </div>
  );
}
