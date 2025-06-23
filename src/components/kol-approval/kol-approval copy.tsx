// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import Image from "next/image";
// import {
//   BlueIcon,
//   GoldenIcon,
//   InstagramIcon,
//   SilverIcon,
//   TelegramIcon,
//   TwitterIcon,
//   YoutubeIcon,
// } from "@/icons";
// import CustomDropdown from "./custom-select";
// import {
//   useGetKolRequestsQuery,
//   useUpdateKolRequestStatusMutation,
// } from "@/services/kols-api";
// import { IKolBadge, IKolStatus } from "@/services/kols-api/kols-api.types";
// import Button from "../ui/button/Button";
// import toast from "react-hot-toast";
// import Loading from "../atoms/loading/loading";
// import GenericPagination from "../atoms/generic-pagination/generic-pagination";

// export const IconMapper: { [key: string]: any } = {
//   golden: <GoldenIcon />,
//   blue: <BlueIcon />,
//   silver: <SilverIcon />,
// };

// const KOLApproval: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 5;

//   const [selectedBadges, setSelectedBadges] = useState<
//     Record<string, IKolBadge>
//   >({});

//   const [filterStatus, setFilterStatus] = useState<
//     "all" | "approved" | "rejected"
//   >("all");

//   const { data: kolRequests, isLoading, refetch } = useGetKolRequestsQuery();

//   const [updateKolStatus] = useUpdateKolRequestStatusMutation();

//   const handleBadgeSelect = (kolId: string, badge: IKolBadge) => {
//     setSelectedBadges((prev) => ({
//       ...prev,
//       [kolId]: badge,
//     }));
//   };

//   const handleUpdateStatus = async (id: string, status: IKolStatus) => {
//     try {
//       const badge = selectedBadges[id];
//       await updateKolStatus({
//         id,
//         body: {
//           status,
//           ...(badge ? { badge } : {}),
//         },
//       }).unwrap();

//       toast.success(`KOL request ${status} successfully`);
//       refetch();
//     } catch (error) {
//       toast.error(`Failed to update KOL request status`);
//       console.error("Error updating KOL status:", error);
//     }
//   };

//   const filteredKolRequests =
//     filterStatus === "all"
//       ? kolRequests
//       : kolRequests?.filter((kol) => kol.status === filterStatus);

//   const paginatedData = filteredKolRequests?.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize,
//   );

//   const totalPages = Math.ceil((filteredKolRequests?.length || 0) / pageSize);

//   return (
//     <div className="rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] pb-[1.5rem]">
//       <div className="min-w-full">
//         <Table>
//           <TableHeader className="bg-[#FAFAFA] border-gray-100 dark:border-gray-800 border-b px-[1rem]">
//             <TableRow>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 text-start text-base font-medium text-[#201D1D99] dark:text-white min-w-[10rem]"
//               >
//                 Users
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 text-center text-base font-medium text-[#201D1D99] dark:text-white min-w-[10rem]"
//               >
//                 Social Handles
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 text-start text-base font-medium text-[#201D1D99] dark:text-white min-w-[10rem]"
//               >
//                 Audience
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 text-start text-base font-medium text-[#201D1D99] dark:text-white min-w-[15rem]"
//               >
//                 Description
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="py-3 px-3 text-start text-base font-medium text-[#201D1D99] dark:text-white min-w-[12rem]"
//               >
//                 Badges
//               </TableCell>
//               <TableCell
//                 isHeader
//                 className="flex items-center justify-center py-3 px-3 text-center text-base font-medium text-[#201D1D99] dark:text-white min-w-[3.75rem]"
//               >
//                 Status
//                 <div className="flex justify-end pl-4 py-0">
//                   <select
//                     value={filterStatus}
//                     onChange={(e) => {
//                       setCurrentPage(1); // Reset to page 1 on filter change
//                       setFilterStatus(e.target.value as any);
//                     }}
//                     className="border border-gray-300 rounded-xl pl-1 pr-3 py-1 text-sm text-[#201D1D99] bg-white"
//                   >
//                     <option value="all">All</option>
//                     <option value="approved">Approved</option>
//                     <option value="rejected">Rejected</option>
//                   </select>
//                 </div>
//               </TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
//             {isLoading ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={6}
//                   className="text-center py-10 text-gray-500 dark:text-gray-400"
//                 >
//                   <Loading size="lg" />
//                 </TableCell>
//               </TableRow>
//             ) : filteredKolRequests?.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={6}
//                   className="text-center py-10 text-gray-500 dark:text-gray-400"
//                 >
//                   No KOLs found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedData?.map((kol) => (
//                 <TableRow key={kol?.id}>
//                   <TableCell className="px-3 py-[1.25rem] min-w-[10rem]">
//                     <div className="flex items-center gap-3">
//                       <div className="h-[27px] w-[27px] overflow-hidden rounded-md">
//                         <Image
//                           width={27}
//                           height={27}
//                           src={
//                             kol?.user?.image || "/images/user/userProfile.png"
//                           }
//                           className="h-[27px] w-[27px]"
//                           alt={kol?.user?.name}
//                           style={{ borderRadius: "50%" }}
//                         />
//                       </div>
//                       <div>
//                         <p className="font-medium text-[#201D1D] text-base dark:text-white/90">
//                           {kol?.user?.name}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>

//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-center min-w-[10rem]">
//                     <div className="flex gap-4 items-center justify-center">
//                       {kol?.instagram ? (
//                         <a href={kol.instagram} target="_blank">
//                           <InstagramIcon />
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                       {kol?.x ? (
//                         <a href={kol.x} target="_blank">
//                           <TwitterIcon />
//                         </a>
//                       ) : (
//                         "N/A"
//                       )}
//                     </div>
//                   </TableCell>

//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90">
//                     {kol?.totalAudienceSite}
//                   </TableCell>

//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
//                     {kol?.aboutYou}
//                   </TableCell>

//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
//                     {!kol?.badge ? (
//                       <CustomDropdown
//                         onSelect={(badge: IKolBadge) =>
//                           handleBadgeSelect(kol.id, badge)
//                         }
//                       />
//                     ) : (
//                       <div className="flex gap-2 items-center justify-start capitalize">
//                         {IconMapper[kol.badge]} {kol.badge}
//                       </div>
//                     )}
//                   </TableCell>

//                   <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 text-center min-w-[3.75rem] flex items-center justify-center h-[6rem]">
//                     {kol?.status === "pending" ? (
//                       <div className="flex gap-2 items-center justify-center">
//                         <Button
//                           size="sm"
//                           variant="success"
//                           onClick={() => handleUpdateStatus(kol.id, "approved")}
//                           className="h-6 text-xs"
//                           disabled={!selectedBadges[kol.id]}
//                         >
//                           Approve
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="destructive"
//                           onClick={() => handleUpdateStatus(kol.id, "rejected")}
//                           className="h-6 text-xs"
//                           disabled={!selectedBadges[kol.id]}
//                         >
//                           Reject
//                         </Button>
//                       </div>
//                     ) : (
//                       <span
//                         className="capitalize flex items-center justify-center text-xs h-[1.5rem] w-[5rem] rounded-md"
//                         style={{
//                           background:
//                             kol.status === "approved" ? "#7BD481" : "#FF3737",
//                           color: "#fff",
//                         }}
//                       >
//                         {kol.status.toLowerCase()}
//                       </span>
//                     )}
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {totalPages > 1 && (
//         <GenericPagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       )}
//     </div>
//   );
// };

// export default KOLApproval;
