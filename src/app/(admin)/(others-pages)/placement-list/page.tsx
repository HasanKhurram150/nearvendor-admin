import PlacementList from "@/components/placement-list/placement-list";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Placement List",
  description: "Placement List",
};
export default function page() {
  return (
    <div>
      <PlacementList />
    </div>
  );
}
