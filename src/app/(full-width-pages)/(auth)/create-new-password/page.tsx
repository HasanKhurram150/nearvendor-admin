import CreateNewPasswordForm from "@/components/auth/CreateNewPasswordForm";
import { Metadata } from "next";
// import dynamic from "next/dynamic";

// const CreateNewPasswordForm = dynamic(() => import("@/components/auth/CreateNewPasswordForm"), {ssr:false});

export const metadata: Metadata = {
  title: "Create New Password",
  description: "Create New Password",
};

export default function CreateNewPassword() {
  return <CreateNewPasswordForm />;
}
