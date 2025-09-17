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
    <div className="flex flex-col justify-center items-center bg-[#08070d] w-full">
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-[33.75rem]">
        <>
          <Image
                         className="dark:hidden"
                         src="/images/logo/logo.svg"
                         alt="Logo"
                         width={57}
                         height={65}
                       />
                       <Image
                         className="hidden dark:block"
                         src="/images/logo/logo.svg"
                         alt="Logo"
                         width={57}
                         height={65}
                       />
        </>
        {!emailSent ?
        <div className="bg-transparent dark:bg-gray-900 mt-[3.125rem] p-[1.875rem] border border-[#46464666] rounded-[1.875rem] w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-[#fff] text-title-sm sm:text-title-md dark:text-white">
            Forgot Password
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter your email to recover password
            </p>
          </div>

          <form>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500 dark:text-white">*</span>
                </Label>
                <Input placeholder="Enter your email" type="email" />
              </div>
              <div className="flex flex-col justify-between items-center">
                <Button className="rounded-2xl w-full h-[3.25rem] text-white text-base btn-bg" size="sm" onClick={handleEmailSent}>
                Get Verification Link
                </Button>
              </div>
            </div>
          </form>
        </div> :         <div className="bg-transparent dark:bg-gray-900 mt-[3.125rem] p-[1.875rem] border border-[#46464666] rounded-[1.875rem] w-full">
  
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
            <h1 className="mb-2 font-semibold text-[#201D1D] dark:text-white/90 text-lg sm:text-2xl">
            Email Sent Successfully
            </h1>
            <p className="mx-auto max-w-[30rem] text-gray-500 dark:text-gray-400 text-base">
            We have sent an email to the mentioned email address
            </p>
          </div>
              {/* Button */}
              <div>
                <button className="rounded-2xl w-full h-[3.25rem] text-white text-base btn-bg" onClick={handleCreateNewPassword}>
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
