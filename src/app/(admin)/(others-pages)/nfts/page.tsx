import type { Metadata } from "next";
import React from "react";
import NftsListing from "@/components/nfts-listing/NftsListing";

export const metadata: Metadata = {
  title: "NFT Listing",
  description: "Protected NFT listing page",
};

export default function NftsPage() {
  return <NftsListing />;
}
