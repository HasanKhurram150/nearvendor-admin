import React from "react";
import { ComplaintDetails } from "@/components/complaints/ComplaintDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ComplaintDetails id={id} />;
}
