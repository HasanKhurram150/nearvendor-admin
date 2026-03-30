"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
// import Image from "next/image";
// import { useGetOurEventsQuery } from "@/services/events-management-api";
import Loading from "../atoms/loading/loading";
import Pagination from "@/components/tables/Pagination";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";

const DEFAULT_PAGE_SIZE = 10;

const Events: React.FC = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  // const { data, isLoading } = useGetOurEventsQuery({
  //   page,
  //   pageSize: DEFAULT_PAGE_SIZE,
  // });
  const data: any = null;
  const isLoading = false;

  const ourEvents = data?.data || []; // Array of events
  const meta = data?.meta; // Pagination meta data

  const totalPages = meta?.totalPages || 1;

  return (
    <>
      <PageBreadcrumb pageTitle={t("events")} />
      <div className="overflow-hidden dashboard-card min-h-[calc(100vh-200px)]">
        <div className="max-w-full overflow-x-auto">
          <Table hoverable>
            {/* Table Header - Always visible */}
            <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base min-w-[12rem]"
                >
                  {t("event")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base min-w-[12rem]"
                >
                  {t("date")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base min-w-[10rem]"
                >
                  {t("time")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base min-w-[8rem]"
                >
                  {t("location")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] dark:text-white text-start text-base min-w-[3.75rem]"
                >
                  {t("status")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loading size="lg" className="border-[#FFFF00]" />
                  </TableCell>
                </TableRow>
              ) : ourEvents?.length > 0 ? (
                ourEvents?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                            {user?.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {user?.date}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                      {user?.time}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8rem]">
                      {user?.address}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[3.75rem]">
                      {user?.type}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    {t("noEventsFound")}
                  </TableCell>
                </TableRow>
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
    </>
  );
};

export default Events;
