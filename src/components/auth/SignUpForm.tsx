"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEnableGoogleAuth = () => {
    router.push("/enable-google-auth");
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

        <div className="w-full mt-[3.125rem] p-[1.875rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 text-title-sm sm:text-title-md font-semibold text-[#201D1D] dark:text-white/90">
              Sign Up to Devent
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign up to your new Devent account.
            </p>
          </div>

          <form>
          
            <div className="space-y-5">
              {/* Email */}
              <div>
                <Label>
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <Label>
                  Create Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
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
                <p className="mt-2 text-xs text-[#BFBFBF]">
                  * Minimum of 8 characters. Must also contain one number and one special character.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <Label>
                  Confirm Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
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

              {/* Wallet Address */}
              <div>
                <Label>Wallet Address (Admin)</Label>
                <Input
                  type="text"
                  id="walletAddress"
                  name="walletAddress"
                  placeholder="Enter wallet address"
                />
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                  size="sm"
                  onClick={handleEnableGoogleAuth}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm