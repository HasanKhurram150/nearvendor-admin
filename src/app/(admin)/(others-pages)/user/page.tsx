import User from "@/components/user/User";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "User Details",
  description: "User Details Management",
};

export default function page() {
  return <User />;
}
