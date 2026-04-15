import React from "react";
import { ComplaintDetails } from "@/components/complaints/ComplaintDetails";

export default function Page({ params }: { params: { id: string } }) {
  return <ComplaintDetails id={params.id} />;
}
