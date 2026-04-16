"use client";

import React, { useEffect, useState, useMemo } from "react";
import Loading from "@/components/atoms/loading/loading";
import { useLanguage } from "@/components/common/LanguageContext";
import { getAllUsersAPI } from "@/services/users/get-all-users/get-all-users-api";
import { getAllVendorAPI } from "@/services/vendor/get-all-vendor/get-all-vendor-api";
import { User } from "@/services/users/get-all-users/get-all-user-types";
import { VendorItem } from "@/services/vendor/get-all-vendor/get-all-vendor-types";
import { OrderStatsCards } from "./OrderStatsCards";
import { OrderStatusBreakdown } from "./OrderStatusBreakdown";
import { SalesChart } from "./SalesChart";
import { TopSellingNfts } from "./TopSellingNfts";
import { SalesBreakdown } from "./SalesBreakdown";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";

type RoleFilter = "" | "BUYER" | "VENDOR";
type UserStatusFilter = "" | "true" | "false";
type VendorStatusFilter = "" | "PENDING" | "APPROVED" | "REJECTED";
type TimeSpan =
  | "all"
  | "daily"
  | "weekly"
  | "monthly"
  | "lastQuarter"
  | "yearly";

const TIME_SPANS: { label: string; value: TimeSpan }[] = [
  { label: "All Time", value: "all" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Last Quarter", value: "lastQuarter" },
  { label: "Yearly", value: "yearly" },
];

export default function NftOrderDashboard() {
  const { t } = useLanguage();

  // States for data
  const [users, setUsers] = useState<User[]>([]);
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // States for filters
  const [timeSpan, setTimeSpan] = useState<TimeSpan>("all");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [userStatusFilter, setUserStatusFilter] =
    useState<UserStatusFilter>("");
  const [vendorStatusFilter, setVendorStatusFilter] =
    useState<VendorStatusFilter>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersRes, vendorsRes] = await Promise.all([
          getAllUsersAPI.getAllUsers({ page: 1, limit: 1000 }),
          getAllVendorAPI.getAllVendor({ page: 1, limit: 1000 }),
        ]);

        if (usersRes.success) setUsers(usersRes.data.users || []);
        if (vendorsRes.success) setVendors(vendorsRes.data.vendors || []);
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
    let filteredUsers = [...users];
    let filteredVendors = [...vendors];

    // 1. Time Span Filter
    if (timeSpan !== "all") {
      const now = dayjs();
      let cutoff = now;

      if (timeSpan === "daily") cutoff = now.startOf("day");
      else if (timeSpan === "weekly") cutoff = now.startOf("week");
      else if (timeSpan === "monthly") cutoff = now.startOf("month");
      else if (timeSpan === "lastQuarter") cutoff = now.subtract(3, "month");
      else if (timeSpan === "yearly") cutoff = now.startOf("year");

      filteredUsers = filteredUsers.filter((u) =>
        dayjs(u.createdAt).isAfter(cutoff),
      );
      filteredVendors = filteredVendors.filter((v) =>
        dayjs(v.createdAt).isAfter(cutoff),
      );
    }

    // 2. Search Filter
    if (search) {
      const q = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.fullName?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q),
      );
      filteredVendors = filteredVendors.filter(
        (v) =>
          v.businessName?.toLowerCase().includes(q) ||
          v.user?.fullName?.toLowerCase().includes(q),
      );
    }

    // 3. User Filters
    if (roleFilter)
      filteredUsers = filteredUsers.filter((u) => u.role === roleFilter);
    if (userStatusFilter)
      filteredUsers = filteredUsers.filter(
        (u) => String(u.isActive) === userStatusFilter,
      );

    // 4. Vendor Filters
    if (vendorStatusFilter)
      filteredVendors = filteredVendors.filter(
        (v) => v.status === vendorStatusFilter,
      );

    return { filteredUsers, filteredVendors };
  }, [
    users,
    vendors,
    timeSpan,
    search,
    roleFilter,
    userStatusFilter,
    vendorStatusFilter,
  ]);

  // Aggregation Logic for sub-components
  const stats = useMemo(() => {
    const { filteredUsers, filteredVendors } = filteredData;

    const totalUsers = filteredUsers.length;
    const totalVendors = filteredVendors.length;
    const activeUsers = filteredUsers.filter((u) => u.isActive).length;
    const pending = filteredVendors.filter(
      (v) => v.status === "PENDING",
    ).length;

    // For Role Breakdown (Column Chart)
    const buyers = filteredUsers.filter((u) => u.role === "BUYER").length;
    const vendorsCount = filteredUsers.filter(
      (u) => u.role === "VENDOR",
    ).length;

    // For Application Status (Donut Chart)
    const approved = filteredVendors.filter(
      (v) => v.status === "APPROVED",
    ).length;
    const rejected = filteredVendors.filter(
      (v) => v.status === "REJECTED",
    ).length;

    // For Growth Chart (SalesChart) - Group users by date
    const growthData: [number, number][] = [];
    const grouped = filteredUsers.reduce(
      (acc, user) => {
        const date = dayjs(user.createdAt).startOf("day").valueOf();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    Object.entries(grouped)
      .sort(([a], [b]) => Number(a) - Number(b))
      .forEach(([date, count]) => {
        growthData.push([Number(date), count]);
      });

    return {
      totalUsers,
      totalVendors,
      activeUsers,
      pendingVendors: pending,
      roleDistribution: { buyers, vendors: vendorsCount },
      vendorStatusBreakdown: { approved, pending, rejected },
      growthData,
      recentActivity: [...filteredUsers]
        .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
        .slice(0, 5),
    };
  }, [filteredData]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loading size="lg" className="border-[#FFFF00]" />
      </div>
    );
  }

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12 pb-10">
      {/* Header with Title and Global Time Filter */}
      <div className="col-span-12 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 pb-2">
        <h2 className="text-white text-[22px] font-semibold tracking-tight">
          User & Vendor Analytics
        </h2>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Filter */}
          <div className="flex bg-white/3 p-1 rounded-xl border border-white/6">
            {TIME_SPANS.map((ts) => (
              <button
                key={ts.value}
                onClick={() => setTimeSpan(ts.value)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                  timeSpan === ts.value
                    ? "bg-[#FFFF00] text-gray-950 shadow-lg"
                    : "text-gray-400 hover:text-white",
                )}
              >
                {ts.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/3 border border-white/6 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFFF00]/40 w-45"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters (Role/Status) */}
      <div className="col-span-12 flex flex-wrap items-center gap-4 bg-white/2 p-4 rounded-2xl border border-white/4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            User Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="bg-gray-900 border border-white/6 rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none"
          >
            <option value="">All Roles</option>
            <option value="BUYER">Buyer</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            User Status:
          </span>
          <select
            value={userStatusFilter}
            onChange={(e) =>
              setUserStatusFilter(e.target.value as UserStatusFilter)
            }
            className="bg-gray-900 border border-white/6 rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            Application:
          </span>
          <select
            value={vendorStatusFilter}
            onChange={(e) =>
              setVendorStatusFilter(e.target.value as VendorStatusFilter)
            }
            className="bg-gray-900 border border-white/6 rounded-lg px-3 py-1.5 text-xs text-gray-300 outline-none"
          >
            <option value="">All Apps</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="col-span-12">
        <OrderStatsCards stats={stats} />
      </div>

      {/* User Role Distribution (Repurposed OrderStatusBreakdown) */}
      <div className="col-span-12 lg:col-span-5">
        <OrderStatusBreakdown stats={stats} />
      </div>

      {/* User Growth Chart (SalesChart) */}
      <div className="col-span-12 lg:col-span-7">
        <SalesChart salesData={stats.growthData as [number, number][]} />
      </div>

      {/* Vendor Status Breakdown (SalesBreakdown) */}
      <div className="col-span-12 lg:col-span-6">
        <SalesBreakdown
          title="Vendor Application Status"
          data={stats.vendorStatusBreakdown}
        />
      </div>

      {/* Recent Activity Table (TopSellingNfts) */}
      <div className="col-span-12 lg:col-span-6">
        <TopSellingNfts nfts={stats.recentActivity} />
      </div>
    </div>
  );
}
