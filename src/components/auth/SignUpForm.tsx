"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "../ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import {
  useSetPasswordMutation,
  useVerifyInviteTokenQuery,
} from "@/services/auth-api";
import type { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import Loading from "../atoms/loading/loading";

const passwordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordValidationRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type FormData = Yup.InferType<typeof validationSchema>;

const SignUpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  // const [isTokenValid, setIsTokenValid] = useState(false);

  // Verify token on component mount
  const {
    data,
    error: tokenError,
    isLoading: isTokenLoading,
  } = useVerifyInviteTokenQuery(token || "", {
    skip: !token, // Skip if no token
  });

  // Set password mutation
  const [setPassword, { isLoading: isSettingPassword }] =
    useSetPasswordMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: data?.email || "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // Set email value when data is loaded
  useEffect(() => {
    if (data?.email) {
      setValue("email", data.email);
    }
  }, [data, setValue]);

  // Handle token verification status
  useEffect(() => {
    if (tokenError) {
      toast.error("Invalid or expired invitation link");
    } else if (data) {
      // setIsTokenValid(true);
    }
  }, [data, tokenError]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = useCallback(
    async (formData: FormData) => {
      if (!token) {
        toast.error("Invalid token");
        return;
      }

      try {
        const response = await setPassword({
          body: {
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
          },
          token,
        }).unwrap();

        localStorage.setItem("authToken", response.token);
        router.push(
          `/enable-google-auth?token=${encodeURIComponent(response.token)}`,
        );
        toast.success("Password set successfully!");
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        const errorMessage =
          apiError?.data?.message ||
          "Failed to set password. Please try again.";
        toast.error(errorMessage);
      }
    },
    [router, setPassword, token],
  );

  const isLoading = useMemo(
    () => isTokenLoading || isSettingPassword || isSubmitting,
    [isTokenLoading, isSettingPassword, isSubmitting],
  );

  if (isTokenLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-[33.75rem] mx-auto">
        {/* Logo */}
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

        <div className="w-full mt-[3.125rem] p-[1.875rem] bg-white dark:bg-gray-900 rounded-[1.875rem]">
          <header className="mb-5 sm:mb-8 text-center">
            <h1 className="mb-2 text-title-sm sm:text-title-md font-semibold text-[#201D1D] dark:text-white/90">
              Sign Up to Devent
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign up to your new Devent account.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <Label htmlFor="email">
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  registration={register("email")}
                  error={errors.email?.message}
                  disabled={!!data?.email}
                  aria-describedby="email-error"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">
                  Create Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    registration={register("password")}
                    error={errors.password?.message}
                    aria-describedby="password-error password-hint"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-30 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-hint" className="mt-2 text-xs text-[#BFBFBF]">
                    * Minimum of 8 characters. Must also contain one number and
                    one special character.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="passwordConfirmation">
                  Confirm Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="passwordConfirmation"
                    placeholder="Confirm your password"
                    type={showPassword ? "text" : "password"}
                    registration={register("passwordConfirmation")}
                    error={errors.passwordConfirmation?.message}
                    aria-describedby="passwordConfirmation-error"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 right-4 -translate-y-1/2 z-30 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                  size="sm"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Loading /> : "Sign in"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
