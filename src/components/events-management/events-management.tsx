// "use client";
// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useEventColumns } from "./columns";
// import Loading from "../atoms/loading/loading";
// import GenericButton from "../atoms/generic-button/generic-button";
// import {
//   CheckCircleIcon,
//   CloseIcon,
//   CloseLineIcon,
//   DownloadIcon2,
//   EditIcon,
//   TelegramIcon,
//   TrashBinIcon,
//   // EditIcon,
//   // PlusIcon,
//   UploadWhiteIcon,
// } from "@/icons";

// import GenericSearchField from "../atoms/generic-search-field/generic-search-field";
// import { GenericModal } from "../atoms/generic-modal";
// import { UploadCSVModal } from "./upload-csv-modal";
// // import {
// //   useGetEventsQuery,
// //   useUpdateEventMutation,
// //   useEventActionMutation,
// //   useDeleteEventMutation,
// // } from "@/services/events-management-api";
// import dayjs from "dayjs";
// // import type { IEvent } from "@/services/events-management-api/events-management-api.types";
// type IEvent = any;
// import FeaturedToggle from "./featured-toggle";
// import { EditEventModal } from "./edit-event-modal";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";
// import toast from "react-hot-toast";
// import { useDebounce } from "@/hooks/useDebounce";
// import Link from "next/link";
// import { useLanguage } from "../common/LanguageContext";
// import PageBreadcrumb from "../common/PageBreadCrumb";
// // import type { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
// // import toast from "react-hot-toast";

// const DEFAULT_PAGE_SIZE = 10;
// const DEBOUNCE_DELAY = 400;

// const EventsManagement: React.FC = () => {
//   // State management
//   const { t } = useLanguage();
//   const columns = useEventColumns();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const debouncedSearchTerm = useDebounce(searchQuery, DEBOUNCE_DELAY);
//   const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
//   const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   // API hooks
//   // const { data, isLoading } = useGetEventsQuery({
//   //   page,
//   //   pageSize: DEFAULT_PAGE_SIZE,
//   //   name: debouncedSearchTerm,
//   // });
//   // const [deleteEvent, { isLoading: isDeleteLaoding }] =
//   //   useDeleteEventMutation();
//   const data: any = { data: [], meta: { totalPages: 1 } };
//   const isLoading = false;
//   const [deleteEvent, { isLoading: isDeleteLaoding }] = [async (...args: any[]) => ({ unwrap: () => {} }), { isLoading: false }];

//   const events = data?.data; // Array of events
//   const meta = data?.meta; // Pagination meta data

//   const totalPages = meta?.totalPages || 1;

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearchTerm]);

//   // const [mutate] = useUpdateEventMutation();
//   // const [eventAction] = useEventActionMutation();
//   const [mutate] = [async (...args: any[]) => ({ unwrap: () => {} })];
//   const [eventAction] = [async (...args: any[]) => ({ unwrap: () => {} })];

//   const handleToggle = async (id: string, isFeatured: boolean) => {
//     try {
//       await mutate({
//         id: id,
//         body: {
//           isFeatured: !isFeatured,
//         },
//       });
//     } catch (err) {
//       toast.error("Something went wrong!");
//     }
//   };

//   const handleEventAction = async (id: string, action: string) => {
//     try {
//       await eventAction({
//         id: id,
//         action,
//       });
//     } catch (err) {
//       toast.error("Something went wrong!");
//     }
//   };

//   const handleDeleteEvent = async (id: string) => {
//     if (!id) return;
//     setDeletingEventId(id);
//     try {
//       await deleteEvent(id);
//       toast.success("Event deleted successfully");
//     } catch (err) {
//       toast.error("Failed to delete event");
//     } finally {
//       setDeletingEventId(null);
//     }
//   };

//   // Memoized filtered events
//   // const filteredEvents = useMemo(() => {
//   //   if (!events) return [];
//   //   return events?.filter((event) =>
//   //     event?.name.toLowerCase().includes(searchQuery.toLowerCase()),
//   //   );
//   // }, [events, searchQuery]);

//   // Event handlers
//   const handleOpenUploadModal = useCallback(
//     () => setIsUploadModalOpen(true),
//     [],
//   );
//   const handleCloseUploadModal = useCallback(
//     () => setIsUploadModalOpen(false),
//     [],
//   );

//   // const toggleEditModal = () => {
//   //   setIsEditModalOpen((prevVal) => !prevVal);
//   // };
//   const toggleEditModal = (event?: IEvent) => {
//     setIsEditModalOpen((prevVal) => !prevVal);
//     setSelectedEvent(event || null);
//   };

//   // const handleCloseEditModal = useCallback(() => {
//   //   setIsEditModalOpen(false);
//   //   setSelectedEvent(null);
//   // }, []);

//   const convertToCSV = useCallback((data: IEvent[]) => {
//     if (!data || data.length === 0) return "";

//     const headers = Object.keys(data[0]);
//     const rows = data.map((row) =>
//       headers
//         .map(
//           (field) =>
//             `"${(row[field as keyof IEvent] ?? "").toString().replace(/"/g, '""')}"`,
//         )
//         .join(","),
//     );

//     return [headers.join(","), ...rows].join("\r\n");
//   }, []);

//   // const handleDownloadCSV = useCallback(() => {
//   //   if (!events) return;

//   //   const csv = convertToCSV(events);
//   //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   //   const url = URL.createObjectURL(blob);

//   //   const link = document.createElement("a");
//   //   link.href = url;
//   //   link.setAttribute("download", "events.csv");
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // }, [events, convertToCSV]);

//   // Render helpers
//   const renderTableContent = () => {
//     if (isLoading) {
//       return (
//         <TableRow>
//           <TableCell colSpan={columns.length} className="py-8 text-center">
//             <div className="flex justify-center">
//               <Loading size="lg" className="border-[#FFFF00]" />
//             </div>
//           </TableCell>
//         </TableRow>
//       );
//     }

//     if (!events || events?.length === 0) {
//       return (
//         <TableRow>
//           <TableCell colSpan={columns.length} className="py-8 text-center">
//             <span className="text-gray-500 dark:text-gray-400 text-lg">
//               {searchQuery
//                 ? t("noMatchingEventsFound")
//                 : t("noEventsAvailable")}
//             </span>
//           </TableCell>
//         </TableRow>
//       );
//     }

//     return events?.map((event) => (
//       <TableRow key={event.id}>
//         <TableCell className="py-[1.25rem] pr-3 pl-6 min-w-[10rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           <p className="max-w-[10rem] break-all whitespace-pre-wrap">
//             {event.name}
//           </p>
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] min-w-[10rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event?.phoneNumber ? event.phoneNumber : "N/A"}
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event?.telegram?.length ? (
//             <a href={event.telegram} target="_blank">
//               <TelegramIcon />
//             </a>
//           ) : (
//             "N/A"
//           )}
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event?.date}
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event?.time}
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event.type}
//         </TableCell>
//         {/* <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event.location?.location}
//         </TableCell> */}
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           {event?.identifier ? (
//             <Link
//               href={`https://cfcy.io/event/${event.identifier}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-600 dark:text-blue-400 hover:underline"
//               aria-label="Open event"
//             >
//               Link
//             </Link>
//           ) : (
//             "N/A"
//           )}
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           <div className="flex justify-center items-center">
//             <FeaturedToggle
//               isFeatured={event.isFeatured}
//               onToggle={() => {
//                 handleToggle(event.id, event.isFeatured);
//               }}
//             />
//           </div>
//         </TableCell>
//         <TableCell className="px-3 py-[1.25rem] text-[#201D1D] dark:text-white/90 text-base text-capitalize whitespace-nowrap">
//           {event?.approvalStatus ? event.approvalStatus : "N/A"}
//         </TableCell>
//         <TableCell className="py-[1.25rem] pr-6 pl-3 text-[#201D1D] dark:text-white/90 text-base whitespace-nowrap">
//           <div className="flex justify-end gap-2">
//             {event.approvalStatus === "pending" ? (
//               <>
//                 {" "}
//                 <GenericButton
//                   icon={<CloseLineIcon />}
//                   // aria-label={`Edit ${category.name}`}
//                   handleClick={() => {
//                     handleEventAction(event.id, "rejected");
//                   }}
//                 />
//                 <GenericButton
//                   icon={<CheckCircleIcon />}
//                   // aria-label={`Edit ${category.name}`}
//                   handleClick={() => {
//                     handleEventAction(event.id, "approved");
//                   }}
//                 />
//               </>
//             ) : null}
//             <GenericButton
//               icon={<EditIcon />}
//               // aria-label={`Edit ${category.name}`}
//               handleClick={() => toggleEditModal(event)}
//             />
//             <GenericButton
//               icon={
//                 deletingEventId === event?.id ? (
//                   <Loading size="sm" />
//                 ) : (
//                   <TrashBinIcon />
//                 )
//               }
//               handleClick={() => handleDeleteEvent(event?.id)}
//               aria-label={`Delete ${event?.name}`}
//               disabled={deletingEventId === event?.id && isDeleteLaoding}
//             />
//           </div>
//         </TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <>
//       <PageBreadcrumb
//         pageTitle={t("eventManagement")}
//         info={t("manageEvents")}
//       />
//       <div className="flex flex-col items-start gap-10 w-full">
//         {/* Search and Action Buttons Section */}
//         <div className="flex flex-wrap justify-between items-center gap-4 w-full">
//           <GenericSearchField
//             value={searchQuery}
//             onChange={setSearchQuery}
//             placeholder={t("searchEvents")}
//             aria-label="Search events"
//           />
//           <div className="flex flex-wrap sm:flex-nowrap justify-start md:justify-end gap-4">
//             <GenericButton
//               icon={<UploadWhiteIcon />}
//               btnText={t("uploadCSV")}
//               bgColor="#FFFF00"
//               color="#fff"
//               borderColor="#FFFF00"
//               height="2.5rem"
//               width="8.688rem"
//               handleClick={handleOpenUploadModal}
//               aria-label="Upload events CSV"
//             />
//             {/* <GenericButton
//             icon={<DownloadIcon2 />}
//             btnText="Download Sample CSV"
//             bgColor="white"
//             borderColor="#1024452E"
//             color="#102445"
//             height="2.5rem"
//             width="13.688rem"
//             handleClick={handleDownloadCSV}
//             aria-label="Download events CSV sample"
//           /> */}
//           </div>
//         </div>

//         {/* Events Table */}
//         <div className="grid dashboard-card pb-[1.5rem] w-full min-h-[calc(100vh-200px)] overflow-hidden">
//           <div className="overflow-x-auto">
//             <Table aria-label="Events management table" className="w-full">
//               <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02]">
//                 <TableRow>
//                   {columns.map((col, index) => (
//                     <TableCell
//                       key={col.id}
//                       isHeader
//                       className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white whitespace-nowrap last:text-right ${
//                         index === 0 ? "pl-6" : ""
//                       } ${index === columns.length - 1 ? "pr-6" : ""}`}
//                     >
//                       {col.header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHeader>

//               <TableBody className="divide-y divide-[#1D1C1C]">
//                 {renderTableContent()}
//               </TableBody>
//             </Table>
//           </div>
//           {!isLoading && totalPages > 1 && (
//             <GenericPagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={setPage}
//             />
//           )}
//         </div>

//         {/* Modals */}
//         <GenericModal
//           isOpen={isUploadModalOpen}
//           onClose={handleCloseUploadModal}
//           maxWidth="47.563rem"
//           aria-label="Upload CSV modal"
//         >
//           <UploadCSVModal onClose={handleCloseUploadModal} />
//         </GenericModal>
//         <GenericModal
//           isOpen={isEditModalOpen}
//           onClose={toggleEditModal}
//           maxWidth="31.25rem"
//           aria-label="Upload CSV modal"
//         >
//           {/* <EditEventModal onClose={toggleEditModal} /> */}
//           <EditEventModal
//             onClose={() => toggleEditModal()}
//             eventId={selectedEvent?.id as string}
//           />
//         </GenericModal>
//       </div>
//     </>
//   );
// };

// export default React.memo(EventsManagement);
