import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset Password",
};

export default function ResetPassword() {
  return <ForgotPasswordForm />;
}
