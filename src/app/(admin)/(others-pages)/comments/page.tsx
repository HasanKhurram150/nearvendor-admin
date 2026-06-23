import { Metadata } from "next";
import React from "react";
import CommentsManagement from "@/components/comments/comments-management";

export const metadata: Metadata = {
  title: "Comments",
  description: "Comments Management",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function CommentsPage() {
  return <CommentsManagement />;
}
