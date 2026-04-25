// "use client";
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useGetAllAdvertiserQuery } from "@/services";
// import PageBreadcrumb from "../common/PageBreadCrumb";
// import { useAdvertiserColumns } from "./columns";
// import Loading from "../atoms/loading/loading";
// import { useLanguage } from "../common/LanguageContext";
// import GenericButton from "../atoms/generic-button/generic-button";
// import { EditIcon } from "@/icons";
// import { useRouter } from "next/navigation";
// // import GenericPagination from "../atoms/generic-pagination/generic-pagination";

// const AdvertiserManagement: React.FC = () => {
//   const { t } = useLanguage();
//   const columns = useAdvertiserColumns();
//   const router = useRouter();
//   const { data: advertisers, isLoading } = useGetAllAdvertiserQuery();

//   // const [currentPage, setCurrentPage] = useState(1);
//   // const totalPages = 5;
//   const handleEditInventory = (id: string) => {
//     router.push(`/edit-advertiser/${id}`);
//   };

//   return (
//     <>
//       <PageBreadcrumb
//         pageTitle={t("advertiserManagement")}
//         counter={true}
//         counterText={t("totalAdvertiser")}
//         counterValue={advertisers?.length}
//         btnAdvertiser={true}
//       />
//       {/* <div className="overflow-hidden rounded-2xl bg-white dark:bg-white/[0.03] min-h-[calc(100vh-200px)] border dark:border-gray-800 pb-[1.5rem]"> */}
//       <div className="grid overflow-hidden dashboard-card min-h-[calc(100vh-200px)] w-full pb-[1.5rem]">
//         <div className="max-w-full overflow-x-auto">
//           <Table>
//             {/* Table Header - Always visible */}
//             <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02] px-[1rem]">
//               <TableRow>
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.id}
//                     isHeader
//                     className={`py-3 px-3 font-medium text-[#201D1D99] text-start text-base dark:text-white ${col.className}`}
//                   >
//                     {col.header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHeader>

//             {/* Table Body */}
//             <TableBody className="divide-y divide-[#1D1C1C]">
//               {isLoading ? (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="text-center py-8"
//                   >
//                     <div className="flex justify-center">
//                       <Loading size="lg" className="border-[#FFFF00]" />
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ) : advertisers?.length ? (
//                 advertisers.map((advertiser) => (
//                   <TableRow key={advertiser?.id} className="">
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
//                       {advertiser?.companyName}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
//                       {advertiser?.nickName}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
//                       {advertiser?.registrationNumber}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[15rem]">
//                       {advertiser?.representative}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
//                       {advertiser?.departmentName}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[12rem]">
//                       {advertiser?.bankName}
//                     </TableCell>
//                     <TableCell className="px-3 py-[1.25rem] text-[#201D1D] text-base dark:text-white/90 min-w-[8.125rem]">
//                       {advertiser?.businessRegistrationDocument}
//                     </TableCell>
//                     <TableCell className="pl-3 pr-6 py-5 text-left min-w-[10rem]">
//                       <div className="flex justify-start gap-2">
//                         <GenericButton
//                           icon={<EditIcon />}
//                           aria-label={`Edit ${advertiser?.nickName}`}
//                           handleClick={() => {
//                             handleEditInventory(advertiser.id);
//                           }}
//                         />
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="text-center py-10 text-gray-500 dark:text-gray-400"
//                   >
//                     {t("noAdvertisersFound")}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         {/* <GenericPagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         /> */}
//       </div>
//     </>
//   );
// };

// export default AdvertiserManagement;
