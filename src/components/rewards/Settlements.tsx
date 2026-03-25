"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Loading from "@/components/atoms/loading/loading";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/components/common/LanguageContext";
import { ApiErrorResponse } from "@/services/auth-api/auth-api.types";
import {
  useDeleteAdminRewardSettlementMutation,
  useGetAdminRewardSettlementsQuery,
} from "@/services/rewards-api";
import { TxLink, formatAmount, truncateAddress } from "./rewards-table-utils";
import { CreateSettlementModal } from "./CreateSettlementModal";

const DEFAULT_PAGE_SIZE = 10;

const TABLE_HEADERS = [
  "batchGroup",
  "status",
  "settlementParticipants",
  "settlementAmounts",
  "token",
  "userDistributions",
  "settlementTx",
  "createdAt",
  "actions",
] as const;

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{value}</p>
      {detail ? <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{detail}</p> : null}
    </div>
  );
}

function SettlementStatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toLowerCase();
  const classes =
    normalizedStatus === "completed"
      ? "bg-[#50FF56]/10 text-[#50FF56]"
      : normalizedStatus === "failed"
        ? "bg-red-500/10 text-red-400"
        : normalizedStatus === "submitted" || normalizedStatus === "processing"
          ? "bg-blue-500/10 text-blue-400"
          : "bg-amber-500/10 text-amber-400";

  return (
    <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {status}
    </span>
  );
}

function DistributionCell({
  recipients,
  rewardCount,
  symbol,
}: {
  recipients: { recipient: string; amount: string }[];
  rewardCount: number;
  symbol: string;
}) {
  return (
    <div className="flex min-w-[220px] flex-col gap-2">
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {recipients.length} recipients • {rewardCount} rewards
      </span>
      {recipients.slice(0, 2).map((distribution) => (
        <div key={`${distribution.recipient}-${distribution.amount}`} className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
            {truncateAddress(distribution.recipient)}
          </span>
          <span className="text-xs text-gray-700 dark:text-gray-300">
            {formatAmount(distribution.amount)} {symbol}
          </span>
        </div>
      ))}
      {recipients.length > 2 ? (
        <span className="text-xs text-gray-400">+{recipients.length - 2} more</span>
      ) : null}
    </div>
  );
}

export default function Settlements() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [isSettlementModalOpen, setIsSettlementModalOpen] = useState(false);
  const [deletingSettlementId, setDeletingSettlementId] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const { data, isLoading, isFetching } = useGetAdminRewardSettlementsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort,
  });
  const [deleteSettlement] = useDeleteAdminRewardSettlementMutation();

  const settlements = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;
  const currentPage = meta?.currentPage ?? page;
  const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + settlements.length - 1;
  const pendingCount = settlements.filter((settlement) => settlement.status.toLowerCase() === "pending").length;
  const completedCount = settlements.filter((settlement) => settlement.status.toLowerCase() === "completed").length;

  const handleDeleteSettlement = async (settlementId: string) => {
    const shouldDelete = window.confirm(t("deleteSingleSettlementConfirmation"));

    if (!shouldDelete) return;

    try {
      setDeletingSettlementId(settlementId);
      await deleteSettlement(settlementId).unwrap();
      toast.success(t("settlementDeleted"));
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      toast.error(apiError?.data?.message ?? t("settlementDeleteFailed"));
    } finally {
      setDeletingSettlementId(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <PageBreadcrumb pageTitle={t("settlements")} info={t("manageSettlements")} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label={t("totalSettlements")} value={String(totalItems)} />
        <SummaryCard
          label={t("page")}
          value={`${currentPage} / ${totalPages}`}
          detail={`${itemsPerPage} ${t("itemsPerPage")}`}
        />
        <SummaryCard label={t("pending")} value={String(pendingCount)} detail={t("onCurrentPage")} />
        <SummaryCard label={t("completed")} value={String(completedCount)} detail={t("onCurrentPage")} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as "asc" | "desc")}
            className="h-11 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#50FF56] dark:border-gray-700 dark:bg-white/[0.04] dark:text-gray-200"
          >
            <option value="desc">{t("newestFirst")}</option>
            <option value="asc">{t("oldestFirst")}</option>
          </select>
          <Button
            variant="outline"
            onClick={() => {
              setSort("desc");
              setPage(1);
            }}
          >
            {t("resetFilters")}
          </Button>
          {isFetching && !isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Loading size="sm" className="text-brand-500" />
              {t("refreshing")}
            </div>
          ) : null}
        </div>

        <Button onClick={() => setIsSettlementModalOpen(true)}>{t("createSettlement")}</Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loading size="lg" className="border-[#50FF56]" />
            </div>
          ) : settlements.length === 0 ? (
            <div className="py-16 text-center text-gray-400">{t("noSettlementsFound")}</div>
          ) : (
            <Table aria-label="Settlements table">
              <TableHeader className="border-b border-gray-100 bg-[#FAFAFA] dark:border-gray-800 dark:bg-[#18181887]">
                <TableRow>
                  {TABLE_HEADERS.map((header, index) => (
                    <TableCell
                      key={header}
                      isHeader
                      className={`whitespace-nowrap px-3 py-3 text-start text-base font-medium text-[#201D1D99] dark:text-white ${
                        index === 0 ? "pl-6" : ""
                      } ${index === TABLE_HEADERS.length - 1 ? "pr-6" : ""}`}
                    >
                      {t(header)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {settlements.map((settlement) => {
                  const canDelete =
                    !settlement.txHash &&
                    !settlement.submittedAt &&
                    !settlement.completedAt &&
                    !settlement.processedAt;

                  return (
                  <TableRow key={settlement.id}>
                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex min-w-[220px] flex-col gap-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {truncateAddress(settlement.batchGroupId)}
                        </span>
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          {settlement.id}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {t("batchLabel", { index: settlement.batchIndex })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <div className="flex min-w-[140px] flex-col gap-2">
                        <SettlementStatusBadge status={settlement.status} />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {t("attemptCount", { count: settlement.attemptCount })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <div className="flex min-w-[220px] flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {t("distributor")}: {truncateAddress(settlement.distributorAddress)}
                        </span>
                        <span>
                          {t("platformAddress")}: {truncateAddress(settlement.platformAddress)}
                        </span>
                        <span>
                          {t("recipientsLabel")}: {settlement.recipientCount} • {t("rewardIds")}: {settlement.rewardCount}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <div className="flex min-w-[180px] flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>{t("totalUserAmount")}: {formatAmount(settlement.userAmount)} {settlement.paymentTokenSymbol}</span>
                        <span>{t("totalPlatformAmount")}: {formatAmount(settlement.platformAmount)} {settlement.paymentTokenSymbol}</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t("totalAmount")}: {formatAmount(settlement.totalAmount)} {settlement.paymentTokenSymbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <div className="flex min-w-[140px] flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {settlement.paymentTokenSymbol}
                        </span>
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          {truncateAddress(settlement.paymentTokenAddress)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {settlement.chainId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <DistributionCell
                        recipients={settlement.userDistributions.map((distribution) => ({
                          recipient: distribution.recipient,
                          amount: distribution.amount,
                        }))}
                        rewardCount={settlement.rewardCount}
                        symbol={settlement.paymentTokenSymbol}
                      />
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <div className="flex min-w-[180px] flex-col gap-2">
                        {settlement.txHash ? (
                          <TxLink hash={settlement.txHash} chainId={settlement.chainId} />
                        ) : (
                          <span className="text-xs text-gray-400">{t("settlementPending")}</span>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {settlement.submittedAt
                            ? `${t("submittedAt")}: ${dayjs(settlement.submittedAt).format("MMM D, YYYY HH:mm")}`
                            : `${t("submittedAt")}: -`}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {settlement.completedAt
                            ? `${t("completedAt")}: ${dayjs(settlement.completedAt).format("MMM D, YYYY HH:mm")}`
                            : settlement.failedAt
                              ? `${t("failedAt")}: ${dayjs(settlement.failedAt).format("MMM D, YYYY HH:mm")}`
                              : `${t("lastCheckedAt")}: ${settlement.lastCheckedAt ? dayjs(settlement.lastCheckedAt).format("MMM D, YYYY HH:mm") : "-"}`}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pl-3 pr-6 text-xs text-gray-500 dark:text-gray-400">
                      {dayjs(settlement.createdAt).format("MMM D, YYYY HH:mm")}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 pr-6">
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => void handleDeleteSettlement(settlement.id)}
                        disabled={!canDelete || deletingSettlementId === settlement.id}
                      >
                        {deletingSettlementId === settlement.id ? <Loading size="sm" /> : t("deleteSettlement")}
                      </Button>
                    </TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>

        {!isLoading && totalItems > 0 ? (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("showingRecords", {
                start: rangeStart,
                end: rangeEnd,
                total: totalItems,
              })}
            </span>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </div>
        ) : null}
      </div>

      <CreateSettlementModal
        isOpen={isSettlementModalOpen}
        onClose={() => setIsSettlementModalOpen(false)}
      />
    </div>
  );
}