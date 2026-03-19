"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
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

interface LoginTokenPayload {
  uuid?: string;
  email?: string;
  tokenType?: string;
  iat?: number;
  exp?: number;
  sub?: string;
}

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
        const token = response?.token;

        if (!token) {
          throw new Error("Login succeeded but no token was returned.");
        }

        const decoded = jwtDecode<LoginTokenPayload>(token);
        const email = decoded.email ?? formData.email;
        const fallbackName = email.includes("@") ? email.split("@")[0] : email;

        localStorage.setItem("authToken", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            uuid: decoded.uuid ?? "",
            email,
            name: fallbackName,
          }),
        );

        router.push("/mint-nft");
        toast.success("Login successful!");
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        const errorMessage =
          apiError?.data?.message ||
          (error instanceof Error ? error.message : "Login failed. Please try again.");
        toast.error(errorMessage);
      }
    },
    [login, router],
  );

  return (
    <div className="flex flex-col justify-center items-center bg-[#08070d] w-full">
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-[33.75rem]">
        <>
          <Image
            className="dark:hidden"
            src="/images/logo/main-logo.svg"
            alt="Logo"
            width={57}
            height={65}
          />
          <Image
            className="hidden dark:block"
            src="/images/logo/main-logo.svg"
            alt="Logo"
            width={57}
            height={65}
          />
        </>
        <div className="bg-transparent dark:bg-gray-900 mt-[3.125rem] p-[1.875rem] border border-[#46464666] rounded-[1.875rem] w-full">
          <div className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 font-semibold text-[#fff] text-title-sm sm:text-title-md dark:text-white">
              Login to Continue
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter your email and password to login.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Label>
                  Email{" "}
                  <span className="text-error-500 dark:text-white">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  registration={register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <Label>
                  Password{" "}
                  <span className="text-error-500 dark:text-white">*</span>
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
                    className="top-1/2 right-4 z-30 absolute -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between items-center">
                <Button
                  className="rounded-2xl w-full h-[3.25rem] text-white text-base btn-bg"
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Sign in"}
                </Button>
                <Link
                  href="/reset-password"
                  className="mt-[1rem] text-[#fff] hover:text-[#201D1D] dark:text-brand-400 text-sm"
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
