import type { Metadata } from "next";
import React from "react";
import Settlements from "@/components/rewards/Settlements";

export const metadata: Metadata = {
  title: "Settlements",
  description: "Browse all reward settlement batches",
};

export default function SettlementsPage() {
  return <Settlements />;
}
