"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useReconnect,
  useSwitchChain,
} from "wagmi";
import { targetChain, wagmiConfig } from "@/config/wagmi";

interface WalletContextValue {
  account: string | null;
  chainId: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isCorrectNetwork: boolean;
  error: string | null;
  targetChainId: string;
  targetChainName: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<void>;
  clearError: () => void;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

const TARGET_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? "11155111";
const TARGET_CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME ?? "Sepolia Testnet";
const toHexChainId = (value: number) => `0x${value.toString(16)}`;

const queryClient = new QueryClient();

function WalletContextBridge({ children }: { children: React.ReactNode }) {
  const { address, isConnected, isConnecting } = useAccount();
  const numericChainId = useChainId();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const { reconnect } = useReconnect();
  const [error, setError] = useState<string | null>(null);

  const chainId = useMemo(
    () => (numericChainId ? toHexChainId(numericChainId) : null),
    [numericChainId],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const switchNetwork = useCallback(async () => {
    if (typeof window === "undefined" || !(window as Window & { ethereum?: unknown }).ethereum) {
      setError("No Ethereum wallet detected. Install MetaMask or a compatible wallet.");
      return;
    }

    clearError();

    try {
      await switchChainAsync({ chainId: targetChain.id });
    } catch (switchError) {
      const errorWithCode = switchError as { code?: number; message?: string };

      if (errorWithCode.code !== 4001) {
        setError(errorWithCode.message ?? "Failed to switch wallet network.");
      }
    }
  }, [clearError, switchChainAsync]);

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !(window as Window & { ethereum?: unknown }).ethereum) {
      setError("No Ethereum wallet detected. Install MetaMask or a compatible wallet.");
      return;
    }

    clearError();

    try {
      const injectedConnector = connectors[0];

      if (!injectedConnector) {
        setError("No compatible wallet connector is configured.");
        return;
      }

      await connectAsync({ connector: injectedConnector, chainId: targetChain.id });
    } catch (connectError) {
      const errorWithMessage = connectError as { code?: number; message?: string };

      if (errorWithMessage.code !== 4001) {
        setError(errorWithMessage.message ?? "Wallet connection failed.");
      }
    }
  }, [clearError, connectAsync, connectors]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setError(null);
  }, [disconnect]);

  useEffect(() => {
    void reconnect();
  }, [reconnect]);

  const value = useMemo<WalletContextValue>(
    () => ({
      account: address ?? null,
      chainId,
      isConnected,
      isConnecting,
      isCorrectNetwork: numericChainId === targetChain.id,
      error,
      targetChainId: TARGET_CHAIN_ID,
      targetChainName: TARGET_CHAIN_NAME,
      connectWallet,
      disconnectWallet,
      switchNetwork,
      clearError,
    }),
    [
      address,
      chainId,
      clearError,
      connectWallet,
      error,
      isConnected,
      isConnecting,
      numericChainId,
      switchNetwork,
    ],
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletContextBridge>{children}</WalletContextBridge>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }

  return context;
}