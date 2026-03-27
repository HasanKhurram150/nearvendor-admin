"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  useGetCustomersQuery,
  useToggleReferralTreeViewMutation,
} from "@/services";
import PageBreadcrumb from "../common/PageBreadCrumb";
import Loading from "../atoms/loading/loading";
import { useLanguage } from "../common/LanguageContext";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { truncateAddress } from "@/components/rewards/rewards-table-utils";
import { useState } from "react";

const DEFAULT_PAGE_SIZE = 10;

const CustomerManagement: React.FC = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCustomersQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort: "desc",
  });

  const [toggleReferralTreeView, { isLoading: isToggling }] =
    useToggleReferralTreeViewMutation();

  const customers = data?.data;
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleToggleReferralTreeView = async (
    accountId: string,
    currentValue: boolean,
  ) => {
    try {
      await toggleReferralTreeView({
        accountId,
        enabled: !currentValue,
      }).unwrap();
      toast.success(
        `Referral tree view ${
          !currentValue ? "enabled" : "disabled"
        } successfully`,
      );
    } catch {
      toast.error("Failed to update referral tree view");
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <PageBreadcrumb
        pageTitle={t("customers")}
        counter={true}
        counterText={t("totalCustomers")}
        counterValue={meta?.totalItems}
      />

      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)] pb-[1.5rem]">
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
                  Customer Info
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[14rem]"
                >
                  {t("address")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  {t("status")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Registration
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 pl-3 pr-6 font-medium text-[#201D1D99] text-end text-base dark:text-white min-w-[10rem]"
                >
                  Referral Tree
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
              ) : customers?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    {t("noCustomersFound")}
                  </TableCell>
                </TableRow>
              ) : (
                customers?.map((customer, index) => (
                  <TableRow key={customer.accountId}>
                    <TableCell className="pl-6 pr-3 py-4 text-xs text-gray-500 font-mono">
                      {((page - 1) * DEFAULT_PAGE_SIZE + index + 1).toString().padStart(2, '0')}
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-white/90">
                          {customer.name || "—"}
                        </span>
                        <span className="text-xs text-gray-500 truncate max-w-[12rem]">
                          {customer.email || "—"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <span className="text-xs text-gray-400 font-mono" title={customer.address ?? ""}>
                        {truncateAddress(customer.address ?? "") || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-4">
                      <Badge
                        variant="light"
                        color={customer.status === "enabled" ? "success" : "error"}
                        size="sm"
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4 text-xs text-gray-500">
                      {dayjs(customer.createdAt).format("DD MMM, YYYY")}
                    </TableCell>
                    <TableCell className="py-4 pl-3 pr-6 text-right">
                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            handleToggleReferralTreeView(
                              customer.accountId,
                              customer.referralTreeViewEnabled,
                            )
                          }
                          disabled={isToggling}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
                            customer.referralTreeViewEnabled
                              ? "bg-[#32AA00]"
                              : "bg-white/5"
                          } ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                          aria-label="Toggle referral tree view"
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                              customer.referralTreeViewEnabled
                                ? "translate-x-5"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && meta && meta.totalItems > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("showingRecords", {
                start: (page - 1) * DEFAULT_PAGE_SIZE + 1,
                end: Math.min(page * DEFAULT_PAGE_SIZE, meta.totalItems),
                total: meta.totalItems,
              })}
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

export default CustomerManagement;
