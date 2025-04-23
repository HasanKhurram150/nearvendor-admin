
import EnterAuthCodeForm from "@/components/auth/EnterAuthCodeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter Authentication Code | Admin Panel",
  description: "Enter Authentication Code | Admin Panel",
  // other metadata
};

export default function EnterAuthCode() {
  return <EnterAuthCodeForm />;
}
