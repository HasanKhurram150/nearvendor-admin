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
  UploadWhiteIcon,
} from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { EditCategoryModal } from "./edit-event-modal";
// import CSVUploadButton from "../atoms/csv-upload-button/csv-upload-button";
// import SearchFilterDropdown from "./search-filter-dropdown";
import Link from "next/link";
import { GenericCheckbox } from "../atoms";
import { UploadCSVModal } from "./upload-csv-modal";

const EventsManagement: React.FC = () => {
  const [query, setQuery] = useState("");
  const [uploadCSVModal, setUploadCSVModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const toggleUploadCSVModal = () => {
    setUploadCSVModal((prevVal) => !prevVal);
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
    const rows = data.map((row) =>
      headers
        .map(
          (field) => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`,
        )
        .join(","),
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

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    console.log("Checkbox is now:", checked);
  };

  return (
    <div className="flex flex-col gap-[2.5rem] items-start w-full">
      <div className="flex justify-between flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={query}
          onChange={setQuery}
          placeholder="Search"
        />
        <div className="flex flex-wrap sm:flex-nowarp gap-4 justify-start md:justify-end">
          {/* <CSVUploadButton /> */}
          <GenericButton
            icon={<UploadWhiteIcon />}
            btnText="Upload CSV"
            bgColor="#1862D4"
            color="#fff"
            borderColor="#1862D4"
            height="2.5rem"
            width="8.688rem"
            handleClick={toggleUploadCSVModal}
          />
          <GenericButton
            icon={<DownloadIcon2 />}
            btnText="Download Sample CSV"
            bgColor="white"
            borderColor="#1024452E"
            color="#102445"
            height="2.5rem"
            width="13.688rem"
            handleClick={handleDownloadCSV}
          />
        </div>
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
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className} [&:nth-child(7)]-text-center last:text-right first:pl-6 last:pr-6`}
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
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-8rem]">
                        {item?.date}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-15rem]">
                        {item?.startTime} - {item?.endTime}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-8rem]">
                        {item?.type}
                      </TableCell>

                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
                        {item?.address}
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#067CC1] text-base dark:text-white/90 min-w-[8rem]">
                        <Link href={item?.link}>View</Link>
                      </TableCell>
                      <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[9.5rem] flex justify-center">
                        <GenericCheckbox
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
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
        isOpen={uploadCSVModal}
        // isOpen={true}
        onClose={toggleUploadCSVModal}
        maxWidth="47.563rem"
      >
        <UploadCSVModal onClose={toggleUploadCSVModal} />
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
