import React from "react";
import DashboardShell from "@/layout/DashboardShell";
import AuthGuard from "@/components/auth/AuthGuard";

export default function PublicAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}