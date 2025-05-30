
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import EventsManagement from "@/components/events-management/events-management";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Events Management",
  description: "Events Management",
};
export default function page() {

  return (
    <div>
      <PageBreadcrumb pageTitle="Events Management" eventsInfo={true} />
      <EventsManagement />
    </div>
  );
}
