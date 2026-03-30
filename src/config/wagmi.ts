import { createConfig, http, injected } from "wagmi";
import { defineChain } from "viem";

const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "8453");
const targetChainName =
  process.env.NEXT_PUBLIC_CHAIN_NAME ?? "Base";
const targetRpcUrl =
  process.env.NEXT_PUBLIC_RPC_URL ?? "https://base-rpc.publicnode.com";
const targetBlockExplorerUrl =
  process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL ?? "https://basescan.org";

export const targetChain = defineChain({
  id: targetChainId,
  name: targetChainName,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [targetRpcUrl],
    },
    public: {
      http: [targetRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "Explorer",
      url: targetBlockExplorerUrl,
    },
  },
  testnet: false,
});

export const wagmiConfig = createConfig({
  chains: [targetChain],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  ssr: true,
  transports: {
    [targetChain.id]: http(targetRpcUrl),
  },
});
