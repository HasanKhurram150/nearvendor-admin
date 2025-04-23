"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EnterAuthCodeForm() {
    const router = useRouter();
  
    const handleAccountCreated = () => {
      router.push("/account-created-successfully");
    };
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "");
    if (paste.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = paste[i] || "";
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(paste.length, 5)]?.focus();
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
 <form>
            <div className="space-y-7 mt-[3rem]">

              <p className="text-[1.25rem] font-AzoSansTest-medium text-[#7BD481] text-center">
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
    className="w-[3.5rem] h-[3.75rem] text-center border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
  />
))}

      </div>
         {/* Button */}
      <button
        onClick={handleAccountCreated}
    className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
      >
        Confirm
      </button>
    </div>

           
            </div>
          </form>

         
        </div>
      </div>
    </div>
  );
}
