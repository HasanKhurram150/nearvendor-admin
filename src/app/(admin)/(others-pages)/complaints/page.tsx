import type { Metadata } from "next";
import React from "react";
import { ComplaintsList } from "@/components/complaints/ComplaintsList";

export const metadata: Metadata = {
    title: "Complaints",
    description: "Manage Complaints",
};

export default function Page() {
    return <ComplaintsList />;
}
