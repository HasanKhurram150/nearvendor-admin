"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { currentUserAPI } from "@/services/users/get-current-user/current-user-api";
import toast from "react-hot-toast";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchUser = async () => {
      try {
        const res = await currentUserAPI.currentUser();
        // Since API.get returns response.data directly, and we updated types
        if (res.success && res.data) {
          setUser(res.data as any); 
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      }
    };

    fetchUser();
  }, [setUser]);

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleSignOut = async () => {
    try {
      await logout();
      router.replace("/signin");
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center">
        <div className="mr-3 h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-3 text-white dropdown-toggle group pr-2"
      >
        <div className="relative overflow-hidden rounded-full h-11 w-11 border border-white/10 ring-2 ring-white/5 transition-all group-hover:ring-white/10">
          <Image
            width={44}
            height={44}
            src={user?.photoUrl || "/images/user/userProfile.png"}
            alt="User"
            className="object-cover"
          />
        </div>

        <div className="hidden sm:flex flex-col items-start gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="block text-sm font-bold text-white leading-tight">
              {user?.fullName || user?.email }
            </span>
            <svg
              className={`text-white transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[11px] font-medium text-white/50 leading-none capitalize">
            {user?.role?.replace(/_/g, " ").toLowerCase() || "Administrator"}
          </span>
        </div>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
          <span className="block font-bold text-gray-700 text-theme-sm dark:text-gray-200">
            {user?.fullName || "Symoria Admin"}
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400 truncate">
            {user?.email}
          </span>
        </div>

        <ul className="flex flex-col gap-1 pt-1">
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              tag="button"
              className="flex w-full items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 transition-colors"
              onClick={() => router.push("/profile")}
            >
              <svg
                className="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              View Profile
            </DropdownItem>
          </li>
          
          <li className="mt-1 pt-1 border-t border-gray-100 dark:border-gray-800">
            <DropdownItem
              onItemClick={() => {
                closeDropdown();
                handleSignOut();
              }}
              tag="button"
              className="flex w-full items-center gap-3 px-3 py-2 font-medium text-error-600 rounded-lg group text-theme-sm hover:bg-error-50 dark:text-error-500 dark:hover:bg-error-500/5 transition-colors"
            >
              <svg
                className="fill-error-600 group-hover:fill-error-700 dark:fill-error-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Sign Out
            </DropdownItem>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
}
