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
import {
  DownloadIcon2,
  EditIcon,
  PlusIcon,
  TrashBinIcon,
  UploadIcon,
} from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { EditCategoryModal } from "./edit-category-modal";
import { AddEventModal } from "./add-event-modal";
import CSVUploadButton from "../atoms/csv-upload-button/csv-upload-button";

const EventsManagement: React.FC = () => {
  const [query, setQuery] = useState("");
  const [addEventModal, setAddEventModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);

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

  const handleOpenAddEventModal = () => {
    setAddEventModal(true);
  };
  const handleCloseAddEventModal = () => {
    setAddEventModal(false);
  };

  const handleOpenEditCategoryModal = () => {
    setEditCategoryModal(true);
  };
  const handleCloseEditCategoryModal = () => {
    setEditCategoryModal(false);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return "";
  
    const headers = Object.keys(data[0]);
    const rows = data.map(row =>
      headers.map(field => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(",")
    );
  
    return [headers.join(","), ...rows].join("\r\n");
  };

  const handleDownloadCSV = () => {
    const csv = convertToCSV(calendarData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "calendar_events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex justify-start flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={query}
          onChange={setQuery}
          placeholder="Search by name, type or location"
        />
        <CSVUploadButton />
        <GenericButton
          icon={<DownloadIcon2 />}
          btnText="Download CSV"
          bgColor="white"
          borderColor="#1024452E"
          color="#102445"
          height="2.5rem"
          width="9.813rem"
          handleClick={handleDownloadCSV}

        />
        <GenericButton
          icon={<PlusIcon />}
          btnText="Add New"
          bgColor="#1862D4"
          color="#fff"
          height="2.5rem"
          width="8.063rem"
          handleClick={handleOpenAddEventModal}
        />
      </div>
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] w-full">
        <div className="max-w-full overflow-x-auto">
          <Table>
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
                        {item?.eventName}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
                        {item?.type}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
                        {item?.date}{" "}
                        <span className="text-[#201D1D80]">
                          {" "}
                          {item?.startTime} - {item?.endTime}
                        </span>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {item?.location}
                      </TableCell>
                      <TableCell className=" pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-right min-w-[12rem]">
                        <div className="flex justify-end gap-2">
                          <GenericButton
                            icon={<EditIcon />}
                            handleClick={handleOpenEditCategoryModal}
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
      </div>
      <GenericModal
        isOpen={addEventModal}
        // isOpen={true}
        onClose={handleCloseAddEventModal}
      >
        <AddEventModal onClose={handleCloseAddEventModal} />
      </GenericModal>
      <GenericModal
        isOpen={editCategoryModal}
        onClose={handleCloseEditCategoryModal}
      >
        <EditCategoryModal onClose={handleCloseEditCategoryModal} />
      </GenericModal>
    </div>
  );
};

export default EventsManagement;
