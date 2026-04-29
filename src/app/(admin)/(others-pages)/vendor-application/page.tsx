import VendorApplication from "@/components/vendor-application/VendorApplication";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Vendor Application",
  description: "Vendor Application",
};

export default function page() {
  return <VendorApplication />;
}
 