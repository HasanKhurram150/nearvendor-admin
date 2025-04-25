import AccountCreatedSuccessfullyForm from "@/components/auth/AccountCreatedSuccessfullyForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Created Successfully",
  description: "Account Created Successfully",
  // other metadata
};

export default function EnableGoogleAuth() {
  return <AccountCreatedSuccessfullyForm />;
}
