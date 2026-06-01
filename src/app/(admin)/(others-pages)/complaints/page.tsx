import type { Metadata } from "next";
import React from "react";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

export const metadata: Metadata = {
  title: "Complaints",
  description: "Manage Complaints",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function Page() {
  return <ComplaintsList />;
}
