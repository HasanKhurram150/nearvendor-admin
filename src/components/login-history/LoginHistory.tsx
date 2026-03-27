"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetLoginHistoryQuery } from "@/services";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import dayjs from "dayjs";
import { ILoginHistoryItem } from "@/services/login-history-api/login-history-api.types";

const DEFAULT_PAGE_SIZE = 10;

const LoginHistory: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useGetLoginHistoryQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "loggedInAt",
    sort: "desc",
    ...(search ? { search } : {}),
  });

  const items = data?.data;
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const deviceBadgeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "desktop":
        return "primary";
      case "mobile":
        return "warning";
      case "tablet":
        return "info";
      default:
        return "light";
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb pageTitle="Login History" />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
        {/* Search Bar */}
        <div className="px-6 pt-5 pb-4">
          <div className="relative max-w-sm">
            <input
              type="text"
              placeholder="Search by email, country, IP..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-brand-500/40 focus:bg-white/[0.05]"
            />
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
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  IP Address
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Location
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
                >
                  Browser
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[7rem]"
                >
                  Device
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 pl-3 pr-6 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[10rem]"
                >
                  Logged In At
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#32AA00]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : items?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No login history found
                  </TableCell>
                </TableRow>
              ) : (
                items?.map((item: ILoginHistoryItem, index: number) => (
                  <React.Fragment key={item.id}>
                    {/* Main Row */}
                    <TableRow>
                      <TableCell className="pl-6 pr-3 py-4 text-xs text-gray-500 font-mono">
                        {((page - 1) * DEFAULT_PAGE_SIZE + index + 1)
                          .toString()
                          .padStart(2, "0")}
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold text-white/90">
                            {item.userLabel || item.email || "—"}
                          </span>
                          <span className="text-xs text-gray-500 truncate max-w-[12rem]">
                            {item.email || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <span className="text-xs text-gray-400 font-mono">
                          {item.ip || "—"}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm text-white/80">
                            {item.city || "—"}{item.countryCode ? `, ${item.countryCode}` : ""}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.countryName || ""}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <span className="text-sm text-gray-300">
                          {item.clientName || "—"}
                          {item.clientVersion ? ` ${item.clientVersion}` : ""}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-4">
                        <Badge
                          variant="light"
                          color={deviceBadgeColor(item.deviceType)}
                          size="sm"
                        >
                          {item.deviceType || "—"}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 pl-3 pr-6 text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-400">
                            {dayjs(item.loggedInAt).format("DD MMM, YYYY")}
                          </span>
                          <span className="text-[10px] text-gray-600">
                            {dayjs(item.loggedInAt).format("hh:mm A")}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expand Trigger Row */}
                    <TableRow hoverable={false}>
                      <TableCell colSpan={7} className="!p-0">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="w-full py-1.5 text-[11px] text-gray-500 hover:text-brand-400 hover:bg-white/[0.02] transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          {expandedId === item.id ? "Hide details ▲" : "Show details ▼"}
                        </button>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Detail Row */}
                    {expandedId === item.id && (
                      <TableRow hoverable={false}>
                        <TableCell colSpan={7} className="!p-0">
                          <ExpandedDetails item={item} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && meta && meta.totalItems > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(page - 1) * DEFAULT_PAGE_SIZE + 1} –{" "}
              {Math.min(page * DEFAULT_PAGE_SIZE, meta.totalItems)} of{" "}
              {meta.totalItems} records
            </span>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Expanded Detail Panel ── */
const ExpandedDetails: React.FC<{ item: ILoginHistoryItem }> = ({ item }) => {
  const details: { label: string; value: string }[] = [
    { label: "User ID", value: item.userId },
    { label: "Email", value: item.email },
    { label: "Wallet", value: item.address },
    { label: "IP", value: item.ip },
    { label: "Country", value: `${item.countryName} (${item.countryCode})` },
    { label: "Region", value: item.region },
    { label: "City", value: item.city },
    { label: "Timezone", value: item.timezone },
    { label: "Client", value: `${item.clientType} / ${item.clientName} ${item.clientVersion}` },
    { label: "OS", value: `${item.osName} ${item.osVersion} (${item.osPlatform})` },
    { label: "Device", value: `${item.deviceType} — ${item.deviceBrand} ${item.deviceModel}` },
    { label: "User Agent", value: item.userAgent },
    { label: "Fingerprint", value: item.fingerprint },
    { label: "Logged In", value: dayjs(item.loggedInAt).format("DD MMM YYYY, hh:mm:ss A") },
  ];

  return (
    <div className="bg-white/[0.02] border-t border-b border-white/[0.04] px-8 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
        {details.map((d) => (
          <div key={d.label} className="flex flex-col gap-0.5 overflow-hidden">
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
              {d.label}
            </span>
            <span className="text-xs text-gray-300 truncate" title={d.value}>
              {d.value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginHistory;
