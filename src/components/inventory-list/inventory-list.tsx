"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { inventoryColumns } from "./columns";
import { useGetAllInventoryQuery } from "@/services";
import Loading from "../atoms/loading/loading";

const InventoryList: React.FC = () => {
  const { data: inventory, isLoading } = useGetAllInventoryQuery({
    page: 1,
    limit: 10,
  });

  console.log("inventory", inventory);

  // Define the TypeScript interface for the table rows
  interface Inventory {
    id: number;
    inventoryName: string;
    inventoryCode: string;
    status: string;
    placement: string;
    advertiser: string;
    campaignName: string;
    targetGroup: string;
    adid: string;
    creative: string;
    exposure: string;
    totalClicks: string;
  }

  // Define the table data using the interface
  const tableData: Inventory[] = [
    {
      id: 1,
      inventoryName: "홈중단배너",
      inventoryCode: "H1",
      status: "Active",
      placement: "Placement",
      advertiser: "CityBuzz Media",
      campaignName: "CityBuzz Media",
      targetGroup: "4343",
      adid: "3434",
      creative: "3243",
      exposure: "3123",
      totalClicks: "231",
    },
    {
      id: 2,
      inventoryName: "홈중단배너",
      inventoryCode: "H1",
      status: "Active",
      placement: "Placement",
      advertiser: "CityBuzz Media",
      campaignName: "CityBuzz Media",
      targetGroup: "4343",
      adid: "3434",
      creative: "3243",
      exposure: "3123",
      totalClicks: "231",
    },
    {
      id: 3,
      inventoryName: "홈중단배너",
      inventoryCode: "H1",
      status: "Active",
      placement: "Placement",
      advertiser: "CityBuzz Media",
      campaignName: "CityBuzz Media",
      targetGroup: "4343",
      adid: "3434",
      creative: "3243",
      exposure: "3123",
      totalClicks: "231",
    },
    {
      id: 4,
      inventoryName: "홈중단배너",
      inventoryCode: "H1",
      status: "Active",
      placement: "Placement",
      advertiser: "CityBuzz Media",
      campaignName: "CityBuzz Media",
      targetGroup: "4343",
      adid: "3434",
      creative: "3243",
      exposure: "3123",
      totalClicks: "231",
    },
    {
      id: 5,
      inventoryName: "홈중단배너",
      inventoryCode: "H1",
      status: "Active",
      placement: "Placement",
      advertiser: "CityBuzz Media",
      campaignName: "CityBuzz Media",
      targetGroup: "4343",
      adid: "3434",
      creative: "3243",
      exposure: "3123",
      totalClicks: "231",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              {inventoryColumns.map((col) => (
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
                <TableCell className="text-center py-8">
                  <div className="flex justify-center">
                    <Loading size="lg" />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {inventory?.data.map((item) => (
                  <TableRow key={item?.id} className="">
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.inventoryName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.uniqueId}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                      {item?.status}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.placement?.placementName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.campaign?.advertiser?.nickName}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                      {item?.campaign?.name}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.exposureCounter}
                    </TableCell>
                    <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                      {item?.totalClicks}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryList;
