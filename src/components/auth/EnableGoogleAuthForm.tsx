"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Input from "@/components/form/input/InputField";
import Button from "../ui/button/Button";
import { useGet2FaQuery } from "@/services";
import { QRCodeSVG } from "qrcode.react";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../atoms/loading/loading";

interface ParsedOtpAuthData {
  label: string;
  issuer: string;
}

export default function EnableGoogleAuthForm() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const handleQR = () => {
    setShowQR(true);
  };
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token") || localStorage.getItem("authToken");
  const { data, isLoading } = useGet2FaQuery();

  const googlePlayUrl =
    "https://chromewebstore.google.com/detail/authenticator/bhghoamapcdpbohphigoooaddinpkbai";

  const parsedData = useMemo(() => {
    if (!data) return null;

    const parseOtpAuthUrl = (otpauthUrl: string): ParsedOtpAuthData => {
      try {
        const url = new URL(otpauthUrl);
        const pathname = url.pathname.slice(1);
        const label = decodeURIComponent(pathname);
        const issuer = url.searchParams.get("issuer") ?? "";
        return { label, issuer };
      } catch (error) {
        console.error("Invalid OTP Auth URL:", error);
        return { label: "", issuer: "" };
      }
    };

    const { label, issuer } = parseOtpAuthUrl(data.qr);
    const secret = data?.formattedKey;

    return {
      otpauthUrl: `otpauth://totp/${label}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`,
      secret,
      label,
      issuer,
    };
  }, [data]);

  // if (isLoading || !parsedData) {
  //   return <Loading />;
  // }

  const handleDownloadClick = () => {
    // This will open the appropriate store based on the user's device
    window.open(googlePlayUrl, "_blank");
  };

  const handleNext = () => {
    router.push("/enter-auth-code");
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
              Enable Google Authenticator
            </h1>
            <p className="mx-auto max-w-[20rem] text-sm text-gray-500 dark:text-gray-400">
              Authenticator app should be installed on your device to use 2FA.
            </p>
          </div>
          {!showQR ? (
            <form>
              <div className="space-y-7">
                <Image
                  src="/images/logo/google-auth.webp"
                  alt="google auth"
                  width={90}
                  height={90}
                  className="block mx-auto my-[1rem]"
                />

                <button
                  onClick={handleDownloadClick}
                  className="text-[1.25rem] font-AzoSansTest-medium text-[#1862D4] text-center"
                >
                  DOWNLOAD APP
                </button>

                <div className="flex items-center justify-center w-full gap-[1.25rem]">
                  <Image
                    src="/images/logo/google-play.webp"
                    alt="google auth"
                    width={168}
                    height={50}
                  />
                  <Image
                    src="/images/logo/app-store.webp"
                    alt="google auth"
                    width={168}
                    height={50}
                  />
                </div>

                {/* Button */}
                <div>
                  <Button
                    className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                    size="sm"
                    onClick={handleQR}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form>
              <div className="space-y-7">
                <div className="flex items-center justify-center w-full gap-[1.25rem]">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <QRCodeSVG
                      value={parsedData?.otpauthUrl || ""}
                      size={200}
                      level="H"
                    />
                  )}
                </div>
                <div className="relative">
                  <Input
                    type="twxt"
                    id="code"
                    name="code"
                    placeholder="3PRWRJFCBVJ45VD5FBX57"
                    defaultValue="3PRWRJFCBVJ45VD5FBX57"
                  />
                  <button className="bg-transparent flex items-center justify-center h-[1.875rem] w-[1.875rem] absolute right-4 top-3">
                    <Image
                      src="/images/logo/copy-icon.png"
                      alt="copy"
                      width={28}
                      height={28}
                    />
                  </button>
                </div>

                {/* Button */}
                <div>
                  <Button
                    className="w-full h-[3.25rem] rounded-2xl btn-bg text-white text-base"
                    size="sm"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
