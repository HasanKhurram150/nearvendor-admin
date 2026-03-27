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
          {!passwordSuccess ? (
            <>
              <div className="mb-10 text-center">
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                  New <span className="text-brand-500 italic uppercase">Password</span>
                </h1>
                <p className="text-base font-medium text-white/40">
                  Secure your account by creating a new strong password.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handlePasswordSuccess(); }} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-white/70 ml-1">
                      New Password <span className="text-brand-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className="h-14 rounded-2xl bg-[#08070D]/60 border-white/5 text-white placeholder:text-white/20 focus:border-brand-500/50 transition-all text-base pr-12 px-5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 text-white/20 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-5 w-5 fill-current" />
                        ) : (
                          <EyeCloseIcon className="h-5 w-5 fill-current" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-white/70 ml-1">
                      Confirm Password <span className="text-brand-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="h-14 rounded-2xl bg-[#08070D]/60 border-white/5 text-white placeholder:text-white/20 focus:border-brand-500/50 transition-all text-base pr-12 px-5"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="relative w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] hover:bg-[#32AA00]/90 active:scale-[0.98] transition-all overflow-hidden group/btn"
                    type="submit"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full" />
                  <Image
                    src="/images/logo/check-mark.webp"
                    alt="Success"
                    width={100}
                    height={100}
                    className="relative z-10"
                  />
                </div>
              </div>
              
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-white italic uppercase">
                Success <span className="text-brand-500 not-italic">Updated</span>
              </h2>
              <p className="mb-10 text-base font-medium text-white/40 leading-relaxed">
                Your password has been reset successfully. <br />
                You can now use your new credentials to login.
              </p>

              <Button
                className="w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] transition-all"
                onClick={handleGoLogin}
              >
                Return to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewPasswordForm
