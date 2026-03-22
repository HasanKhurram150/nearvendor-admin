import CustomerManagement from "@/components/customer-management/customer-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Customers",
  description: "Customer Management",
};

export default function page() {
  return <CustomerManagement />;
}
