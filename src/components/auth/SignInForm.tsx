"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useAuthStore } from "@/store/auth-store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import Loading from "../atoms/loading/loading";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

type FormData = Yup.InferType<typeof validationSchema>;

const SignInForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { login: storeLogin, isLoading } = useAuthStore();

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
        const result = await storeLogin(formData.email, formData.password);

        if (result.success) {
          router.push("/");
          toast.success("Login successful!");
        } else {
          toast.error(result.error || "Login failed");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
      }
    },
    [storeLogin, router],
  );

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full relative overflow-hidden rounded-[32px] border border-white/10 bg-[#11192E]/80 p-10 backdrop-blur-xl shadow-2xl xl:p-14 group transition-all duration-500 hover:border-white/20">
        <div className="mb-12 animate-in fade-in zoom-in duration-1000 flex items-center justify-center">
          <Image
            src="/images/logo/near-vendor-logo.svg"
            alt="Logo"
            width={96}
            height={96}
            // className="drop-shadow-[0_0_15px_rgba(50,170,0,0.3)]"
            priority
          />
        </div>
        {/* Subtle glow effect */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />

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
                  Email <span className="text-brand-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
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
                className="relative w-full h-14 rounded-2xl bg-brand-500 text-gray-950 font-bold text-lg shadow-[0_4px_20px_rgba(255,255,0,0.2)] hover:shadow-[0_4px_25px_rgba(255,255,0,0.3)] hover:bg-brand-400 active:scale-[0.98] transition-all overflow-hidden group/btn"
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
