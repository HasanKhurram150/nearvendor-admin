"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Loading from "@/components/atoms/loading/loading";
import Pagination from "@/components/tables/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPlatformRewardsQuery } from "@/services/rewards-api";
import { useDebounce } from "@/hooks/useDebounce";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { TxLink, formatAmount, formatRewardType, truncateAddress } from "./rewards-table-utils";

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

const TABLE_HEADERS = [
  "NFT",
  "Reward Type",
  "Reward Amount",
  "Source Amount",
  "Platform Pool",
  "Referral Pool",
  "Reward Pool",
  "Token",
  "Chain",
  "Tx Hash",
  "Rewarded At",
  "Undistributed Referral",
];

export default function PlatformRewards() {
  const [page, setPage] = useState(1);
  const [rewardType, setRewardType] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const debouncedRewardType = useDebounce(rewardType.trim(), DEBOUNCE_DELAY);

  useEffect(() => {
    setPage(1);
  }, [debouncedRewardType, sort]);

  const { data, isLoading, isFetching } = useGetPlatformRewardsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort,
    rewardType: debouncedRewardType || undefined,
  });

  const rewards = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;
  const currentPage = meta?.currentPage ?? page;
  const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + rewards.length - 1;

  return (
    <div className="flex flex-col gap-8">
      <PageBreadcrumb
        pageTitle="Platform Rewards"
        info="Browse all platform reward transactions."
      />

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.totalItems ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.currentPage ?? 1} / {meta?.totalPages ?? 1}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Items Per Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <Input
          placeholder="Filter by reward type (e.g. nft_purchase)"
          value={rewardType}
          onChange={(e) => setRewardType(e.target.value)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "asc" | "desc")}
          className="h-11 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/[0.04] px-4 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-[#50FF56] cursor-pointer"
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
        <Button
          variant="outline"
          onClick={() => {
            setRewardType("");
            setSort("desc");
            setPage(1);
          }}
        >
          Reset Filters
        </Button>
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loading size="sm" className="text-brand-500" />
            Refreshing…
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loading size="lg" className="border-[#50FF56]" />
            </div>
          ) : rewards.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No platform reward records found.
            </div>
          ) : (
            <Table aria-label="Platform rewards table">
              <TableHeader className="border-b border-gray-100 bg-[#FAFAFA] dark:border-gray-800 dark:bg-[#18181887]">
                <TableRow>
                  {TABLE_HEADERS.map((header, i) => (
                    <TableCell
                      key={header}
                      isHeader
                      className={`px-3 py-3 text-start text-base font-medium text-[#201D1D99] dark:text-white whitespace-nowrap ${
                        i === 0 ? "pl-6" : ""
                      } ${i === TABLE_HEADERS.length - 1 ? "pr-6" : ""}`}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rewards.map((row) => (
                  <TableRow key={row.id}>
                    {/* NFT */}
                    <TableCell className="pl-6 pr-3 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {row.nftName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          #{row.nftTokenId}
                        </span>
                      </div>
                    </TableCell>
                    {/* Reward Type */}
                    <TableCell className="px-3 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-full bg-[#50FF56]/10 px-2.5 py-0.5 text-xs font-medium text-[#50FF56]">
                        {formatRewardType(row.rewardType)}
                      </span>
                    </TableCell>
                    {/* Reward Amount */}
                    <TableCell className="px-3 py-3 whitespace-nowrap">
                      <span className="text-sm font-semibold text-[#50FF56]">
                        {formatAmount(row.rewardAmount)} {row.paymentTokenSymbol}
                      </span>
                    </TableCell>
                    {/* Source Amount */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.sourceAmount)} {row.paymentTokenSymbol}
                    </TableCell>
                    {/* Platform Pool */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.platformPoolAmount)} {row.paymentTokenSymbol}
                    </TableCell>
                    {/* Referral Pool */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.referralPoolAmount)} {row.paymentTokenSymbol}
                    </TableCell>
                    {/* Reward Pool */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.rewardPoolAmount)} {row.paymentTokenSymbol}
                    </TableCell>
                    {/* Token */}
                    <TableCell className="px-3 py-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {row.paymentTokenSymbol}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {truncateAddress(row.paymentTokenAddress)}
                        </span>
                      </div>
                    </TableCell>
                    {/* Chain */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {row.chainId}
                    </TableCell>
                    {/* Tx Hash */}
                    <TableCell className="px-3 py-3 whitespace-nowrap">
                      {row.nftProcessedTx ? (
                        <TxLink hash={row.nftProcessedTx} chainId={row.chainId} />
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </TableCell>
                    {/* Rewarded At */}
                    <TableCell className="px-3 py-3 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {dayjs(row.rewardAt).format("MMM D, YYYY HH:mm")}
                    </TableCell>
                    {/* Undistributed Referral */}
                    <TableCell className="pr-6 pl-3 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                      {formatAmount(row.metadata.undistributedReferralAmount)}{" "}
                      {row.paymentTokenSymbol}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalItems > 0 && (
          <div className="mt-4 flex flex-col items-center justify-between gap-3 px-6 sm:flex-row">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {rangeStart}–{rangeEnd} of {totalItems} records
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
