import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Settings from "@/components/settings/settings";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Settings",
  description: "Settings",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Settings" settingsInfo={true} />
      <Settings />
    </div>
  );
}
