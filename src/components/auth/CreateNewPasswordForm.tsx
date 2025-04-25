"use client";

import React, { useState } from "react";
import Image from "next/image";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";

const CreateNewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
  const router = useRouter();

  const handlePasswordSuccess = () => {
    setPasswordSuccess(true)
  }

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
        {!passwordSuccess ? 
        <div className="w-full p-[1.875rem] mt-[3.125rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
          <div className="mb-5 text-center sm:mb-8">
            <h1 className="mb-2 text-title-sm sm:text-title-md font-semibold text-[#201D1D] dark:text-white/90">
            Create new Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            Create your new password to continue.
            </p>
          </div>

          <form>
            <div className="space-y-6">
            <div>
                <Label>
                 Create New Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-30 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <Label>
                Confirm New Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-30 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between">
                <Button className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base" size="sm" onClick={handlePasswordSuccess}>
                  Create New Password
                </Button>
              
              </div>
            </div>
          </form>
        </div> : 
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
                    Password Reset Successfully
                    </h1>
                    <p className="mx-auto max-w-[25rem] text-base text-gray-500 dark:text-gray-400">
                    Your new password has been created successfully.
                    You can now login again.
                    </p>
                  </div>
                      {/* Button */}
                      <div>
                        <button className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base" onClick={handleGoLogin}>
                        Go to Login
                        </button>
                      </div>
                    </div>
                </form>
                 
                </div>
        }
      </div>
    </div>
  );
}

export default CreateNewPasswordForm
