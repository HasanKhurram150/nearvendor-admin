"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ComponentCard from "../common/ComponentCard";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { getUserByIdAPI } from "@/services/users/get-user-by-id/get-user-by-id-api";
import { User as UserDetail } from "@/services/users/get-user-by-id/get-user-by-id-types";
import toast from "react-hot-toast";
import Loading from "../atoms/loading/loading";
import { ChevronLeft } from "lucide-react";

const User: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("id");

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserDetail>>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserByIdAPI.getUserById({ id: userId as string }),
    enabled: !!userId,
  });

  const user = data?.success ? data.data?.user : null;
  const stats = {
    wishlist: data?.data?.wishlist?.pagination?.total || 0,
    searchHistory: data?.data?.searchHistory?.pagination?.total || 0,
    recentItems: data?.data?.recentItems?.pagination?.total || 0,
    analytics: data?.data?.analyticsEvents?.pagination?.total || 0,
  };

  useEffect(() => {
    if (!userId) {
      toast.error("No user ID provided");
    } else if (isError) {
      toast.error("Error loading user details");
    }
  }, [userId, isError]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const handleSave = () => {
  //   // Implement save logic here if API exists
  //   setUser(formData as UserDetail);
  //   setIsEditing(false);
  //   toast.success("User updated locally (mock)");
  // };

  const handleCancel = () => {
    setFormData(user || {});
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading size="lg" className="border-brand-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-gray-500">User not found</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const details = [
    {
      label: "Full Name",
      key: "fullName",
      value: isEditing ? formData.fullName : user.fullName,
    },
    {
      label: "Email",
      key: "email",
      value: isEditing ? formData.email : user.email,
    },
    {
      label: "Phone Number",
      key: "phone",
      value: isEditing ? formData.phone : user.phone || "—",
    },
    {
      label: "Role",
      key: "role",
      value: isEditing ? formData.role : user.role,
    },
    {
      label: "Status",
      key: "isActive",
      value: (isEditing ? formData.isActive : user.isActive)
        ? "Active"
        : "Inactive",
      isBadge: true,
      color: (isEditing ? formData.isActive : user.isActive)
        ? "success"
        : "error",
    },
    {
      label: "Created At",
      key: "createdAt",
      value: dayjs(user.createdAt).format("DD MMM, YYYY"),
      readOnly: true,
    },
    {
      label: "Last Login",
      key: "lastLoginAt",
      value: user.lastLoginAt
        ? dayjs(user.lastLoginAt).format("DD MMM, YYYY")
        : "Never",
      readOnly: true,
    },
  ];

  // Map URL for iframe (using OpenStreetMap for simplicity/no-key)
  const mapUrl =
    user.lastKnownLatitude && user.lastKnownLongitude
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${Number(user.lastKnownLongitude) - 0.01}%2C${Number(user.lastKnownLatitude) - 0.01}%2C${Number(user.lastKnownLongitude) + 0.01}%2C${Number(user.lastKnownLatitude) + 0.01}&layer=mapnik&marker=${user.lastKnownLatitude}%2C${user.lastKnownLongitude}`
      : null;

  return (
    <div className="flex flex-col gap-6 w-full">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors w-fit"
      >
        <ChevronLeft size={20} />
        Back to Users
      </button>

      <PageBreadcrumb pageTitle="User Details" />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Wishlist Items",
            value: stats.wishlist,
            color: "text-pink-500",
          },
          {
            label: "Search History",
            value: stats.searchHistory,
            color: "text-blue-500",
          },
          {
            label: "Recent Items",
            value: stats.recentItems,
            color: "text-orange-500",
          },
          {
            label: "Activity Events",
            value: stats.analytics,
            color: "text-brand-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="dashboard-card p-5 flex flex-col gap-1 transition-all hover:border-brand-500/20 group"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-brand-500/60 transition-colors">
              {stat.label}
            </span>
            <span
              className={`text-2xl font-bold ${stat.color} dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <ComponentCard
        title="User Information"
        headerActions={
          isEditing ? (
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              {/* <Button size="sm" variant="primary" onClick={handleSave}>
                Save Changes
              </Button> */}
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={handleEdit}>
              Edit User
            </Button>
          )
        }
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* User Photo Placeholder */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden bg-white/3 border border-white/6 flex items-center justify-center group shadow-inner">
            <div className="absolute inset-0 bg-linear-to-tr from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <svg
              className="w-16 h-16 md:w-20 md:h-20 text-gray-600 dark:text-gray-500/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md py-1.5 text-[10px] text-center text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
              Change Photo
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8 flex-1">
            {details.map((detail, index) => (
              <div key={index} className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500/80">
                  {detail.label}
                </span>
                <div className="flex items-center">
                  {isEditing && !detail.readOnly ? (
                    <input
                      type="text"
                      name={detail.key}
                      value={detail.value as string}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white outline-none focus:border-brand-500/50"
                    />
                  ) : detail.isBadge ? (
                    <Badge
                      color={detail.color as any}
                      variant="light"
                      size="sm"
                    >
                      {detail.value}
                    </Badge>
                  ) : (
                    <span className="text-sm font-medium text-gray-700 dark:text-white/90">
                      {detail.value || "—"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ComponentCard>

      {/* Map and Location Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ComponentCard title="Last Known Location">
            <div className="relative rounded-2xl overflow-hidden bg-white/3 border border-white/6 aspect-video">
              {mapUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={mapUrl}
                  className="w-full h-full border-0 transition-all duration-300 opacity-85 hover:opacity-100"
                  style={{
                    filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(95%)",
                  }}
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                  Location coordinates not available
                </div>
              )}
            </div>
          </ComponentCard>
        </div>

        <div className="lg:col-span-1">
          <ComponentCard title="Location Coordinates">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500/80">
                  Latitude
                </span>
                <span className="text-sm font-mono text-white/90">
                  {user.lastKnownLatitude || "—"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500/80">
                  Longitude
                </span>
                <span className="text-sm font-mono text-white/90">
                  {user.lastKnownLongitude || "—"}
                </span>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-brand-500/5 border border-brand-500/10">
                <p className="text-xs text-brand-500 italic">
                  * Location data is based on the last recorded login or
                  activity.
                </p>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default User;
