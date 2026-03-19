import { createConfig, http, injected } from "wagmi";
import { defineChain } from "viem";

const targetChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? "11155111");
const targetChainName =
  process.env.NEXT_PUBLIC_CHAIN_NAME ?? "Sepolia Testnet";
const targetRpcUrl =
  process.env.NEXT_PUBLIC_RPC_URL ?? "https://ethereum-sepolia-rpc.publicnode.com";
const targetBlockExplorerUrl =
  process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL ?? "https://sepolia.etherscan.io";

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
  testnet: true,
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