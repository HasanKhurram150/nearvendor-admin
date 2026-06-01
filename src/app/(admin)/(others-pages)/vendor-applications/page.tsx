import VendorApplications from "@/components/vendor-applications/VendorApplications";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendor Applications",
  description: "Admin Vendor Applications Review",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function page() {
  return <VendorApplications />;
}
