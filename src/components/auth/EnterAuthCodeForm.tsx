"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "@/components/atoms/loading/loading";
import { useVerify2FaMutation } from "@/services/auth-api";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import { authActions, useDispatch } from "@/store";

type FormData = Yup.InferType<typeof validationSchema>;

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Authentication code is required")
    .length(6, "Code must be exactly 6 digits")
    .matches(/^\d+$/, "Code must contain only numbers"),
});

export default function EnterAuthCodeForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const [verify2Fa, { isLoading }] = useVerify2FaMutation();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleChange = useCallback(
    (value: string, index: number) => {
      if (!/^\d?$/.test(value)) return;

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Update form value
      setValue("code", newOtp.join(""), { shouldValidate: true });

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp, setValue],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setValue("code", newOtp.join(""), { shouldValidate: true });
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp, setValue],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const paste = e.clipboardData
        .getData("text")
        .slice(0, 6)
        .replace(/\D/g, "");
      if (paste.length === 0) return;
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = paste[i] || "";
      }
      setOtp(newOtp);
      setValue("code", newOtp.join(""), { shouldValidate: true });
      inputRefs.current[Math.min(paste.length, 5)]?.focus();
    },
    [otp, setValue],
  );

  const onSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const response = await verify2Fa({ code: formData.code }).unwrap();

        // Handle successful verification
        localStorage.setItem("authToken", response?.token);
        localStorage.setItem("user", JSON.stringify(response?.admin));

        dispatch(
          authActions.login({
            token: response?.token,
            user: response?.admin,
          }),
        );

        if (origin === "signin") {
          router.push("/");
          toast.success("Login successful!");
        } else {
          router.push("/account-created-successfully");
          toast.success("Account created successfully!");
        }
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        const errorMessage =
          apiError?.data?.message ||
          "Failed to authentication code. Please try again.";
        toast.error(errorMessage);
      }
    },
    [router, verify2Fa],
  );

  const getInputClassName = (index: number) => {
    const baseClass =
      "w-[3.5rem] h-[3.75rem] text-center border rounded-xl focus:outline-none focus:ring-2 text-xl";
    const errorClass = errors.code
      ? "border-error-500 focus:ring-error-500"
      : "border-gray-300 focus:ring-blue-500";
    return `${baseClass} ${errorClass}`;
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
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 text-lg sm:text-2xl font-semibold text-[#201D1D] dark:text-white/90">
              Enter Authentication Code
            </h1>
            <p className="mx-auto max-w-[20rem] text-sm text-gray-500 dark:text-gray-400">
              Authenticator app should be installed on your device to use 2FA.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-7 mt-[3rem]">
              <p className="text-[1.25rem] font-AzoSansTest-medium text-[#1862D4] text-center">
                ENTER THE 6 DIGIT CODE
              </p>

              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-3 mb-[6rem]">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      // className="w-[3.5rem] h-[3.75rem] text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                      className={getInputClassName(index)}
                    />
                  ))}
                </div>
                {errors.code && (
                  <p className="text-sm text-error-500 text-center -mt-8 mb-4">
                    {errors.code.message}
                  </p>
                )}
                {/* Button */}
                <button
                  disabled={isLoading}
                  type="submit"
                  // onClick={handleAccountCreated}
                  className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                >
                  {isLoading ? <Loading /> : "Confirm"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
