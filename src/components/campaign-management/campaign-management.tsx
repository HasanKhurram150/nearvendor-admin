"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetCampaignsQuery } from "@/services/campaign-api";
import Loading from "../atoms/loading/loading";
import { formatStartEndDate } from "@/utils/formatStartEndDate";
import { campaignColumns } from "./columns";
import PageBreadcrumb from "../common/PageBreadCrumb";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const CampaignManagement: React.FC = () => {
  const { data: campaigns, isLoading } = useGetCampaignsQuery({
    page: 1,
    limit: 200,
  });

  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 5;

  console.log("campaigns", campaigns);

  return (
    <>
      <PageBreadcrumb
        pageTitle="Campaign Management"
        counter={true}
        counterText="Total Campaign"
        counterValue={campaigns?.data.length}
        btnCampaign={true}
      />

      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] pb-[1.5rem]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header - Always visible */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {campaignColumns.map((col) => (
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
                    colSpan={campaignColumns.length}
                    className="text-center py-8"
                  >
                    <div className="flex justify-center">
                      <Loading size="lg" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : campaigns?.data?.length ? (
                campaigns.data.map((campaign) => (
                  <TableRow key={campaign?.id} className="">
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {campaign?.name}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {campaign?.uniqueId}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {campaign?.status}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {campaign?.name}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {campaign?.campaignType}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {formatStartEndDate(
                        campaign?.startDate,
                        campaign?.endDate,
                      )}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {campaign?.budgetTotal}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={campaignColumns.length}
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No campaigns found
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

export default CampaignManagement;
