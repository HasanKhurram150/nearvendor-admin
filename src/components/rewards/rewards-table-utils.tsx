"use client";

import React, { useState } from "react";

const EXPLORERS: Record<number, string> = {
  1: "https://etherscan.io/tx",
  10: "https://optimistic.etherscan.io/tx",
  56: "https://bscscan.com/tx",
  137: "https://polygonscan.com/tx",
  8453: "https://basescan.org/tx",
  42161: "https://arbiscan.io/tx",
  43114: "https://snowscan.xyz/tx",
};

export function explorerTxUrl(chainId: number, hash: string): string {
  const base = EXPLORERS[chainId] ?? "https://eth.blockscout.com/tx";
  return `${base}/${hash}`;
}

export function truncateAddress(value: string): string {
  if (!value || value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-4)}`;
}

export function formatAmount(value: string | null | undefined): string {
  const num = parseFloat(value ?? "0");
  if (isNaN(num)) return "0";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}

export function formatRewardType(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatBeneficiaryType(type: string): string {
  return formatRewardType(type);
}

export function TxLink({ hash, chainId }: { hash: string; chainId: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
        className="font-mono text-xs text-brand-500 hover:underline"
      >
        {truncateAddress(hash)}
      </a>
      <button
        onClick={handleCopy}
        title={copied ? "Copied!" : "Copy hash"}
        className="flex-shrink-0 text-gray-400 transition-colors hover:text-white"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#FFFF00]" viewBox="0 0 20 20" fill="currentColor">
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
