"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { calendarColumns, calendarData } from "./columns";
import { useGetAllInventoryQuery } from "@/services";
import Loading from "../atoms/loading/loading";
import GenericButton from "../atoms/generic-button/generic-button";
import { EditIcon, TrashBinIcon } from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import Image from "next/image";
import { EditCalendarModal } from "./edit-calendar-modal";
import FeaturedToggle from "../events-management/featured-toggle";
import GenericPagination from "../atoms/generic-pagination/generic-pagination";

const CalendarsManagement: React.FC = () => {
  const [query, setQuery] = useState("");
  const [editCalendarModal, setEditCalendarModal] = useState(false);

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

  const handleOpenEditCalendarModal = () => {
    setEditCalendarModal(true);
  };
  const handleCloseEditCalendarModal = () => {
    setEditCalendarModal(false);
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      <div className="flex justify-start flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={query}
          onChange={setQuery}
          placeholder="Search by name or identifier"
        />
        {/* <GenericButton
          icon={<PlusIcon />}
          btnText="Add Calendar"
          bgColor="#1862D4"
          color="#fff"
          height="2.5rem"
          width="8.063rem"
          handleClick={handleOpenAddCalendarModal}
        /> */}
      </div>
      <div className="grid overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] w-full pb-[1.5rem]">
        <div className="overflow-x-auto">
          <Table aria-label="Calendars management table" className="w-full">
            {/* Table Header */}
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
              <TableRow>
                {calendarColumns.map((col) => (
                  <TableCell
                    key={col.id}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className} last:text-right first:pl-6 last:pr-6`}
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
                  {calendarData.map((item, index) => (
                    <TableRow key={index} className="first: last:">
                      <TableCell className=" pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        <div className="flex items-center gap-3">
                          <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
                            <Image
                              width={27}
                              height={27}
                              src={
                                item?.profileImage ||
                                "/images/user/userProfile.png"
                              }
                              className="h-[27px] w-[27px]"
                              alt={item?.calendarName}
                              loading="lazy"
                              style={{ borderRadius: "50%" }}
                            />
                          </div>
                          <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
                            {item?.calendarName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                        {item?.description}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                        {item?.identifier}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                        <Image
                          src={item?.cover}
                          alt="cover"
                          width={47}
                          height={23}
                        />
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[10rem]">
                        <div
                          className="flex justify-center gap-2 items-center h-[1.5rem] w-[6.563rem] rounded-3xl px-1"
                          style={{ background: item?.colorBg }}
                        >
                          <span
                            className="h-[0.75rem] w-[0.75rem] rounded-xl"
                            style={{ background: item?.colorCode }}
                          />
                          <p
                            className="text-base leading-[16px]"
                            style={{ color: item?.colorCode }}
                          >
                            {item?.colorCode}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap min-w-[12rem]">
                        <div className="flex justify-center items-center">
                          <FeaturedToggle
                            isFeatured={true}
                            onToggle={() => {}}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                        {item?.location}
                      </TableCell>
                      <TableCell className=" pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-right min-w-[10rem]">
                        <div className="flex justify-end gap-2">
                          <GenericButton
                            icon={<EditIcon />}
                            handleClick={handleOpenEditCalendarModal}
                          />
                          <GenericButton icon={<TrashBinIcon />} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Uncomment when functionality will apply */}
        {/* {!isLoading && totalPages > 1 && (
          <GenericPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )} */}
      </div>
      <GenericModal
        isOpen={editCalendarModal}
        // isOpen={true}
        onClose={handleCloseEditCalendarModal}
        maxWidth="47.563rem"
      >
        <EditCalendarModal onClose={handleCloseEditCalendarModal} />
      </GenericModal>
    </div>
  );
};

export default CalendarsManagement;
