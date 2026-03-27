export interface INftAttribute {
  trait_type: string;
  value: string;
}

export interface INftMetadata {
  usd: number;
  name: string;
  badge: string;
  image: string;
  tokenId: string;
  maxSupply: number;
  imageGatewayUrl: string;
  attributes: INftAttribute[];
  season?: string;
}

export interface INftTraitInput {
  traitType: string;
  value: string;
}

export interface INftItem {
  createdAt: string;
  updatedAt: string;
  id: string;
  tokenId: string;
  name: string;
  usdPrice: number;
  badge: string;
  maxSupply: number|null;
  imageUri: string;
  metadataUri: string;
  imageGatewayUrl: string;
  metadataGatewayUrl: string | null;
  chainId: number;
  ownerWalletAddress: string | null;
  status: string;
  txHash: string | null;
  blockNumber: number | null;
  description?: string | null;
  externalUrl?: string | null;
  quantity?: number | null;
  metadata: INftMetadata;
}

export interface INftListMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IGetNftsQueryParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: "asc" | "desc";
  search?: string;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  ownerWalletAddress?: string;
  status?: string;
}

export interface IGetNftsResponse {
  meta: INftListMeta;
  data: INftItem[];
}

export interface IUpdateNftPayload {
  tokenId: string;
  name: string;
  description?: string;
  usdPrice: number;
  ownerWalletAddress?: string;
  maxSupply: number;
  metadata?: Record<string, unknown>;
  imageUri?: string;
  metadataUri?: string;
  externalUrl?: string;
  quantity?: number;
  status?: string;
  traits?: INftTraitInput[];
}

export interface IMintNftInput {
  id: string;
  name: string;
  imageFile: string;
  maxSupply: number | string;
  usd: number | string;
  badge: string;
  description?: string;
}

export interface IMintNftsPayload {
  chainId: number;
  nfts: IMintNftInput[];
  images: File[];
}

export interface IMintNftsResponse {
  message?: string;
  data?: INftItem[];
}