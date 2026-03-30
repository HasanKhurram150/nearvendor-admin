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
import { getAllVendorAPI } from "@/services/vendor/get-all-vendor/get-all-vendor-api";
import { GetAllVendorOutputDto, VendorItem } from "@/services/vendor/get-all-vendor/get-all-vendor-types";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import Badge from "@/components/ui/badge/Badge";
import dayjs from "dayjs";
import { cn } from "@/utils/cn";
import Pagination from "@/components/tables/Pagination";

type StatusFilter = "" | "PENDING" | "APPROVED" | "REJECTED";

const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const DEFAULT_PAGE_SIZE = 10;

const VendorApplications: React.FC = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<GetAllVendorOutputDto["data"]["pagination"] | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      try {
        const res = await getAllVendorAPI.getAllVendor({
          status: statusFilter !== "" ? statusFilter : undefined,
          page,
          limit: DEFAULT_PAGE_SIZE,
        });
        
        // Correct data access based on the actual response structure
        const vendorsData = res?.data?.vendors;
        const paginationData = res?.data?.pagination;
        
        setVendors(Array.isArray(vendorsData) ? vendorsData : []);
        setPagination(paginationData || null);
      } catch {
        setVendors([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendors();
  }, [statusFilter, page]);

  // Client-side search filtering on current page results
  const filtered = vendors.filter((v) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      v.businessName?.toLowerCase().includes(q) ||
      v.user?.fullName?.toLowerCase().includes(q) ||
      v.user?.email?.toLowerCase().includes(q) ||
      String(v.cnic).includes(q)
    );
  });

  const statusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "light";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle="Vendor Applications"
        counter={true}
        counterText="Total Applications"
        counterValue={pagination?.total || 0}
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        {/* Toolbar: Search + Status Filter */}
        <div className="px-6 pt-5 pb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Search */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Search by business name, vendor name, CNIC..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_FILTERS.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => {
                  setStatusFilter(value);
                  setPage(1); // Reset to page 1 on filter change
                }}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-semibold transition-all border",
                  statusFilter === value
                    ? value === ""
                      ? "bg-white/10 border-white/20 text-white"
                      : value === "APPROVED"
                        ? "bg-green-500/20 border-green-500/40 text-green-400"
                        : value === "REJECTED"
                          ? "bg-red-500/20 border-red-500/40 text-red-400"
                          : "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                    : "bg-transparent border-white/[0.06] text-gray-500 hover:border-white/20 hover:text-gray-300",
                )}
              >
                {label}
              </button>
            ))}
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
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[14rem]"
                >
                  Vendor Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  CNIC
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Business Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
                >
                  Business Type
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[7rem]"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 pl-3 pr-6 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[10rem]"
                >
                  Verification
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#FFFF00]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No vendor applications found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((vendor, index) => (
                  <TableRow
                    key={vendor.id}
                    onClick={() => router.push(`/vendor-application?id=${vendor.id}`)}
                    className="cursor-pointer"
                  >
                    {/* # */}
                    <TableCell className="pl-6 pr-3 py-4 text-xs text-gray-500 font-mono">
                      {((page - 1) * DEFAULT_PAGE_SIZE + (index + 1)).toString().padStart(2, "0")}
                    </TableCell>

                    {/* Vendor Name */}
                    <TableCell className="px-3 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-white/90">
                          {vendor.user?.fullName || "—"}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[12rem]">
                          {vendor.user?.email || "—"}
                        </span>
                      </div>
                    </TableCell>

                    {/* CNIC */}
                    <TableCell className="px-3 py-4">
                      <span className="text-xs text-gray-400 font-mono">
                        {vendor.cnic || "—"}
                      </span>
                    </TableCell>

                    {/* Business Name */}
                    <TableCell className="px-3 py-4">
                      <span className="text-sm text-white/80">
                        {vendor.businessName || "—"}
                      </span>
                    </TableCell>

                    {/* Business Type */}
                    <TableCell className="px-3 py-4">
                      <span className="text-sm text-gray-300 capitalize">
                        {vendor.businessType || "—"}
                      </span>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-3 py-4">
                      <Badge
                        variant="light"
                        color={statusBadgeColor(vendor.status)}
                        size="sm"
                      >
                        {vendor.status || "—"}
                      </Badge>
                    </TableCell>

                    {/* Verification */}
                    <TableCell className="py-4 pl-3 pr-6 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <Badge
                          variant="light"
                          color={vendor.isVerified ? "success" : "error"}
                          size="sm"
                        >
                          {vendor.isVerified ? "Verified" : "Unverified"}
                        </Badge>
                        <span className="text-[10px] text-gray-600">
                          {dayjs(vendor.createdAt).format("DD MMM, YYYY")}
                        </span>
                      </div>
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

export default VendorApplications;
