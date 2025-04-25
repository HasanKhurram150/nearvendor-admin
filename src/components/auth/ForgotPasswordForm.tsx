"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";


export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();

  const handleEmailSent = () => {
    setEmailSent(true)
  }

  const handleCreateNewPassword = () => {
    router.push("/create-new-password");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-[33.75rem] mx-auto">
        <>
          <Image
            className="dark:hidden"
            src="/images/logo/logo.svg"
            alt="Logo"
            width={136}
            height={37}
          />
          <Image
            className="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            width={136}
            height={37}
          />
        </>
        {!emailSent ?
        <div className="w-full p-[1.875rem] mt-[3.125rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
          <div className="mb-5 text-center sm:mb-8">
            <h1 className="mb-2 text-title-sm sm:text-title-md font-semibold text-[#201D1D] dark:text-white/90">
            Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email to recover password
            </p>
          </div>

          <form>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input placeholder="Enter your email" type="email" />
              </div>
              <div className="flex flex-col items-center justify-between">
                <Button className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base" size="sm" onClick={handleEmailSent}>
                Get Verification Link
                </Button>
              </div>
            </div>
          </form>
        </div> :         <div className="w-full p-[1.875rem] mt-[3.125rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
  
  <form>
            <div className="space-y-7">
              <Image
                src="/images/logo/check-mark.webp"
                alt="check-mark"
                width={95}
                height={95}
                className="block mx-auto mb-[1.5rem]"
              />
              <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 text-lg sm:text-2xl font-semibold text-[#201D1D] dark:text-white/90">
            Email Sent Successfully
            </h1>
            <p className="mx-auto max-w-[30rem] text-base text-gray-500 dark:text-gray-400">
            We have sent an email to the mentioned email address
            </p>
          </div>
              {/* Button */}
              <div>
                <button className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base" onClick={handleCreateNewPassword}>
                Ok
                </button>
              </div>
            </div>
        </form>
         
        </div>}
      </div>
    </div>
  );
}
