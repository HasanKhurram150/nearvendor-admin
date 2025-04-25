"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useLoginMutation } from "@/services/auth-api";
import { useForm } from "react-hook-form";
import { ApiErrorResponse, ILogin } from "@/services/auth-api/auth-api.types";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Loading from "../atoms/loading/loading";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type FormData = Yup.InferType<typeof validationSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      try {
        const response = await login(formData).unwrap();
        localStorage.setItem("authToken", response?.token);
        router.push("/enter-auth-code?origin=signin");
        toast.success("Login successful!");
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        const errorMessage =
          apiError?.data?.message || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    },
    [login, router],
  );

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
          <div className="mb-5 text-center sm:mb-8">
            <h1 className="mb-2 text-title-sm sm:text-title-md font-semibold text-[#201D1D] dark:text-white/90">
              Login to Continue
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to login.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@gmail.com"
                  registration={register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    registration={register("password")}
                    error={errors.password?.message}
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
                <Button
                  className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Sign in"}
                </Button>
                <Link
                  href="/reset-password"
                  className="mt-[1rem] text-sm text-[#201D1D] hover:text-[#201D1D] dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
