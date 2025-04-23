import EnableGoogleAuthForm from "@/components/auth/EnableGoogleAuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enable Google Authenticator | Admin Panel",
  description: "Enable Google Authenticator | Admin Panel",
  // other metadata
};

export default function EnableGoogleAuth() {
  return <EnableGoogleAuthForm />;
}
