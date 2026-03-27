import LoginHistory from "@/components/login-history/LoginHistory";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login History",
  description: "Admin Login History Review",
};

export default function page() {
  return <LoginHistory />;
}
