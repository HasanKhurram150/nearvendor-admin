"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/atoms/loading/loading";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
// import {
//   useGetAdminConfigQuery,
//   useUpdateNftMasterWalletMutation,
// } from "@/services/admin-config-api";
import { ApiErrorResponse } from "@/services/auth/auth-api/auth-api.types";

const CHAIN_LABELS: Record<string, string> = {
  "1": "Ethereum (1)",
  "56": "BNB Smart Chain (56)",
  "137": "Polygon (137)",
  "8453": "Base (8453)",
  "42161": "Arbitrum One (42161)",
  "10": "Optimism (10)",
  "43114": "Avalanche (43114)",
};

function getChainLabel(chainId: string): string {
  return CHAIN_LABELS[chainId] ?? `Chain ${chainId}`;
}

interface WalletRowProps {
  chainId: string;
  currentAddress: string | null;
}

function WalletRow({ chainId, currentAddress }: WalletRowProps) {
  const [address, setAddress] = useState(currentAddress ?? "");
  const [touched, setTouched] = useState(false);
  // const [updateWallet, { isLoading }] = useUpdateNftMasterWalletMutation();
  const updateWallet = async (...args: any[]) => ({ unwrap: () => {} });
  const isLoading = false;

  const isDirty = address !== (currentAddress ?? "");
  const isValid = /^0x[0-9a-fA-F]{40}$/.test(address.trim());

  const handleSave = async () => {
    if (!isValid) return;
    try {
      const result = await updateWallet({
        chainId: Number(chainId),
        address: address.trim(),
      }).unwrap();
      toast.success(result.message ?? "Wallet updated successfully");
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      toast.error(
        apiError?.data?.message ?? "Failed to update wallet. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 py-4 border-b border-white/[0.06] last:border-0">
      <div className="flex-1 w-full">
        <Label>{getChainLabel(chainId)}</Label>
        <Input
          type="text"
          placeholder="0x..."
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setTouched(true);
          }}
          error={
            touched && address.trim() !== "" && !isValid
              ? "Invalid EVM address (must be 0x + 40 hex chars)"
              : undefined
          }
          disabled={isLoading}
        />
      </div>
      <button
        onClick={handleSave}
        disabled={isLoading || !isDirty || !isValid}
        className="flex items-center justify-center text-white btn-bg h-[3.5rem] w-[10rem] rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
      >
        {isLoading ? <Loading size="sm" /> : "Save"}
      </button>
    </div>
  );
}

export function NftWalletSettings() {
  // const { data, isLoading } = useGetAdminConfigQuery();
  const data: any = null;
  const isLoading = false;

  return (
    <div className="rounded-2xl bg-white dark:bg-white/[0.03] w-full p-6">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
        NFT Master Wallets
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Set the admin wallet address used for each chain. This wallet receives
        NFT sale proceeds.
      </p>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loading size="lg" className="border-[#FFFF00]" />
        </div>
      ) : !data ? (
        <p className="text-gray-500 py-6 text-center">
          Failed to load configuration.
        </p>
      ) : (
        <div>
          {Object.entries(data.nftMasterWallets).map(([chainId, address]) => (
            <WalletRow
              key={chainId}
              chainId={chainId}
              currentAddress={address}
            />
          ))}
          {Object.keys(data.nftMasterWallets).length === 0 && (
            <p className="text-gray-500 text-center py-6">
              No chains configured.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
