"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllAdvertiserQuery } from "@/services";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { advertiserColumns } from "./columns";
import Loading from "../atoms/loading/loading";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const AdvertiserManagement: React.FC = () => {
  const { data: advertisers, isLoading } = useGetAllAdvertiserQuery();

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 5;

  console.log("advertiser", advertisers);

  return (
    <>
      <PageBreadcrumb
        pageTitle="Advertiser Management"
        counter={true}
        counterText="Total Advertiser"
        counterValue={advertisers?.length}
        btnAdvertiser={true}
      />
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {advertiserColumns.map((col) => (
                  <TableCell
                    key={col.id}
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
                    colSpan={advertiserColumns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : advertisers?.length ? (
                advertisers.map((advertiser) => (
                  <TableRow key={advertiser?.id} className="">
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {advertiser?.companyName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {advertiser?.nickName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {advertiser?.registrationNumber}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {advertiser?.representative}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {advertiser?.departmentName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {advertiser?.bankName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {advertiser?.businessRegistrationDocument}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={advertiserColumns.length}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No advertisers found
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

export default AdvertiserManagement;
