import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
  icons: {
    icon: "/images/logo/near-vendor-logo.svg",
  },
};

export default function SignIn() {
  return <SignInForm />;
}
