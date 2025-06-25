import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PricingManagement from "@/components/pricing-management/pricing-management";
import { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pricing",
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Pricing" pricingInfo={true} />
      <PricingManagement />
    </div>
  );
}
