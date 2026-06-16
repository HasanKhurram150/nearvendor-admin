import ShopCategoryDetails from "@/components/shops/shop-category-details";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Shop Category Details",
  description: "Shop Category Details and Shops List",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ShopCategoryDetails categoryId={id} />;
}
