import type { Metadata } from "next";
import React from "react";
import { AdSpace } from "@/components/ad-space/AdSpace";

export const metadata: Metadata = {
    title: "Ad Space",
    description: "Ad Management Dashboard",
};

export default function Page() {
    return <AdSpace />;
}
