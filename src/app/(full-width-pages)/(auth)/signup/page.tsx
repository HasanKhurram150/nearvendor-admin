import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up",
  // other metadata
};

export default function SignUp() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      {" "}
      <SignUpForm />
    </Suspense>
  );
}
