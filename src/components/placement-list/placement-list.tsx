"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllPlacementsQuery } from "@/services/placement-api";
import Loading from "../atoms/loading/loading";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { usePlacementColumns } from "./columns";
import { useLanguage } from "../common/LanguageContext";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const PlacementList: React.FC = () => {
  const { t } = useLanguage();
  const columns = usePlacementColumns();
  const { data: placements, isLoading } = useGetAllPlacementsQuery();

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 5;

  console.log("placements", placements);

  return (
    <>
      <PageBreadcrumb
        pageTitle={t("placementList")}
        counter={true}
        counterText={t("totalPlacement")}
        counterValue={placements?.length}
      />
      {/* <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] border dark:border-gray-800 pb-[1.5rem]"> */}
      <div className="grid overflow-hidden dashboard-card min-h-[calc(100vh-200px)] w-full pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col?.id}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className}`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-[#1D1C1C]">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#FFFF00]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : placements?.length ? (
                placements.map((placement) => (
                  <TableRow key={placement?.id} className="">
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {placement?.placementCode}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {placement?.placementName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {placement?.form}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {placement?.width}* {placement?.height}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {placement?.support}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      0
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    {t("noPlacementsFound")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* <GenericPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        /> */}
      </div>
    </>
  );
};

export default PlacementList;
