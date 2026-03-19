"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loading from "@/components/atoms/loading/loading";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      router.replace(`/signin?redirect=${encodeURIComponent(pathname || "/")}`);
      return;
    }

    setIsAuthorized(true);
  }, [pathname, router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08070D]">
        <Loading size="lg" className="text-brand-500" />
      </div>
    );
  }

  return <>{children}</>;
}