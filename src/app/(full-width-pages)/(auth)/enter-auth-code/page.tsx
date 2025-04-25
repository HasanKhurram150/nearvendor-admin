import EnterAuthCodeForm from "@/components/auth/EnterAuthCodeForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Enter Authentication Code | Admin Panel",
  description: "Enter Authentication Code | Admin Panel",
  // other metadata
};

export default function EnterAuthCode() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <EnterAuthCodeForm />
    </Suspense>
  );
}
