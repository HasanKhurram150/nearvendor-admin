import AccountCreatedSuccessfullyForm from "@/components/auth/AccountCreatedSuccessfullyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Created Successfully | Admin Panel",
  description: "Account Created Successfully | Admin Panel",
  // other metadata
};

export default function EnableGoogleAuth() {
  return <AccountCreatedSuccessfullyForm />;
}
