import UserManagement from "@/components/user-management/user-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User",
  description: "User Management",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function page() {
  return <UserManagement />;
}
