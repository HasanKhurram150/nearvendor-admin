"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";


export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState(false);
    const router = useRouter();

  const handleEmailSent = () => {
    setEmailSent(true)
  }

  const handleCreateNewPassword = () => {
    router.push("/create-new-password");
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
          {!emailSent ? (
            <>
              <div className="mb-10 text-center">
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
                  Reset Password
                </h1>
                <p className="text-base font-medium text-white/40">
                  Enter your email to recover your account.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleEmailSent(); }} className="space-y-8">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white/70 ml-1">
                    Email Address <span className="text-brand-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    className="h-14 rounded-2xl bg-[#08070D]/60 border-white/5 text-white placeholder:text-white/20 focus:border-brand-500/50 transition-all text-base px-5"
                  />
                </div>

                <div className="pt-2 space-y-6">
                  <Button
                    className="relative w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] hover:bg-[#32AA00]/90 active:scale-[0.98] transition-all overflow-hidden group/btn"
                    type="submit"
                  >
                    Get Verification Link
                  </Button>

                  <div className="text-center">
                    <Link
                      href="/signin"
                      className="text-sm font-bold text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 group/back"
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover/back:-translate-x-1">
                        <path d="M15.8334 10H4.16669M4.16669 10L9.16669 15M4.16669 10L9.16669 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Back to login
                    </Link>
                  </div>
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
                Email Sent <span className="text-brand-500 not-italic">Successfully</span>
              </h2>
              <p className="mb-10 text-base font-medium text-white/40 leading-relaxed">
                We have sent an email to the mentioned address. <br />
                Please check your inbox to continue.
              </p>

              <Button
                className="w-full h-14 rounded-2xl bg-[#32AA00] text-white font-bold text-lg shadow-[0_4px_20px_rgba(50,170,0,0.3)] hover:shadow-[0_4px_25px_rgba(50,170,0,0.4)] transition-all"
                onClick={handleCreateNewPassword}
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
