import UserManagement from "@/components/user-management/user-management";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User",
  description: "User Management",
};

export default function page() {
  return <UserManagement />;
}
