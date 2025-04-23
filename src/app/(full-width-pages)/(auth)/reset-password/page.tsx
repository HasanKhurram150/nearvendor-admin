import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | Admin Panel",
  description: "Reset Password | Admin Panel",
};

export default function ResetPassword() {
  return <ForgotPasswordForm />;
}
