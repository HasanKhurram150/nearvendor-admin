import Events from "@/components/events/events";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Events",
  description: "Events",
};
export default function page() {
  return <Events />;
}
