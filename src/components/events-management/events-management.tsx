"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { calendarColumns } from "./columns";
import Loading from "../atoms/loading/loading";
import GenericButton from "../atoms/generic-button/generic-button";
import {
  DownloadIcon2,
  EditIcon,
  TelegramIcon,
  // EditIcon,
  // PlusIcon,
  // TrashBinIcon,
  UploadWhiteIcon,
} from "@/icons";
import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
import { GenericModal } from "../atoms/generic-modal";
import { UploadCSVModal } from "./upload-csv-modal";
import { useGetEventsQuery } from "@/services/events-management-api";
import dayjs from "dayjs";
import type { IEvent } from "@/services/events-management-api/events-management-api.types";
import FeaturedToggle from "./featured-toggle";
import { EditEventModal } from "./edit-event-modal";
import GenericPagination from "../atoms/generic-pagination/generic-pagination";
// import type { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
// import toast from "react-hot-toast";

const EventsManagement: React.FC = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleToggle = (isFeatured: boolean) => {
    console.log("Is Featured:", isFeatured);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  // const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  // API hooks
  const { data: events, isLoading } = useGetEventsQuery({
    page: 1,
    pageSize: 10,
  });

  console.log({ events });

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events?.filter((event) =>
      event?.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [events, searchQuery]);

  // Event handlers
  const handleOpenUploadModal = useCallback(
    () => setIsUploadModalOpen(true),
    [],
  );
  const handleCloseUploadModal = useCallback(
    () => setIsUploadModalOpen(false),
    [],
  );

  const toggleEditModal = () => {
    setIsEditModalOpen((prevVal) => !prevVal);
  };

  // const handleCloseEditModal = useCallback(() => {
  //   setIsEditModalOpen(false);
  //   setSelectedEvent(null);
  // }, []);

  const convertToCSV = useCallback((data: IEvent[]) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers
        .map(
          (field) =>
            `"${(row[field as keyof IEvent] ?? "").toString().replace(/"/g, '""')}"`,
        )
        .join(","),
    );

    return [headers.join(","), ...rows].join("\r\n");
  }, []);

  // const handleDownloadCSV = useCallback(() => {
  //   if (!events) return;

  //   const csv = convertToCSV(events);
  //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", "events.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }, [events, convertToCSV]);

  // Render helpers
  const renderTableContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell
            colSpan={calendarColumns.length}
            className="text-center py-8"
          >
            <div className="flex justify-center">
              <Loading size="lg" />
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (!filteredEvents || filteredEvents.length === 0) {
      return (
        <TableRow>
          <TableCell
            colSpan={calendarColumns.length}
            className="text-center py-8"
          >
            <span className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery ? "No matching events found" : "No events available"}
            </span>
          </TableCell>
        </TableRow>
      );
    }

    return filteredEvents.map((event) => (
      <TableRow key={event.id}>
        <TableCell className="pl-6 pr-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap min-w-[10rem]">
          <p className="max-w-[10rem] break-all whitespace-pre-wrap">
            {event.name}
          </p>
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap min-w-[10rem]">
          +92 321 1234567
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          {event.name ? (
            <a href="#" target="_blank">
              <TelegramIcon />
            </a>
          ) : (
            "N/A"
          )}
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          {dayjs(event.createdAt).format("ddd, DD MMM")}
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          {dayjs(event.startDateTime).format("hh:mm A")} -{" "}
          {dayjs(event.endDateTime).format("hh:mm A")}
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          {event.type}
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          {event.location?.location}
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          <a href="#" target="_blank">
            Link
          </a>
        </TableCell>
        <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          <FeaturedToggle defaultValue={false} onToggle={handleToggle} />
        </TableCell>
        <TableCell className="pl-3 pr-6 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 whitespace-nowrap">
          <div className="flex justify-end gap-2">
            <GenericButton
              icon={<EditIcon />}
              // aria-label={`Edit ${category.name}`}
              handleClick={toggleEditModal}
            />
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="flex flex-col gap-10 items-start w-full">
      {/* Search and Action Buttons Section */}
      <div className="flex justify-between flex-wrap gap-4 items-center w-full">
        <GenericSearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search events"
          aria-label="Search events"
        />
        <div className="flex flex-wrap sm:flex-nowrap gap-4 justify-start md:justify-end">
          <GenericButton
            icon={<UploadWhiteIcon />}
            btnText="Upload CSV"
            bgColor="#1862D4"
            color="#fff"
            borderColor="#1862D4"
            height="2.5rem"
            width="8.688rem"
            handleClick={handleOpenUploadModal}
            aria-label="Upload events CSV"
          />
          {/* <GenericButton
            icon={<DownloadIcon2 />}
            btnText="Download Sample CSV"
            bgColor="white"
            borderColor="#1024452E"
            color="#102445"
            height="2.5rem"
            width="13.688rem"
            handleClick={handleDownloadCSV}
            aria-label="Download events CSV sample"
          /> */}
        </div>
      </div>

      {/* Events Table */}
      <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] w-full pb-[1.5rem]">
        <div className="overflow-x-auto">
          <Table aria-label="Events management table" className="w-full">
            <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b">
              <TableRow>
                {calendarColumns.map((col, index) => (
                  <TableCell
                    key={col.id}
                    isHeader
                    className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white whitespace-nowrap last:text-right ${
                      index === 0 ? "pl-6" : ""
                    } ${index === calendarColumns.length - 1 ? "pr-6" : ""}`}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {renderTableContent()}
            </TableBody>
          </Table>
        </div>
        <GenericPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Modals */}
      <GenericModal
        isOpen={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        maxWidth="47.563rem"
        aria-label="Upload CSV modal"
      >
        <UploadCSVModal onClose={handleCloseUploadModal} />
      </GenericModal>
      <GenericModal
        isOpen={isEditModalOpen}
        onClose={toggleEditModal}
        maxWidth="31.25rem"
        aria-label="Upload CSV modal"
      >
        <EditEventModal onClose={toggleEditModal} />
      </GenericModal>
    </div>
  );
};

export default React.memo(EventsManagement);
