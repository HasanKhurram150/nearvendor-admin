import Loading from "@/components/atoms/loading/loading";
import VendorApplication from "@/components/vendor-application/VendorApplication";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Vendor Application",
  description: "Vendor Application",
};

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-8 w-full min-h-[400px] items-center justify-center">
          <Loading size="lg" className="border-brand-500" />
        </div>
      }
    >
      <VendorApplication />
    </Suspense>
  );
}
