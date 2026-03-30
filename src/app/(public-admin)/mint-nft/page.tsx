import type { Metadata } from "next";
import React from "react";
import NftMintingConsole from "@/components/nft-minting/NftMintingConsole";

export const metadata: Metadata = {
  title: "NFT Minting Console",
  description: "Public NFT minting console UI",
};

export default function MintNftPage() {
  return <NftMintingConsole />;
}
