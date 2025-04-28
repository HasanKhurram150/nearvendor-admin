"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGetAllAdvertiserQuery } from "@/services";
import PageBreadcrumb from "../common/PageBreadCrumb";

const AdvertiserManagement: React.FC = () => {
  const { data, isLoading } = useGetAllAdvertiserQuery();

  console.log("advertiser", data);

  // Define the TypeScript interface for the table rows
  interface Users {
    id: number;
    campaignName: string;
    campaignCode: string;
    advertiserName: string;
    campaignType: string;
    status: string;
    period: string;
    budget: string;
    event: string;
    channelEvent: string;
    inventory: string;
    executionRate: string;
  }

  // Define the table data using the interface
  const tableData: Users[] = [
    {
      id: 1,
      campaignName: "Spring Festival Promo",
      campaignCode: "CAMP-SF2025",
      advertiserName: "CityBuzz Media",
      campaignType: "Lead Generation",
      status: "Active",
      period: "Apr 1 – Apr 30, 2025",
      budget: "5,000",
      event: "Explore Spring Events",
      channelEvent: "Web + Mobile App",
      inventory: "Banner (728x90)",
      executionRate: "78%",
    },
    {
      id: 2,
      campaignName: "Spring Festival Promo",
      campaignCode: "CAMP-SF2025",
      advertiserName: "CityBuzz Media",
      campaignType: "Lead Generation",
      status: "Active",
      period: "Apr 1 – Apr 30, 2025",
      budget: "5,000",
      event: "Explore Spring Events",
      channelEvent: "Web + Mobile App",
      inventory: "Banner (728x90)",
      executionRate: "78%",
    },
    {
      id: 3,
      campaignName: "Spring Festival Promo",
      campaignCode: "CAMP-SF2025",
      advertiserName: "CityBuzz Media",
      campaignType: "Lead Generation",
      status: "Active",
      period: "Apr 1 – Apr 30, 2025",
      budget: "5,000",
      event: "Explore Spring Events",
      channelEvent: "Web + Mobile App",
      inventory: "Banner (728x90)",
      executionRate: "78%",
    },
    {
      id: 4,
      campaignName: "Spring Festival Promo",
      campaignCode: "CAMP-SF2025",
      advertiserName: "CityBuzz Media",
      campaignType: "Lead Generation",
      status: "Active",
      period: "Apr 1 – Apr 30, 2025",
      budget: "5,000",
      event: "Explore Spring Events",
      channelEvent: "Web + Mobile App",
      inventory: "Banner (728x90)",
      executionRate: "78%",
    },
    {
      id: 5,
      campaignName: "Spring Festival Promo",
      campaignCode: "CAMP-SF2025",
      advertiserName: "CityBuzz Media",
      campaignType: "Lead Generation",
      status: "Active",
      period: "Apr 1 – Apr 30, 2025",
      budget: "5,000",
      event: "Explore Spring Events",
      channelEvent: "Web + Mobile App",
      inventory: "Banner (728x90)",
      executionRate: "78%",
    },
  ];

  return (
    <>
      <PageBreadcrumb
        pageTitle="Advertiser Management"
        counter={true}
        counterText="Total Advertiser"
        counterValue={data?.map.length}
        btnCampaign={true}
      />
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
                  Campaign Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  Campaign Code
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
                  Advertiser Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  Campaign Type
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[12rem]"
                >
                  Period
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white  min-w-[8.125rem]"
                >
                  Budget ($)
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[15rem]"
                >
                  Event
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Channel Event
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Inventory
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white min-w-[10rem]"
                >
                  Execution Rate
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {tableData.map((user) => (
                <TableRow key={user.id} className="">
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {user.campaignName}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    {user.campaignCode}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                    {user.status}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {user.advertiserName}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    {user.campaignType}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                    {user.period}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                    {user.budget}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                    {user.event}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {user.channelEvent}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {user.inventory}
                  </TableCell>
                  <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                    {user.executionRate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdvertiserManagement;
