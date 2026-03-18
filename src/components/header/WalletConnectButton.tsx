"use client";

import React from "react";
import Button from "@/components/ui/button/Button";
import { useWallet } from "@/context/WalletContext";

const shortenAddress = (value: string) =>
  `${value.slice(0, 6)}...${value.slice(-4)}`;

export default function WalletConnectButton() {
  const {
    account,
    connectWallet,
    disconnectWallet,
    isConnecting,
    isCorrectNetwork,
    switchNetwork,
    targetChainName,
  } = useWallet();

  const handleClick = async () => {
    if (!account) {
      await connectWallet();
      return;
    }

    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }

    disconnectWallet();
  };

  const label = !account
    ? isConnecting
      ? "Connecting..."
      : "Connect Wallet"
    : !isCorrectNetwork
      ? `Switch to ${targetChainName}`
      : shortenAddress(account);

  return (
    <Button
      variant={account && isCorrectNetwork ? "outline" : "primary"}
      onClick={() => {
        void handleClick();
      }}
      disabled={isConnecting}
      className="min-w-[148px]"
    >
      {label}
    </Button>
  );
}