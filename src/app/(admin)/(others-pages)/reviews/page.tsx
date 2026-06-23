import { Metadata } from "next";
import React from "react";
import ReviewsManagement from "@/components/reviews/reviews-management";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews Management",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function ReviewsPage() {
  return <ReviewsManagement />;
}
