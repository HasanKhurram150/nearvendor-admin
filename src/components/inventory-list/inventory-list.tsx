"use client";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";


const InventoryList: React.FC = () => {

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
  totalClicks: string
}
 
// Define the table data using the interface
const tableData: Inventory[] = [
  {
    id: 1,
    inventoryName: "홈중단배너",
    inventoryCode: "H1",
    status: 'Active',
    placement:'Placement',
    advertiser: 'CityBuzz Media',
    campaignName: 'CityBuzz Media',
    targetGroup:'4343',
    adid:'3434',
    creative:'3243',
    exposure:'3123',
    totalClicks:'231',
  },
  {
    id: 2,
    inventoryName: "홈중단배너",
    inventoryCode: "H1",
    status: 'Active',
    placement:'Placement',
    advertiser: 'CityBuzz Media',
    campaignName: 'CityBuzz Media',
    targetGroup:'4343',
    adid:'3434',
    creative:'3243',
    exposure:'3123',
    totalClicks:'231',
  },
  {
    id: 3,
    inventoryName: "홈중단배너",
    inventoryCode: "H1",
    status: 'Active',
    placement:'Placement',
    advertiser: 'CityBuzz Media',
    campaignName: 'CityBuzz Media',
    targetGroup:'4343',
    adid:'3434',
    creative:'3243',
    exposure:'3123',
    totalClicks:'231',
  },
  {
    id: 4,
    inventoryName: "홈중단배너",
    inventoryCode: "H1",
    status: 'Active',
    placement:'Placement',
    advertiser: 'CityBuzz Media',
    campaignName: 'CityBuzz Media',
    targetGroup:'4343',
    adid:'3434',
    creative:'3243',
    exposure:'3123',
    totalClicks:'231',
  },
  {
    id: 5,
    inventoryName: "홈중단배너",
    inventoryCode: "H1",
    status: 'Active',
    placement:'Placement',
    advertiser: 'CityBuzz Media',
    campaignName: 'CityBuzz Media',
    targetGroup:'4343',
    adid:'3434',
    creative:'3243',
    exposure:'3123',
    totalClicks:'231',
  },
];

  return (


<div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
              >
                Inventory Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               Inventory Code
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[8.125rem]"
              >
               Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
              >
               Placement
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
              Advertiser
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
              >
               Campaign Name
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               Target Group
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
              >
               ADID
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[8.125rem]"
              >
               Creative
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[8.125rem]"
              >
               Exposure
              </TableCell>
              <TableCell
                isHeader
                className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[8.125rem]"
              >
               Total Clicks
              </TableCell>
             
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((user) => (
              <TableRow key={user.id} className="">
            <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {user.inventoryName}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                  {user.inventoryCode}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                {user.status}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                {user.placement}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                  {user.advertiser}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                {user.campaignName}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                  {user.targetGroup}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                  {user.adid}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                 {user.creative}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                 {user.exposure}
                </TableCell>
                <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                 {user.totalClicks}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
      
  );
};


export default InventoryList;
