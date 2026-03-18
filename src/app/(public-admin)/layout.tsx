import React from "react";
import DashboardShell from "@/layout/DashboardShell";

export default function PublicAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}