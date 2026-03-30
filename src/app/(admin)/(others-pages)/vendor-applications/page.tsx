import VendorApplications from "@/components/vendor-applications/VendorApplications";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendor Applications",
  description: "Admin Vendor Applications Review",
};

export default function page() {
  return <VendorApplications />;
}
