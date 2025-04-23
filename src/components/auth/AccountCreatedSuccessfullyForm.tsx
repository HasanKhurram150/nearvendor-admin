"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/button/Button";
import { useRouter } from "next/navigation";

export default function AccountCreatedSuccessfullyForm() {
    const router = useRouter();
    const handleGoLogin = () => {
      router.push("/signin");
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
        <div className="w-full p-[1.875rem] mt-[3.125rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
  
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
            Account Created Successfully
            </h1>
            <p className="mx-auto max-w-[30rem] text-base text-gray-500 dark:text-gray-400">
            Your onboarding has been successfully completed. 
            </p>
          </div>
              {/* Button */}
              <div>
                <Button className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base" size="sm" onClick={handleGoLogin}>
                Go to Login
                </Button>
              </div>
            </div>
        </form>
         
        </div>
      </div>
    </div>
  );
}
