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

        router.push("/");
        toast.success("Login successful!");
      } catch (error) {
        const apiError = error as ApiErrorResponse;
        const errorMessage =
          apiError?.data?.message ||
          (error instanceof Error
            ? error.message
            : "Login failed. Please try again.");
        toast.error(errorMessage);
      }
    },
    [login, router],
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mb-12 animate-in fade-in zoom-in duration-1000">
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
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Login to Continue
            </h1>
            <p className="text-base font-medium text-white/40">
              Enter your credentials to access the console.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-white/70 ml-1">
                  Email Address <span className="text-brand-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  registration={register("email")}
                  error={errors.email?.message}
                  className="h-14 rounded-2xl bg-[#08070D]/60 border-white/5 text-white placeholder:text-white/20 focus:border-brand-500/50 transition-all text-base px-5"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <Label className="text-sm font-semibold text-white/70">
                    Password <span className="text-brand-500">*</span>
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    registration={register("password")}
                    error={errors.password?.message}
                    className="h-14 rounded-2xl bg-[#08070D]/60 border-white/5 text-white placeholder:text-white/20 focus:border-brand-500/50 transition-all text-base pr-12 px-5"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-white/20 hover:text-white cursor-pointer transition-colors"
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5 fill-current" />
                    ) : (
                      <EyeCloseIcon className="h-5 w-5 fill-current" />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-6">
              <Button
                className="relative w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] hover:bg-[#32AA00]/90 active:scale-[0.98] transition-all overflow-hidden group/btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "Sign in"}
              </Button>

              <div className="text-center">
                <Link
                  href="/reset-password"
                  className="text-sm font-bold text-brand-500 hover:text-brand-400 transition-colors underline-offset-4 hover:underline"
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
