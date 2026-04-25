// "use client";

// import React, { useEffect, useState } from "react";
// import dayjs from "dayjs";
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
// // import { useGetAdminRewardsQuery, useGetAdminRewardsSummaryQuery } from "@/services/rewards-api";
// import {
//   TxLink,
//   formatAmount,
//   formatBeneficiaryType,
//   formatRewardType,
//   truncateAddress,
// } from "./rewards-table-utils";
// import { CreateSettlementModal } from "./CreateSettlementModal";

// const DEFAULT_PAGE_SIZE = 10;
// type TranslateFn = ReturnType<typeof useLanguage>["t"];

// const TABLE_HEADERS = [
//   "NFT & Level",
//   "Beneficiary Info",
//   "Financial Details",
//   "Network & Tx",
//   "Settlement Status",
//   "Rewarded At",
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
//       <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{value}</p>
//       {detail ? (
//         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{detail}</p>
//       ) : null}
//     </div>
//   );
// }

// function PoolsBreakdown({
//   rewardPoolAmount,
//   referralPoolAmount,
//   platformPoolAmount,
//   symbol,
// }: {
//   rewardPoolAmount: string;
//   referralPoolAmount: string;
//   platformPoolAmount: string;
//   symbol: string;
// }) {
//   return (
//     <div className="flex min-w-[170px] flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
//       <span>Reward: {formatAmount(rewardPoolAmount)} {symbol}</span>
//       <span>Referral: {formatAmount(referralPoolAmount)} {symbol}</span>
//       <span>Platform: {formatAmount(platformPoolAmount)} {symbol}</span>
//     </div>
//   );
// }

// function BeneficiaryCell({
//   beneficiaryType,
//   beneficiaryKey,
//   beneficiaryUserId,
//   beneficiaryWalletAddress,
// }: {
//   beneficiaryType: string;
//   beneficiaryKey: string;
//   beneficiaryUserId: string | null;
//   beneficiaryWalletAddress: string | null;
// }) {
//   return (
//     <div className="flex min-w-[190px] flex-col gap-1">
//       <span className="inline-flex w-fit items-center rounded-full bg-[#FFFF00]/10 px-2.5 py-0.5 text-xs font-medium text-[#FFFF00]">
//         {formatBeneficiaryType(beneficiaryType)}
//       </span>
//       <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
//         {beneficiaryUserId ?? beneficiaryWalletAddress ?? beneficiaryKey}
//       </span>
//     </div>
//   );
// }

// function SettlementCell({
//   isSettled,
//   settlementAt,
//   settlementTx,
//   chainId,
//   t,
// }: {
//   isSettled: boolean;
//   settlementAt: string | null;
//   settlementTx: string | null;
//   chainId: number;
//   t: TranslateFn;
// }) {
//   return (
//     <div className="flex min-w-[180px] flex-col gap-2">
//       <span
//         className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
//           isSettled
//             ? "bg-[#FFFF00]/10 text-[#FFFF00]"
//             : "bg-amber-500/10 text-amber-400"
//         }`}
//       >
//         {isSettled ? t("settled") : t("unsettled")}
//       </span>
//       {settlementTx ? (
//         <TxLink hash={settlementTx} chainId={chainId} />
//       ) : (
//         <span className="text-xs text-gray-400">{t("settlementPending")}</span>
//       )}
//       <span className="text-xs text-gray-500 dark:text-gray-400">
//         {settlementAt ? dayjs(settlementAt).format("MMM D, YYYY HH:mm") : "-"}
//       </span>
//     </div>
//   );
// }

// export default function AdminRewards() {
//   const { t } = useLanguage();
//   const [page, setPage] = useState(1);
//   const [sort, setSort] = useState<"asc" | "desc">("desc");
//   const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);

//   useEffect(() => {
//     setPage(1);
//   }, [sort]);

//   // const { data, isLoading, isFetching } = useGetAdminRewardsQuery({
//   //   page,
//   //   pageSize: DEFAULT_PAGE_SIZE,
//   //   sortBy: "createdAt",
//   //   sort,
//   // });
//   // const { data: summary, isLoading: isSummaryLoading } = useGetAdminRewardsSummaryQuery();
//   const data: any = null;
//   const isLoading = false;
//   const isFetching = false;
//   const summary: any = null;
//   const isSummaryLoading = false;

//   const rewards = data?.data ?? [];
//   const meta = data?.meta;
//   const totalPages = meta?.totalPages ?? 1;
//   const totalItems = meta?.totalItems ?? 0;
//   const currentPage = meta?.currentPage ?? page;
//   const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
//   const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
//   const rangeEnd = totalItems === 0 ? 0 : rangeStart + rewards.length - 1;
//   const latestRewardAt = summary?.latestRewardAt
//     ? dayjs(summary.latestRewardAt).format("MMM D, YYYY HH:mm")
//     : "-";

//   return (
//     <div className="flex flex-col gap-8">
//       <PageBreadcrumb
//         pageTitle={t("adminRewards")}
//         info={t("manageAdminRewards")}
//       />

//       <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//         <SummaryCard
//           label={t("totalRewards")}
//           value={isSummaryLoading ? "..." : String(summary?.totalRewardCount ?? 0)}
//           detail={summary ? `${formatAmount(summary.totalRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
//         />
//         <SummaryCard
//           label={t("userRewardsSummary")}
//           value={isSummaryLoading ? "..." : String(summary?.totalUserRewardCount ?? 0)}
//           detail={summary ? `${formatAmount(summary.totalUserRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
//         />
//         <SummaryCard
//           label={t("platformRewardsSummary")}
//           value={isSummaryLoading ? "..." : String(summary?.totalPlatformRewardCount ?? 0)}
//           detail={summary ? `${formatAmount(summary.totalPlatformRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
//         />
//         <SummaryCard
//           label={t("unsettledRewardsSummary")}
//           value={isSummaryLoading ? "..." : String(summary?.totalUnsettledRewardCount ?? 0)}
//           detail={summary ? `${formatAmount(summary.totalUnsettledRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
//         />
//         <SummaryCard
//           label={t("uniquePurchasers")}
//           value={isSummaryLoading ? "..." : String(summary?.uniquePurchasers ?? 0)}
//         />
//         <SummaryCard
//           label={t("uniqueBeneficiaries")}
//           value={isSummaryLoading ? "..." : String(summary?.uniqueBeneficiaries ?? 0)}
//         />
//         <SummaryCard
//           label={t("averageReward")}
//           value={isSummaryLoading ? "..." : formatAmount(summary?.averageRewardAmount)}
//         />
//         <SummaryCard
//           label={t("latestReward")}
//           value={isSummaryLoading ? "..." : latestRewardAt}
//           detail={summary ? `${t("uniqueRewardOrders")}: ${summary.uniqueRewardOrders} • ${t("uniqueNfts")}: ${summary.uniqueNfts}` : undefined}
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
//           {isFetching && !isLoading && (
//             <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
//               <Loading size="sm" className="text-brand-500" />
//               {t("refreshing")}
//             </div>
//           )}
//         </div>
//         <Button
//           onClick={() => setIsSettlementModalOpen(true)}
//           disabled={(summary?.totalUnsettledRewardCount ?? 0) === 0}
//         >
//           {t("createSettlement")}
//         </Button>
//       </div>

//       <div className="overflow-hidden dashboard-card pb-6">
//         <div className="max-w-full overflow-x-auto">
//           {isLoading ? (
//             <div className="flex justify-center py-16">
//               <Loading size="lg" className="border-[#FFFF00]" />
//             </div>
//           ) : rewards.length === 0 ? (
//             <div className="py-16 text-center text-gray-400">
//               {t("noAdminRewardsFound")}
//             </div>
//           ) : (
//             <Table aria-label="Admin rewards table">
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
//                 {rewards.map((row) => (
//                   <TableRow key={row.id}>
//                     {/* NFT & Level */}
//                     <TableCell className="pl-6 pr-3 py-4 min-w-[15rem]">
//                       <div className="flex flex-col gap-2 text-left">
//                         <div className="flex flex-col">
//                           <span className="text-sm font-semibold text-white/90 truncate max-w-[12rem]">
//                             {row.nftName}
//                           </span>
//                           <span className="text-[10px] text-gray-500 font-mono">
//                             #{row.nftTokenId} • {truncateAddress(row.nftId)}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Badge variant="light" color="primary" size="sm">
//                             {formatRewardType(row.rewardType)}
//                           </Badge>
//                           {row.level && (
//                             <span className="text-[10px] text-gray-500 bg-white/5 rounded px-1.5 py-0.5">
//                               Lvl {row.level}
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </TableCell>

//                     {/* Beneficiary Info */}
//                     <TableCell className="px-3 py-4 min-w-[14rem]">
//                       <div className="flex flex-col gap-2 text-left">
//                         <BeneficiaryCell
//                           beneficiaryType={row.beneficiaryType}
//                           beneficiaryKey={row.beneficiaryKey}
//                           beneficiaryUserId={row.beneficiaryUserId}
//                           beneficiaryWalletAddress={row.beneficiaryWalletAddress}
//                         />
//                          <div className="text-[10px] text-gray-500 bg-white/5 rounded px-2 py-1 w-fit">
//                            {row.paymentTokenSymbol} • Chain {row.chainId}
//                          </div>
//                       </div>
//                     </TableCell>

//                     {/* Financial Details */}
//                     <TableCell className="px-3 py-4 min-w-[16rem]">
//                       <div className="flex flex-col gap-1.5 text-left">
//                         <div className="flex justify-between items-center border-b border-white/5 pb-1">
//                           <span className="text-sm font-bold text-[#FFFF00]">
//                             {formatAmount(row.rewardAmount)} {row.paymentTokenSymbol}
//                           </span>
//                           <span className="text-[10px] text-gray-500">
//                              Src: {formatAmount(row.sourceAmount)}
//                           </span>
//                         </div>
//                         <PoolsBreakdown
//                           rewardPoolAmount={row.rewardPoolAmount}
//                           referralPoolAmount={row.referralPoolAmount}
//                           platformPoolAmount={row.platformPoolAmount}
//                           symbol={row.paymentTokenSymbol}
//                         />
//                       </div>
//                     </TableCell>

//                     {/* Network & Tx */}
//                     <TableCell className="px-3 py-4 min-w-[12rem]">
//                       <div className="flex flex-col gap-1.5 text-left">
//                         {row.nftProcessedTx ? (
//                           <TxLink hash={row.nftProcessedTx} chainId={row.chainId} />
//                         ) : (
//                           <span className="text-gray-500 text-xs">—</span>
//                         )}
//                         <span className="text-[10px] font-mono text-gray-500">
//                           {truncateAddress(row.paymentTokenAddress)}
//                         </span>
//                       </div>
//                     </TableCell>

//                     {/* Settlement Status */}
//                     <TableCell className="px-3 py-4 min-w-[14rem]">
//                       <SettlementCell
//                         isSettled={row.isSettled}
//                         settlementAt={row.settlementAt}
//                         settlementTx={row.settlementTx}
//                         chainId={row.chainId}
//                         t={t}
//                       />
//                     </TableCell>

//                     {/* Rewarded At */}
//                     <TableCell className="whitespace-nowrap py-4 pl-3 pr-6 text-xs text-gray-500 dark:text-gray-400">
//                       {dayjs(row.rewardAt).format("DD MMM, HH:mm")}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </div>

//         {!isLoading && totalItems > 0 && (
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
//         )}
//       </div>

//       <CreateSettlementModal
//         isOpen={isSettlementModalOpen}
//         onClose={() => setIsSettlementModalOpen(false)}
//       />
//     </div>
//   );
// }
