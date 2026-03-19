"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Loading from "@/components/atoms/loading/loading";
import GenericSearchField from "@/components/atoms/generic-search-field/generic-search-field";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import NftDetailModal from "./NftDetailModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetNftsQuery } from "@/services/nft-api";
import { useDebounce } from "@/hooks/useDebounce";

const DEFAULT_PAGE_SIZE = 10;
const DEBOUNCE_DELAY = 400;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

export default function NftsListing() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [minUsdPrice, setMinUsdPrice] = useState("");
  const [maxUsdPrice, setMaxUsdPrice] = useState("");
  const [ownerWalletAddress, setOwnerWalletAddress] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedNftId, setSelectedNftId] = useState<string | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery.trim(), DEBOUNCE_DELAY);
  const debouncedOwnerWalletAddress = useDebounce(
    ownerWalletAddress.trim(),
    DEBOUNCE_DELAY,
  );

  const parsedMinUsdPrice =
    minUsdPrice.trim() === "" ? undefined : Number(minUsdPrice);
  const parsedMaxUsdPrice =
    maxUsdPrice.trim() === "" ? undefined : Number(maxUsdPrice);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchQuery, minUsdPrice, maxUsdPrice, debouncedOwnerWalletAddress, status]);

  const { data, isLoading, isFetching } = useGetNftsQuery({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: "createdAt",
    sort: "desc",
    search: debouncedSearchQuery || undefined,
    minUsdPrice:
      typeof parsedMinUsdPrice === "number" && !Number.isNaN(parsedMinUsdPrice)
        ? parsedMinUsdPrice
        : undefined,
    maxUsdPrice:
      typeof parsedMaxUsdPrice === "number" && !Number.isNaN(parsedMaxUsdPrice)
        ? parsedMaxUsdPrice
        : undefined,
    ownerWalletAddress: debouncedOwnerWalletAddress || undefined,
    status: status === "all" ? undefined : status,
  });

  const nfts = data?.data ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 1;
  const currentPage = meta?.currentPage ?? page;
  const totalItems = meta?.totalItems ?? 0;
  const itemsPerPage = meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE;
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + nfts.length - 1;

  const clearFilters = () => {
    setSearchQuery("");
    setMinUsdPrice("");
    setMaxUsdPrice("");
    setOwnerWalletAddress("");
    setStatus("all");
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageBreadcrumb
        pageTitle="NFT Listing"
        info="Protected inventory view for uploaded NFT metadata and asset records."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total NFTs</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.totalItems ?? 0}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Current Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.currentPage ?? 1}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Items Per Page</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {meta?.itemsPerPage ?? DEFAULT_PAGE_SIZE}
          </p>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:grid-cols-2 xl:grid-cols-5">
        <GenericSearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name, token ID, badge, or status"
        />
        <Input
          type="number"
          placeholder="Min USD price"
          value={minUsdPrice}
          onChange={(event) => setMinUsdPrice(event.target.value)}
        />
        <Input
          type="number"
          placeholder="Max USD price"
          value={maxUsdPrice}
          onChange={(event) => setMaxUsdPrice(event.target.value)}
        />
        <Input
          placeholder="Owner wallet address"
          value={ownerWalletAddress}
          onChange={(event) => setOwnerWalletAddress(event.target.value)}
        />
        <Select
          options={[
            { value: "all", label: "All statuses" },
            { value: "uploaded", label: "Uploaded" },
            { value: "minted", label: "Minted" },
            { value: "failed", label: "Failed" },
          ]}
          defaultValue="all"
          onChange={setStatus}
        />
        <div className="lg:col-span-2 xl:col-span-5 flex flex-wrap items-center gap-4">
          <Button variant="outline" onClick={clearFilters}>
            Reset Filters
          </Button>
          {(debouncedSearchQuery ||
            minUsdPrice ||
            maxUsdPrice ||
            debouncedOwnerWalletAddress ||
            status !== "all") && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Server-side filters are active.
            </span>
          )}
        </div>
        {isFetching && !isLoading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Loading size="sm" className="text-brand-500" />
            Refreshing list...
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pb-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table aria-label="NFT listing table">
            <TableHeader className="border-b border-gray-100 bg-[#FAFAFA] dark:border-gray-800 dark:bg-[#18181887]">
              <TableRow>
                {[
                  "Preview",
                  "Token ID",
                  "Name",
                  "Price",
                  "Badge",
                  "Supply",
                  "Status",
                  "Chain",
                  "Created",
                  "Links",
                ].map((header, index) => (
                  <TableCell
                    key={header}
                    isHeader
                    className={`px-3 py-3 text-start text-base font-medium text-[#201D1D99] dark:text-white ${
                      index === 0 ? "pl-6" : ""
                    } ${index === 9 ? "pr-6" : ""}`}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center">
                    <div className="flex justify-center">
                      <Loading size="lg" className="border-[#50FF56]" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : nfts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="py-10 text-center text-lg text-gray-500 dark:text-gray-400">
                    {debouncedSearchQuery ||
                    minUsdPrice ||
                    maxUsdPrice ||
                    debouncedOwnerWalletAddress ||
                    status !== "all"
                      ? "No NFTs match the current filters"
                      : "No NFTs available"}
                  </TableCell>
                </TableRow>
              ) : (
                nfts.map((nft) => (
                  <TableRow key={nft.id}>
                    <TableCell className="pl-6 pr-3 py-4 min-w-[7rem]">
                      <div className="h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
                        {nft.imageGatewayUrl ? (
                          <img
                            src={nft.imageGatewayUrl}
                            alt={nft.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[7rem] text-base text-gray-800 dark:text-white/90">
                      #{nft.tokenId}
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[14rem] text-base text-gray-800 dark:text-white/90">
                      <div>
                        <p className="font-medium">{nft.name}</p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {nft.id}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[8rem] text-base text-gray-800 dark:text-white/90">
                      ${currencyFormatter.format(nft.usdPrice)}
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[10rem]">
                      <Badge color="warning">{nft.badge}</Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[7rem] text-base text-gray-800 dark:text-white/90">
                      {nft.maxSupply}
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[8rem]">
                      <Badge color={nft.status === "uploaded" ? "success" : "light"}>
                        {nft.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[7rem] text-base text-gray-800 dark:text-white/90">
                      {nft.chainId}
                    </TableCell>
                    <TableCell className="px-3 py-4 min-w-[10rem] text-base text-gray-800 dark:text-white/90">
                      {dayjs(nft.createdAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="px-3 py-4 pr-6 min-w-[12rem] text-sm">
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedNftId(nft.id)}
                          className="text-left text-brand-500 hover:underline"
                        >
                          View details
                        </button>
                        <a
                          href={nft.imageGatewayUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-500 hover:underline"
                        >
                          View image
                        </a>
                        {nft.metadataGatewayUrl ? (
                          <a
                            href={nft.metadataGatewayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-500 hover:underline"
                          >
                            View metadata
                          </a>
                        ) : (
                          <span className="text-gray-500 dark:text-gray-400">No metadata URL</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-100 px-6 pt-6 dark:border-gray-800 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {rangeStart}-{rangeEnd} of {totalItems} NFTs
          </p>

          {totalPages > 1 ? (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          ) : null}
        </div>
      </div>

      <NftDetailModal
        nftId={selectedNftId}
        isOpen={selectedNftId !== null}
        onClose={() => setSelectedNftId(null)}
      />
    </div>
  );
}