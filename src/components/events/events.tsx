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
import { useGetOurEventsQuery } from "@/services/events-management-api";
import Loading from "../atoms/loading/loading";
import GenericPagination from "../atoms/generic-pagination/generic-pagination";
import { useLanguage } from "../common/LanguageContext";
import PageBreadcrumb from "../common/PageBreadCrumb";

const DEFAULT_PAGE_SIZE = 10;

const Events: React.FC = () => {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetOurEventsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const ourEvents = data?.data || []; // Array of events
  const meta = data?.meta; // Pagination meta data

  const totalPages = meta?.totalPages || 1;

  return (
    <>
      <PageBreadcrumb pageTitle={t("events")} />
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]  border dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="dark:bg-[#18181887] bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  {t("event")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  {t("date")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  {t("time")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8rem]"
                >
                  {t("location")}
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[3.75rem]"
                >
                  {t("status")}
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loading size="lg" className="border-[#1862D4]" />
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

export default Events;
