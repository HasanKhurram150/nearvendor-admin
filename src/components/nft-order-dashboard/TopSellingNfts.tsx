"use client";
import React from "react";
import { ITopSellingNft } from "@/services/nft-order-stats-api/nft-order-stats-api.types";
import { useLanguage } from "@/components/common/LanguageContext";

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TopSellingNfts({ nfts }: { nfts: ITopSellingNft[] | undefined }) {
  const { t } = useLanguage();

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 md:p-6">
      <h3 className="text-lg font-semibold text-white mb-5">{t("topSellingNfts")}</h3>

      {!nfts || nfts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t("noDataAvailable")}</p>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("nftName")}
                </th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("tokenId")}
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("orders")}
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("qtySold")}
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("totalSold")}
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("uniqueBuyers")}
                </th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("lastSold")}
                </th>
              </tr>
            </thead>
            <tbody>
              {nfts.map((nft) => (
                <tr
                  key={nft.nftId}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="py-3.5 text-white font-medium">{nft.nftName}</td>
                  <td className="py-3.5 text-gray-400">#{nft.nftTokenId}</td>
                  <td className="py-3.5 text-right text-gray-300">{nft.completedOrders}</td>
                  <td className="py-3.5 text-right text-gray-300">{nft.quantitySold}</td>
                  <td className="py-3.5 text-right text-[#50FF56] font-medium">
                    {formatAmount(nft.totalAmountSold)}
                  </td>
                  <td className="py-3.5 text-right text-gray-300">{nft.uniqueBuyers}</td>
                  <td className="py-3.5 text-right text-gray-400 text-sm">
                    {formatDate(nft.lastSoldAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
