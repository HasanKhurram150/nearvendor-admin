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
import { placementColumns } from "./columns";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const PlacementList: React.FC = () => {
  const { data: placements, isLoading } = useGetAllPlacementsQuery();

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 5;

  console.log("placements", placements);

  return (
    <>
      <PageBreadcrumb
        pageTitle="Placement List"
        counter={true}
        counterText="Total Placement"
        counterValue={placements?.length}
      />
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {placementColumns.map((col) => (
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
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={placementColumns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="lg" />
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
                    colSpan={placementColumns.length}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No placements found
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
