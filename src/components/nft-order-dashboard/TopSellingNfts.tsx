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
    <div className="dashboard-card p-5 md:p-6">
      <h3 className="text-lg font-semibold text-white mb-5">{t("topSellingNfts")}</h3>

      {!nfts || nfts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">{t("noDataAvailable")}</p>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[700px]">
            <thead className="bg-white/[0.02] border-b border-[#1D1C1C]">
              <tr>
                <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                <th className="py-3 px-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("lastSold")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D1C1C]">
              {nfts.map((nft) => (
                <tr
                  key={nft.nftId}
                  className=""
                >
                  <td className="py-3.5 text-white font-medium">{nft.nftName}</td>
                  <td className="py-3.5 text-gray-400">#{nft.nftTokenId}</td>
                  <td className="py-3.5 text-right text-gray-300">{nft.completedOrders}</td>
                  <td className="py-3.5 text-right text-gray-300">{nft.quantitySold}</td>
                  <td className="py-3.5 text-right text-[#32AA00] font-medium">
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
