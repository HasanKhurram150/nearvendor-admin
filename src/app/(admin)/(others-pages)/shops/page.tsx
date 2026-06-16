import ShopCategoriesManagement from "@/components/shops/shop-categories-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shops",
  description: "Shop Categories Management",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function ShopsPage() {
  return <ShopCategoriesManagement />;
}
