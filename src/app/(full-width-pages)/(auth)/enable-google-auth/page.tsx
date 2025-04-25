import EnableGoogleAuthForm from "@/components/auth/EnableGoogleAuthForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Enable Google Authenticator",
  description: "Enable Google Authenticator",
  // other metadata
};

export default function EnableGoogleAuth() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      {" "}
      <EnableGoogleAuthForm />
    </Suspense>
  );
}
