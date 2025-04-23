
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import KOLApproval from "@/components/kol-approval/kol-approval";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "KOL Approval",
  description: "KOL Approval",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="KOL Approval" />
      <KOLApproval />
    </div>
  );
}
