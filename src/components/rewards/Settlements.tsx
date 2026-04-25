// "use client";

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import toast from "react-hot-toast";
// import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import Loading from "@/components/atoms/loading/loading";
// import Pagination from "@/components/tables/Pagination";
// import Button from "@/components/ui/button/Button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Badge from "@/components/ui/badge/Badge";
// import { useLanguage } from "@/components/common/LanguageContext";
// import Select from "@/components/form/Select";
// import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";
// // import {
// //   useDeleteAdminRewardSettlementMutation,
// //   useGetAdminRewardSettlementsQuery,
// // } from "@/services/rewards-api";
// import { TxLink, formatAmount, truncateAddress } from "./rewards-table-utils";
// import { CreateSettlementModal } from "./CreateSettlementModal";

// const DEFAULT_PAGE_SIZE = 10;

// const TABLE_HEADERS = [
//   "Batch & Status",
//   "Network & Participants",
//   "Settlement Details",
//   "Distribution Preview",
//   "Tx & Timeline",
//   "Actions",
// ] as const;

// function SummaryCard({
//   label,
//   value,
//   detail,
// }: {
//   label: string;
//   value: string;
//   detail?: string;
// }) {
//   return (
//     <div className="dashboard-card p-5">
//       <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
//       <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
//         {value}
//       </p>
//       {detail ? (
//         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//           {detail}
//         </p>
//       ) : null}
//     </div>
//   );
// }

// function SettlementStatusBadge({ status }: { status: string }) {
//   const normalizedStatus = status.toLowerCase();
//   const classes =
//     normalizedStatus === "completed"
//       ? "bg-[#FFFF00]/10 text-[#FFFF00]"
//       : normalizedStatus === "failed"
//         ? "bg-red-500/10 text-red-400"
//         : normalizedStatus === "submitted" || normalizedStatus === "processing"
//           ? "bg-blue-500/10 text-blue-400"
//           : "bg-amber-500/10 text-amber-400";

//   return (
//     <span
//       className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}
//     >
//       {status}
//     </span>
//   );
// }

// function DistributionCell({
//   recipients,
//   rewardCount,
//   symbol,
// }: {
//   recipients: { recipient: string; amount: string }[];
//   rewardCount: number;
//   symbol: string;
// }) {
//   return (
//     <div className="flex min-w-[220px] flex-col gap-2">
//       <span className="text-xs text-gray-500 dark:text-gray-400">
//         {recipients.length} recipients • {rewardCount} rewards
//       </span>
//       {recipients.slice(0, 2).map((distribution) => (
//         <div
//           key={`${distribution.recipient}-${distribution.amount}`}
//           className="flex items-center justify-between gap-3"
//         >
//           <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
//             {truncateAddress(distribution.recipient)}
//           </span>
//           <span className="text-xs text-gray-700 dark:text-gray-300">
//             {formatAmount(distribution.amount)} {symbol}
//           </span>
//         </div>
//       ))}
//       {recipients.length > 2 ? (
//         <span className="text-xs text-gray-400">
//           +{recipients.length - 2} more
//         </span>
//       ) : null}
//     </div>
//   );
// }

// export default function Settlements() {
//   const { t } = useLanguage();
//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState<"asc" | "desc">("desc");
//   const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
//   const [deletingSettlementId, setDeletingSettlementId] = useState<
//     string | null
//   >(null);

//   useEffect(() => {
//     setPage(1);
//   }, [sort]);

//   // const { data, isLoading, isFetching } = useGetAdminRewardSettlementsQuery({
//   //   page,
//   //   pageSize: DEFAULT_PAGE_SIZE,
//   //   sortBy: "createdAt",
//   //   sort,
//   // });
//   // const [deleteSettlement] = useDeleteAdminRewardSettlementMutation();
//   const data: any = null;
//   const isLoading = false;
//   const isFetching = false;
//   const deleteSettlement = async (...args: any[]) => ({ unwrap: () => {} });

//   const settlements = data?.data ?? [];
//   const meta = data?.meta;
//   const totalPages = meta?.totalPages ?? 1;
//   const totalItems = meta?.totalItems ?? 0;
//   const currentPage = meta?.currentPage ?? page;
//   const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
//   const rangeStart =
//     totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const rangeEnd = totalItems === 0 ? 0 : rangeStart + settlements.length - 1;
//   const pendingCount = settlements.filter(
//     (settlement) => settlement.status.toLowerCase() === "pending",
//   ).length;
//   const completedCount = settlements.filter(
//     (settlement) => settlement.status.toLowerCase() === "completed",
//   ).length;

//   const handleDeleteSettlement = async (settlementId: string) => {
//     const shouldDelete = window.confirm(
//       t("deleteSingleSettlementConfirmation"),
//     );

//     if (!shouldDelete) return;

//     try {
//       setDeletingSettlementId(settlementId);
//       await deleteSettlement(settlementId).unwrap();
//       toast.success(t("settlementDeleted"));
//     } catch (error) {
//       const apiError = error as ApiErrorResponse;
//       toast.error(apiError?.data?.message ?? t("settlementDeleteFailed"));
//     } finally {
//       setDeletingSettlementId(null);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 w-full">
//       <PageBreadcrumb
//         pageTitle={t("settlements")}
//         info={t("manageSettlements")}
//       />

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         <SummaryCard label={t("totalSettlements")} value={String(totalItems)} />
//         <SummaryCard
//           label={t("page")}
//           value={`${currentPage} / ${totalPages}`}
//           detail={`${itemsPerPage} ${t("itemsPerPage")}`}
//         />
//         <SummaryCard
//           label={t("pending")}
//           value={String(pendingCount)}
//           detail={t("onCurrentPage")}
//         />
//         <SummaryCard
//           label={t("completed")}
//           value={String(completedCount)}
//           detail={t("onCurrentPage")}
//         />
//       </div>

//       <div className="flex flex-wrap items-center justify-between gap-4 dashboard-card p-5">
//         <div className="flex flex-wrap items-center gap-4">
//           <Select
//             options={[
//               { value: "desc", label: t("newestFirst") },
//               { value: "asc", label: t("oldestFirst") },
//             ]}
//             defaultValue={sort}
//             onChange={(value) => setSort(value as "asc" | "desc")}
//             className="w-[180px]"
//           />
//           <Button
//             variant="outline"
//             onClick={() => {
//               setSort("desc");
//               setPage(1);
//             }}
//           >
//             {t("resetFilters")}
//           </Button>
//           {isFetching && !isLoading ? (
//             <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//               <Loading size="sm" className="text-brand-500" />
//               {t("refreshing")}
//             </div>
//           ) : null}
//         </div>

//         <Button onClick={() => setIsSettlementModalOpen(true)}>
//           {t("createSettlement")}
//         </Button>
//       </div>

//       <div className="overflow-hidden dashboard-card pb-6">
//         <div className="max-w-full overflow-x-auto">
//           {isLoading ? (
//             <div className="flex justify-center py-16">
//               <Loading size="lg" className="border-[#FFFF00]" />
//             </div>
//           ) : settlements.length === 0 ? (
//             <div className="py-16 text-center text-gray-400">
//               {t("noSettlementsFound")}
//             </div>
//           ) : (
//             <Table aria-label="Settlements table">
//               <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02]">
//                 <TableRow>
//                   {TABLE_HEADERS.map((header, index) => (
//                     <TableCell
//                       key={header}
//                       isHeader
//                       className={`whitespace-nowrap px-3 py-3 text-start text-base font-medium text-[#201D1D99] dark:text-white ${
//                         index === 0 ? "pl-6" : ""
//                       } ${index === TABLE_HEADERS.length - 1 ? "pr-6" : ""}`}
//                     >
//                       {header}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHeader>
//               <TableBody className="divide-y divide-[#1D1C1C]">
//                 {settlements.map((settlement) => {
//                   const canDelete =
//                     !settlement.txHash &&
//                     !settlement.submittedAt &&
//                     !settlement.completedAt &&
//                     !settlement.processedAt;

//                   return (
//                     <TableRow key={settlement.id}>
//                       {/* Batch & Status */}
//                       <TableCell className="whitespace-nowrap py-4 pl-6 pr-3 min-w-[16rem]">
//                         <div className="flex flex-col gap-2 text-left">
//                           <div className="flex flex-col">
//                             <span className="text-sm font-semibold text-white/90">
//                               Batch: {truncateAddress(settlement.batchGroupId)}
//                             </span>
//                             <span className="text-[10px] text-gray-500 font-mono">
//                               ID: {settlement.id}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <SettlementStatusBadge status={settlement.status} />
//                             <span className="text-[10px] text-gray-500">
//                               #{settlement.batchIndex} •{" "}
//                               {settlement.attemptCount} att
//                             </span>
//                           </div>
//                         </div>
//                       </TableCell>

//                       {/* Network & Participants */}
//                       <TableCell className="px-3 py-4 min-w-[14rem]">
//                         <div className="flex flex-col gap-2 text-left">
//                           <div className="flex flex-col">
//                             <span className="text-sm font-medium text-white/90">
//                               {settlement.paymentTokenSymbol}
//                             </span>
//                             <span className="text-[10px] text-gray-500 font-mono">
//                               {truncateAddress(settlement.paymentTokenAddress)}
//                             </span>
//                             <span className="text-[10px] text-gray-400">
//                               Chain {settlement.chainId}
//                             </span>
//                           </div>
//                           <div className="text-[10px] text-gray-500 bg-white/5 rounded px-2 py-1 w-fit">
//                             {settlement.recipientCount} Recipients •{" "}
//                             {settlement.rewardCount} Rewards
//                           </div>
//                         </div>
//                       </TableCell>

//                       {/* Settlement Details */}
//                       <TableCell className="px-3 py-4 min-w-[15rem]">
//                         <div className="flex flex-col gap-1.5 text-left text-xs">
//                           <div className="flex justify-between gap-4 border-b border-white/5 pb-1">
//                             <span className="text-gray-500">User Total:</span>
//                             <span className="text-gray-300 font-medium">
//                               {formatAmount(settlement.userAmount)}{" "}
//                               {settlement.paymentTokenSymbol}
//                             </span>
//                           </div>
//                           <div className="flex justify-between gap-4 border-b border-white/5 pb-1">
//                             <span className="text-gray-500">Platform:</span>
//                             <span className="text-gray-300 font-medium">
//                               {formatAmount(settlement.platformAmount)}{" "}
//                               {settlement.paymentTokenSymbol}
//                             </span>
//                           </div>
//                           <div className="flex justify-between gap-4 pt-0.5">
//                             <span className="text-gray-400 font-semibold">
//                               Total:
//                             </span>
//                             <span className="text-success-500 font-bold">
//                               {formatAmount(settlement.totalAmount)}{" "}
//                               {settlement.paymentTokenSymbol}
//                             </span>
//                           </div>
//                         </div>
//                       </TableCell>

//                       {/* Distribution Preview */}
//                       <TableCell className="px-3 py-4 min-w-[14rem]">
//                         <DistributionCell
//                           recipients={settlement.userDistributions.map(
//                             (distribution) => ({
//                               recipient: distribution.recipient,
//                               amount: distribution.amount,
//                             }),
//                           )}
//                           rewardCount={settlement.rewardCount}
//                           symbol={settlement.paymentTokenSymbol}
//                         />
//                       </TableCell>

//                       {/* Tx & Timeline */}
//                       <TableCell className="px-3 py-4 min-w-[14rem]">
//                         <div className="flex flex-col gap-2 text-left">
//                           {settlement.txHash ? (
//                             <TxLink
//                               hash={settlement.txHash}
//                               chainId={settlement.chainId}
//                             />
//                           ) : (
//                             <Badge
//                               variant="light"
//                               color="light"
//                               size="sm"
//                               className="w-fit"
//                             >
//                               Pending
//                             </Badge>
//                           )}
//                           <div className="flex flex-col text-[10px] text-gray-500">
//                             <span>
//                               Created:{" "}
//                               {dayjs(settlement.createdAt).format(
//                                 "DD MMM, HH:mm",
//                               )}
//                             </span>
//                             {settlement.completedAt && (
//                               <span className="text-success-500/80">
//                                 Done:{" "}
//                                 {dayjs(settlement.completedAt).format(
//                                   "DD MMM, HH:mm",
//                                 )}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </TableCell>

//                       {/* Actions */}
//                       <TableCell className="px-3 py-4 pr-6 min-w-[8rem] text-right">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={() =>
//                             void handleDeleteSettlement(settlement.id)
//                           }
//                           disabled={
//                             !canDelete || deletingSettlementId === settlement.id
//                           }
//                           className="text-red-400 hover:text-red-500 hover:bg-red-500/5 px-2"
//                         >
//                           {deletingSettlementId === settlement.id ? (
//                             <Loading size="sm" />
//                           ) : (
//                             "Delete"
//                           )}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           )}
//         </div>

//         {!isLoading && totalItems > 0 ? (
//           <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               {t("showingRecords", {
//                 start: rangeStart,
//                 end: rangeEnd,
//                 total: totalItems,
//               })}
//             </span>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setPage}
//             />
//           </div>
//         ) : null}
//       </div>

//       <CreateSettlementModal
//         isOpen={isSettlementModalOpen}
//         onClose={() => setIsSettlementModalOpen(false)}
//       />
//     </div>
//   );
// }
