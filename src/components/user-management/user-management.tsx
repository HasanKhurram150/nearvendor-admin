"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getAllUsersAPI } from "@/services/users/get-all-users/get-all-users-api";
import { GetAllUsersOutputDto, User } from "@/services/users/get-all-users/get-all-user-types";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";
import Badge from "@/components/ui/badge/Badge";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import Pagination from "@/components/tables/Pagination";

const DEFAULT_PAGE_SIZE = 10;

type RoleFilter = "" | "BUYER" | "VENDOR";
type StatusFilter = "" | "true" | "false";

const ROLE_FILTERS: { label: string; value: RoleFilter }[] = [
  { label: "All Roles", value: "" },
  { label: "Buyer", value: "BUYER" },
  { label: "Vendor", value: "VENDOR" },
];

const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "All Status", value: "" },
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

const UserManagement: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<GetAllUsersOutputDto["data"]["pagination"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await getAllUsersAPI.getAllUsers({
        page,
        limit: DEFAULT_PAGE_SIZE,
      });

      if (res.success) {
        setUsers(res.data.users || []);
        setPagination(res.data.pagination || null);
      } else {
        toast.error("Failed to load users");
        setUsers([]);
        setPagination(null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("An error occurred while loading users");
      setUsers([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Client-side filtering on current page results
  const filteredUsers = users.filter((user) => {
    const matchesSearch = !search || 
      user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    const matchesStatus = !statusFilter || String(user.isActive) === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle={"userManagement"}
        counter={true}
        counterText={t("totalUsers")}
        counterValue={pagination?.total || 0}
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        {/* Toolbar: Search + Filters */}
        <div className="px-6 pt-5 pb-4 flex flex-col xl:flex-row items-start xl:items-center gap-6 border-b border-[#1D1C1C]">
          {/* Search */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full xl:w-auto">
            {/* Role Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 mr-1 uppercase tracking-wider">Role:</span>
              {ROLE_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setRoleFilter(value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border",
                    roleFilter === value
                      ? "bg-brand-500 border-brand-500 text-gray-950"
                      : "bg-transparent border-white/[0.06] text-gray-500 hover:border-white/20 hover:text-gray-300"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500 mr-1 uppercase tracking-wider">Status:</span>
              {STATUS_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setStatusFilter(value)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border",
                    statusFilter === value
                      ? value === "true"
                        ? "bg-green-500/20 border-green-500/40 text-green-400"
                        : value === "false"
                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                          : "bg-white/10 border-white/20 text-white"
                      : "bg-transparent border-white/[0.06] text-gray-500 hover:border-white/20 hover:text-gray-300"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table hoverable>
            <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 pl-6 pr-3 font-medium text-[#201D1D99] text-start text-base dark:text-white"
                >
                  #
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[16rem]"
                >
                  Full Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[14rem]"
                >
                  {t("email")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  {t("status")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 pl-3 pr-6 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Last Login
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-brand-500" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No users found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((userItem, index) => (
                  <TableRow
                    key={userItem.id}
                    onClick={() => router.push(`/user?id=${userItem.id}`)}
                    className="cursor-pointer"
                  >
                    <TableCell className="pl-6 pr-3 py-4 text-xs text-gray-500 font-mono">
                      {((page - 1) * DEFAULT_PAGE_SIZE + (index + 1)).toString().padStart(2, "0")}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-white/90">
                          {userItem.fullName || "—"}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[12rem]">
                          {userItem.email || "—"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <span className="text-xs text-gray-400 font-mono">
                        {userItem.email || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-xs text-gray-400 capitalize">
                      <Badge
                        variant="light"
                        color={userItem.role === "VENDOR" ? "info" : "light"}
                        size="sm"
                      >
                        {userItem.role || "—"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge
                        variant="light"
                        color={userItem.isActive ? "success" : "error"}
                        size="sm"
                      >
                        {userItem.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 pl-3 pr-6 text-xs text-gray-500">
                      {userItem.lastLoginAt
                        ? dayjs(userItem.lastLoginAt).format("DD MMM, YYYY HH:mm")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        {!isLoading && pagination && pagination.total > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(page - 1) * DEFAULT_PAGE_SIZE + 1}–{Math.min(page * DEFAULT_PAGE_SIZE, pagination.total)} of {pagination.total} records
            </span>
            <Pagination
              currentPage={page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
