import User from "@/components/user/User";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "@/components/atoms/loading/loading";

export const metadata: Metadata = {
  title: "User Details",
  description: "User Details Management",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading size="lg" className="border-brand-500" />
        </div>
      }
    >
      <User />
    </Suspense>
  );
}
