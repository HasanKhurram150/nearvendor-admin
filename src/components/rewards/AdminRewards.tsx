"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { useGetAdminRewardsQuery, useGetAdminRewardsSummaryQuery } from "@/services/rewards-api";
import {
  TxLink,
  formatAmount,
  formatBeneficiaryType,
  formatRewardType,
  truncateAddress,
} from "./rewards-table-utils";

const DEFAULT_PAGE_SIZE = 10;
type TranslateFn = ReturnType<typeof useLanguage>["t"];

const TABLE_HEADERS = [
  "nft",
  "beneficiary",
  "rewardType",
  "level",
  "rewardAmount",
  "sourceAmount",
  "pools",
  "token",
  "rewardTx",
  "settlement",
  "rewardedAt",
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
      {detail ? (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{detail}</p>
      ) : null}
    </div>
  );
}

function PoolsBreakdown({
  rewardPoolAmount,
  referralPoolAmount,
  platformPoolAmount,
  symbol,
}: {
  rewardPoolAmount: string;
  referralPoolAmount: string;
  platformPoolAmount: string;
  symbol: string;
}) {
  return (
    <div className="flex min-w-[170px] flex-col gap-1 text-xs text-gray-500 dark:text-gray-400">
      <span>Reward: {formatAmount(rewardPoolAmount)} {symbol}</span>
      <span>Referral: {formatAmount(referralPoolAmount)} {symbol}</span>
      <span>Platform: {formatAmount(platformPoolAmount)} {symbol}</span>
    </div>
  );
}

function BeneficiaryCell({
  beneficiaryType,
  beneficiaryKey,
  beneficiaryUserId,
  beneficiaryWalletAddress,
}: {
  beneficiaryType: string;
  beneficiaryKey: string;
  beneficiaryUserId: string | null;
  beneficiaryWalletAddress: string | null;
}) {
  return (
    <div className="flex min-w-[190px] flex-col gap-1">
      <span className="inline-flex w-fit items-center rounded-full bg-[#50FF56]/10 px-2.5 py-0.5 text-xs font-medium text-[#50FF56]">
        {formatBeneficiaryType(beneficiaryType)}
      </span>
      <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
        {beneficiaryUserId ?? beneficiaryWalletAddress ?? beneficiaryKey}
      </span>
    </div>
  );
}

function SettlementCell({
  isSettled,
  settlementAt,
  settlementTx,
  chainId,
  t,
}: {
  isSettled: boolean;
  settlementAt: string | null;
  settlementTx: string | null;
  chainId: number;
  t: TranslateFn;
}) {
  return (
    <div className="flex min-w-[180px] flex-col gap-2">
      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          isSettled
            ? "bg-[#50FF56]/10 text-[#50FF56]"
            : "bg-amber-500/10 text-amber-400"
        }`}
      >
        {isSettled ? t("settled") : t("unsettled")}
      </span>
      {settlementTx ? (
        <TxLink hash={settlementTx} chainId={chainId} />
      ) : (
        <span className="text-xs text-gray-400">{t("settlementPending")}</span>
      )}
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {settlementAt ? dayjs(settlementAt).format("MMM D, YYYY HH:mm") : "-"}
      </span>
    </div>
  );
}

export default function AdminRewards() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const { data, isLoading, isFetching } = useGetAdminRewardsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort,
  });
  const { data: summary, isLoading: isSummaryLoading } = useGetAdminRewardsSummaryQuery();

  const rewards = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;
  const currentPage = meta?.currentPage ?? page;
  const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + rewards.length - 1;
  const latestRewardAt = summary?.latestRewardAt
    ? dayjs(summary.latestRewardAt).format("MMM D, YYYY HH:mm")
    : "-";

  return (
    <div className="flex flex-col gap-8">
      <PageBreadcrumb
        pageTitle={t("adminRewards")}
        info={t("manageAdminRewards")}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label={t("totalRewards")}
          value={isSummaryLoading ? "..." : String(summary?.totalRewardCount ?? 0)}
          detail={summary ? `${formatAmount(summary.totalRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
        />
        <SummaryCard
          label={t("userRewardsSummary")}
          value={isSummaryLoading ? "..." : String(summary?.totalUserRewardCount ?? 0)}
          detail={summary ? `${formatAmount(summary.totalUserRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
        />
        <SummaryCard
          label={t("platformRewardsSummary")}
          value={isSummaryLoading ? "..." : String(summary?.totalPlatformRewardCount ?? 0)}
          detail={summary ? `${formatAmount(summary.totalPlatformRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
        />
        <SummaryCard
          label={t("unsettledRewardsSummary")}
          value={isSummaryLoading ? "..." : String(summary?.totalUnsettledRewardCount ?? 0)}
          detail={summary ? `${formatAmount(summary.totalUnsettledRewardAmount)} ${t("rewardAmountLabel")}` : undefined}
        />
        <SummaryCard
          label={t("uniquePurchasers")}
          value={isSummaryLoading ? "..." : String(summary?.uniquePurchasers ?? 0)}
        />
        <SummaryCard
          label={t("uniqueBeneficiaries")}
          value={isSummaryLoading ? "..." : String(summary?.uniqueBeneficiaries ?? 0)}
        />
        <SummaryCard
          label={t("averageReward")}
          value={isSummaryLoading ? "..." : formatAmount(summary?.averageRewardAmount)}
        />
        <SummaryCard
          label={t("latestReward")}
          value={isSummaryLoading ? "..." : latestRewardAt}
          detail={summary ? `${t("uniqueRewardOrders")}: ${summary.uniqueRewardOrders} • ${t("uniqueNfts")}: ${summary.uniqueNfts}` : undefined}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
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
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loading size="sm" className="text-brand-500" />
            {t("refreshing")}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loading size="lg" className="border-[#50FF56]" />
            </div>
          ) : rewards.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              {t("noAdminRewardsFound")}
            </div>
          ) : (
            <Table aria-label="Admin rewards table">
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
                {rewards.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex min-w-[180px] flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {row.nftName}
                        </span>
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          #{row.nftTokenId} • {truncateAddress(row.nftId)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <BeneficiaryCell
                        beneficiaryType={row.beneficiaryType}
                        beneficiaryKey={row.beneficiaryKey}
                        beneficiaryUserId={row.beneficiaryUserId}
                        beneficiaryWalletAddress={row.beneficiaryWalletAddress}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <span className="inline-flex items-center rounded-full bg-[#50FF56]/10 px-2.5 py-0.5 text-xs font-medium text-[#50FF56]">
                        {formatRewardType(row.rewardType)}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {row.level ?? "-"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <span className="text-sm font-semibold text-[#50FF56]">
                        {formatAmount(row.rewardAmount)} {row.paymentTokenSymbol}
                      </span>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.sourceAmount)} {row.paymentTokenSymbol}
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <PoolsBreakdown
                        rewardPoolAmount={row.rewardPoolAmount}
                        referralPoolAmount={row.referralPoolAmount}
                        platformPoolAmount={row.platformPoolAmount}
                        symbol={row.paymentTokenSymbol}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      <div className="flex min-w-[140px] flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {row.paymentTokenSymbol}
                        </span>
                        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                          {truncateAddress(row.paymentTokenAddress)} • {row.chainId}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap px-3 py-3">
                      {row.nftProcessedTx ? (
                        <TxLink hash={row.nftProcessedTx} chainId={row.chainId} />
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="px-3 py-3">
                      <SettlementCell
                        isSettled={row.isSettled}
                        settlementAt={row.settlementAt}
                        settlementTx={row.settlementTx}
                        chainId={row.chainId}
                        t={t}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap py-3 pl-3 pr-6 text-xs text-gray-500 dark:text-gray-400">
                      {dayjs(row.rewardAt).format("MMM D, YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {!isLoading && totalItems > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("showingRecords", {
                start: rangeStart,
                end: rangeEnd,
                total: totalItems,
              })}
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}