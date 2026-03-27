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
import Badge from "@/components/ui/badge/Badge";
import { useGetPlatformRewardsQuery } from "@/services/rewards-api";
import { useDebounce } from "@/hooks/useDebounce";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { TxLink, formatAmount, formatRewardType, truncateAddress } from "./rewards-table-utils";

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

const TABLE_HEADERS = [
  "NFT & Type",
  "Reward Details",
  "Pools Breakdown",
  "Network",
  "Tx & Time",
  "Referral Info",
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
        <div className="dashboard-card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.totalItems ?? 0}
          </p>
        </div>
        <div className="dashboard-card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.currentPage ?? 1} / {meta?.totalPages ?? 1}
          </p>
        </div>
        <div className="dashboard-card p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">Items Per Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 dashboard-card p-5">
        <Input
          placeholder="Filter by reward type (e.g. nft_purchase)"
          value={rewardType}
          onChange={(e) => setRewardType(e.target.value)}
        />
        <Select
          options={[
            { value: "desc", label: "Newest First" },
            { value: "asc", label: "Oldest First" },
          ]}
          defaultValue={sort}
          onChange={(value) => setSort(value as "asc" | "desc")}
          className="w-[180px]"
        />
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
      <div className="overflow-hidden dashboard-card pb-6">
        <div className="max-w-full overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loading size="lg" className="border-[#32AA00]" />
            </div>
          ) : rewards.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              No platform reward records found.
            </div>
          ) : (
            <Table aria-label="Platform rewards table">
              <TableHeader className="border-b border-[#1D1C1C] bg-white/[0.02]">
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
              <TableBody className="divide-y divide-[#1D1C1C]">
                {rewards.map((row) => (
                  <TableRow key={row.id}>
                    {/* NFT & Type */}
                    <TableCell className="pl-6 pr-3 py-4 min-w-[14rem]">
                      <div className="flex flex-col gap-1.5 text-left">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white/90 truncate max-w-[10rem]">
                            {row.nftName}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            #{row.nftTokenId}
                          </span>
                        </div>
                        <Badge variant="light" color="primary" size="sm" className="w-fit">
                          {formatRewardType(row.rewardType)}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Reward Details */}
                    <TableCell className="px-3 py-4 min-w-[12rem]">
                      <div className="flex flex-col gap-1 text-left">
                        <div className="text-sm font-bold text-[#32AA00]">
                          Rew: {formatAmount(row.rewardAmount)} {row.paymentTokenSymbol}
                        </div>
                        <div className="text-xs text-gray-500">
                          Src: {formatAmount(row.sourceAmount)} {row.paymentTokenSymbol}
                        </div>
                      </div>
                    </TableCell>

                    {/* Pools Breakdown */}
                    <TableCell className="px-3 py-4 min-w-[15rem]">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-left">
                        <div className="flex justify-between gap-2 border-b border-white/5 pb-0.5">
                          <span className="text-gray-500">Platform:</span>
                          <span className="text-gray-300 font-medium">{formatAmount(row.platformPoolAmount)}</span>
                        </div>
                        <div className="flex justify-between gap-2 border-b border-white/5 pb-0.5">
                          <span className="text-gray-500">Referral:</span>
                          <span className="text-gray-300 font-medium">{formatAmount(row.referralPoolAmount)}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-500">Reward Pool:</span>
                          <span className="text-gray-300 font-medium">{formatAmount(row.rewardPoolAmount)}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Network */}
                    <TableCell className="px-3 py-4 min-w-[10rem]">
                      <div className="flex flex-col gap-1 text-left">
                        <div className="text-sm font-medium text-white/90">
                          {row.paymentTokenSymbol}
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          {truncateAddress(row.paymentTokenAddress)}
                        </div>
                        <div className="text-[10px] text-gray-400">
                           Chain {row.chainId}
                        </div>
                      </div>
                    </TableCell>

                    {/* Tx & Time */}
                    <TableCell className="px-3 py-4 min-w-[12rem]">
                      <div className="flex flex-col gap-1.5 text-left">
                        {row.nftProcessedTx ? (
                          <TxLink hash={row.nftProcessedTx} chainId={row.chainId} />
                        ) : (
                          <span className="text-gray-500">—</span>
                        )}
                        <div className="text-[10px] text-gray-500">
                          {dayjs(row.rewardAt).format("DD MMM, HH:mm")}
                        </div>
                      </div>
                    </TableCell>

                    {/* Referral Info */}
                    <TableCell className="pr-6 pl-3 py-4 min-w-[10rem]">
                      <div className="flex flex-col text-left">
                        <span className="text-xs text-gray-500 opacity-70">Undistributed:</span>
                        <span className="text-sm font-medium text-amber-500/80">
                          {formatAmount(row.metadata.undistributedReferralAmount)} {row.paymentTokenSymbol}
                        </span>
                      </div>
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
