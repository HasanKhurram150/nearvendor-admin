"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "@/components/atoms/loading/loading";
import Button from "@/components/ui/button/Button";
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
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-12">
        <Image
          src="/images/logo/main-logo.svg"
          alt="Logo"
          width={140}
          height={160}
          className="drop-shadow-[0_0_15px_rgba(50,170,0,0.3)]"
          priority
        />
      </div>

      <div className="w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0C0C11]/80 p-10 backdrop-blur-xl shadow-2xl xl:p-14 group transition-all duration-500 hover:border-white/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Two-Factor <span className="text-brand-500 italic uppercase">Auth</span>
            </h1>
            <p className="mx-auto max-w-[280px] text-base font-medium text-white/40 leading-relaxed">
              Enter the 6-digit code from your authenticator app to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-10">
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-2 sm:gap-4">
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
                      className={getInputClassName(index)}
                    />
                  ))}
                </div>
                {errors.code && (
                  <p className="text-error-500 text-sm font-medium">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  className="relative w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] hover:bg-[#32AA00]/90 active:scale-[0.98] transition-all overflow-hidden group/btn"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Verify & Continue"}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-sm font-bold text-white/40 hover:text-white transition-colors"
            >
              Lost access? Contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
