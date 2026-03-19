"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Loading from "@/components/atoms/loading/loading";
import GenericSearchField from "@/components/atoms/generic-search-field/generic-search-field";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import Select from "@/components/form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetNftOrdersQuery } from "@/services/nft-order-stats-api";
import { NFTOrderStatus } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import { useDebounce } from "@/hooks/useDebounce";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

type BadgeColor = "primary" | "success" | "error" | "warning" | "info" | "light" | "dark";

const STATUS_BADGE: Record<NFTOrderStatus, BadgeColor> = {
  [NFTOrderStatus.COMPLETED]: "success",
  [NFTOrderStatus.EXPIRED]: "error",
  [NFTOrderStatus.PROCESSING]: "info",
  [NFTOrderStatus.PAYMENT_RECEIVED]: "primary",
  [NFTOrderStatus.PARTIALLY_PAID]: "warning",
  [NFTOrderStatus.AWAITING_PAYMENT]: "light",
};

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

function truncateAddress(addr: string): string {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

const EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io/tx",
  8453: "https://basescan.org/tx",
  137: "https://polygonscan.com/tx",
  56: "https://bscscan.com/tx",
  42161: "https://arbiscan.io/tx",
  10: "https://optimistic.etherscan.io/tx",
  43114: "https://snowscan.xyz/tx",
};

function explorerTxUrl(chainId: number, hash: string): string {
  const base = EXPLORERS[chainId] ?? `https://eth.blockscout.com/tx`;
  return `${base}/${hash}`;
}

function TxLink({ label, hash, chainId }: { label: string; hash: string; chainId: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(hash).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="flex items-center gap-1.5">
      <a
        href={explorerTxUrl(chainId, hash)}
        target="_blank"
        rel="noopener noreferrer"
        title={hash}
        className="text-brand-500 hover:underline"
      >
        {label}: {truncateAddress(hash)}
      </a>
      <button
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy hash"}
        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#50FF56]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function NftOrdersListing() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<NFTOrderStatus | "all">("all");
  const [nftId, setNftId] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [minUsdPrice, setMinUsdPrice] = useState("");
  const [maxUsdPrice, setMaxUsdPrice] = useState("");
  const [chainId, setChainId] = useState("");

  const debouncedSearch = useDebounce(searchQuery.trim(), DEBOUNCE_DELAY);
  const debouncedNftId = useDebounce(nftId.trim(), DEBOUNCE_DELAY);
  const debouncedTokenId = useDebounce(tokenId.trim(), DEBOUNCE_DELAY);
  const debouncedChainId = useDebounce(chainId.trim(), DEBOUNCE_DELAY);

  const parsedMin = minUsdPrice.trim() === "" ? undefined : Number(minUsdPrice);
  const parsedMax = maxUsdPrice.trim() === "" ? undefined : Number(maxUsdPrice);
  const parsedChainId = debouncedChainId === "" ? undefined : Number(debouncedChainId);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, debouncedNftId, debouncedTokenId, minUsdPrice, maxUsdPrice, debouncedChainId, status]);

  const { data, isLoading, isFetching } = useGetNftOrdersQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort: "desc",
    status,
    search: debouncedSearch || undefined,
    nftId: debouncedNftId || undefined,
    tokenId: debouncedTokenId || undefined,
    minUsdPrice: typeof parsedMin === "number" && !Number.isNaN(parsedMin) ? parsedMin : undefined,
    maxUsdPrice: typeof parsedMax === "number" && !Number.isNaN(parsedMax) ? parsedMax : undefined,
    chainId: typeof parsedChainId === "number" && !Number.isNaN(parsedChainId) ? parsedChainId : undefined,
  });

  const orders = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.totalItems ?? 0;
  const currentPage = meta?.currentPage ?? page;
  const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + orders.length - 1;

  const hasFilters =
    debouncedSearch ||
    debouncedNftId ||
    debouncedTokenId ||
    minUsdPrice ||
    maxUsdPrice ||
    debouncedChainId ||
    status !== "all";

  return (
    <div className="flex flex-col gap-8">
      <PageBreadcrumb
        pageTitle="NFT Orders"
        info="Browse and manage all NFT purchase orders."
      />

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
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
      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:grid-cols-2 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-4">
          <GenericSearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by NFT name, token ID, deposit address…"
          />
        </div>
        <Input
          placeholder="NFT ID"
          value={nftId}
          onChange={(e) => setNftId(e.target.value)}
        />
        <Input
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Min USD price"
          value={minUsdPrice}
          onChange={(e) => setMinUsdPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Max USD price"
          value={maxUsdPrice}
          onChange={(e) => setMaxUsdPrice(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Chain ID (e.g. 8453)"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
        />
        <Select
          options={[
            { value: "all", label: "All statuses" },
            { value: "awaiting_payment", label: "Awaiting Payment" },
            { value: "partially_paid", label: "Partially Paid" },
            { value: "payment_received", label: "Payment Received" },
            { value: "processing", label: "Processing" },
            { value: "completed", label: "Completed" },
            { value: "expired", label: "Expired" },
          ]}
          defaultValue="all"
          onChange={(val) => setStatus(val as NFTOrderStatus | "all")}
        />
        <div className="md:col-span-2 xl:col-span-4 flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setNftId("");
              setTokenId("");
              setMinUsdPrice("");
              setMaxUsdPrice("");
              setChainId("");
              setStatus("all");
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
          {hasFilters && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Filters active
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table aria-label="NFT orders table">
            <TableHeader className="border-b border-gray-100 bg-[#FAFAFA] dark:border-gray-800 dark:bg-[#18181887]">
              <TableRow>
                {[
                  "NFT",
                  "Status",
                  "Qty",
                  "Unit Price",
                  "Total Price",
                  "Deposited",
                  "Token",
                  "Chain",
                  "Deposit Address",
                  "Created",
                  "Expires",
                  "Txs",
                ].map((header, i) => (
                  <TableCell
                    key={header}
                    isHeader
                    className={`px-3 py-3 text-start text-base font-medium text-[#201D1D99] dark:text-white ${
                      i === 0 ? "pl-6" : ""
                    } ${i === 11 ? "pr-6" : ""}`}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={12} className="py-10 text-center">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#50FF56]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={12}
                    className="py-10 text-center text-lg text-gray-500 dark:text-gray-400"
                  >
                    {hasFilters ? "No orders match the current filters" : "No orders available"}
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    {/* NFT */}
                    <TableCell className="pl-6 pr-3 py-4 min-w-[14rem]">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                          <img
                            src={order.nftImageGatewayUrl}
                            alt={order.nftName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {order.nftName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            #{order.nftTokenId} · {order.nftBadge}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell className="px-3 py-4 min-w-[9rem]">
                      <Badge color={STATUS_BADGE[order.status] ?? "light"}>
                        {order.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>

                    {/* Qty */}
                    <TableCell className="px-3 py-4 min-w-[5rem] text-base text-gray-800 dark:text-white/90">
                      {order.quantity}
                    </TableCell>

                    {/* Unit price */}
                    <TableCell className="px-3 py-4 min-w-[9rem] text-base text-gray-800 dark:text-white/90">
                      {formatAmount(order.unitPrice)} {order.paymentTokenSymbol}
                    </TableCell>

                    {/* Total price */}
                    <TableCell className="px-3 py-4 min-w-[9rem] font-medium text-[#50FF56]">
                      {formatAmount(order.totalPrice)} {order.paymentTokenSymbol}
                    </TableCell>

                    {/* Deposited */}
                    <TableCell className="px-3 py-4 min-w-[9rem] text-base text-gray-800 dark:text-white/90">
                      {formatAmount(order.depositAmount)} {order.paymentTokenSymbol}
                    </TableCell>

                    {/* Token */}
                    <TableCell className="px-3 py-4 min-w-[7rem]">
                      <Badge color="info">{order.paymentTokenSymbol}</Badge>
                    </TableCell>

                    {/* Chain */}
                    <TableCell className="px-3 py-4 min-w-[6rem] text-base text-gray-800 dark:text-white/90">
                      {order.chainId}
                    </TableCell>

                    {/* Deposit Address */}
                    <TableCell className="px-3 py-4 min-w-[10rem] text-sm font-mono text-gray-600 dark:text-gray-400">
                      <span title={order.depositAddress}>
                        {truncateAddress(order.depositAddress)}
                      </span>
                    </TableCell>

                    {/* Created */}
                    <TableCell className="px-3 py-4 min-w-[10rem] text-sm text-gray-600 dark:text-gray-400">
                      {dayjs(order.createdAt).format("DD MMM YYYY HH:mm")}
                    </TableCell>

                    {/* Expires */}
                    <TableCell className="px-3 py-4 min-w-[10rem] text-sm text-gray-600 dark:text-gray-400">
                      {dayjs(order.expiresAt).format("DD MMM YYYY HH:mm")}
                    </TableCell>

                    {/* Txs */}
                    <TableCell className="px-3 py-4 pr-6 min-w-[12rem] text-xs">
                      <div className="flex flex-col gap-2">
                        {order.deploymentTx ? (
                          <TxLink label="Deploy" hash={order.deploymentTx} chainId={order.chainId} />
                        ) : null}
                        {order.processedTx ? (
                          <TxLink label="Process" hash={order.processedTx} chainId={order.chainId} />
                        ) : null}
                        {order.depositTx ? (
                          <TxLink label="Deposit" hash={order.depositTx} chainId={order.chainId} />
                        ) : null}
                        {!order.deploymentTx && !order.processedTx && !order.depositTx && (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col gap-4 border-t border-gray-100 px-6 pt-6 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {rangeStart}–{rangeEnd} of {totalItems} orders
          </p>
          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
