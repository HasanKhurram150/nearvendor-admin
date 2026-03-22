"use client";
import React, { useState } from "react";
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
import GenericPagination from "../atoms/generic-pagination/generic-pagination";
import toast from "react-hot-toast";

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
    <>
      <PageBreadcrumb
        pageTitle={t("customers")}
        counter={true}
        counterText={t("totalCustomers")}
        counterValue={meta?.totalItems}
      />

      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] border dark:border-gray-800 pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="dark:bg-[#18181887] bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[3rem]"
                >
                  #
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
                >
                  {t("name")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
                >
                  {t("email")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
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
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  {t("createdAt")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  Referral Tree View
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#50FF56]" />
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
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90">
                      {(page - 1) * DEFAULT_PAGE_SIZE + index + 1}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {customer.name || "—"}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {customer.email || "—"}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem] max-w-[18rem] truncate">
                      {customer.address || "—"}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] min-w-[10rem]">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          customer.status === "enabled"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {new Date(customer.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] min-w-[12rem]">
                      <button
                        onClick={() =>
                          handleToggleReferralTreeView(
                            customer.accountId,
                            customer.referralTreeViewEnabled,
                          )
                        }
                        disabled={isToggling}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                          customer.referralTreeViewEnabled
                            ? "bg-[#50FF56]"
                            : "bg-gray-300 dark:bg-gray-600"
                        } ${isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        aria-label="Toggle referral tree view"
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            customer.referralTreeViewEnabled
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && totalPages > 1 && (
          <GenericPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </>
  );
};

export default CustomerManagement;
