export type TimeSpan = "all" | "daily" | "weekly" | "monthly" | "lastQuarter" | "yearly";

export interface ITopSellingNft {
  nftId: string;
  nftTokenId: string;
  nftName: string;
  chainId: number;
  completedOrders: number;
  quantitySold: number;
  totalAmountSold: string;
  uniqueBuyers: number;
  averageSaleAmount: string;
  lastSoldAt: string;
}

export interface ISalesByChain {
  key: string;
  label: string;
  completedOrders: number;
  quantitySold: number;
  totalAmountSold: string;
}

export interface ISalesByPaymentToken {
  key: string;
  label: string;
  completedOrders: number;
  quantitySold: number;
  totalAmountSold: string;
}

export interface INftOrderStats {
  timeSpan: string;
  totalOrders: number;
  awaitingPaymentOrders: number;
  partiallyPaidOrders: number;
  paymentReceivedOrders: number;
  processingOrders: number;
  completedOrders: number;
  expiredOrders: number;
  totalAmountSold: string;
  totalQuantitySold: number;
  uniqueBuyers: number;
  uniqueNftsSold: number;
  averageSaleAmount: string;
  averageItemsPerSale: string;
  pendingRevenue: string;
  expiredOrderValue: string;
  completionRate: string;
  latestSaleAt: string;
  topSellingNfts: ITopSellingNft[];
  salesByChain: ISalesByChain[];
  salesByPaymentToken: ISalesByPaymentToken[];
}

// Sales data: array of [timestamp, amount] tuples
export type INftOrderSalesData = [number, number][];

// ── Orders list ────────────────────────────────────────────────

export enum NFTOrderStatus {
  AWAITING_PAYMENT = 'awaiting_payment',
  PARTIALLY_PAID = 'partially_paid',
  PAYMENT_RECEIVED = 'payment_received',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
}

export interface INftOrder {
  createdAt: string;
  updatedAt: string;
  id: string;
  userId: string;
  nftId: string;
  paymentTokenId: string;
  nftTokenId: string;
  nftName: string;
  nftDescription: string | null;
  nftBadge: string;
  nftMaxSupply: number;
  nftImageUri: string;
  nftMetadataUri: string;
  nftImageGatewayUrl: string;
  nftMetadataGatewayUrl: string | null;
  nftUsdPrice: number;
  userWalletAddress: string | null;
  chainId: number;
  salt: string;
  depositAddress: string;
  paymentTokenAddress: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  unitPrice: string;
  totalPrice: string;
  totalPriceRaw: string;
  depositAmount: string;
  depositAmountRaw: string;
  quantity: number;
  depositTx: string | null;
  deploymentTx: string | null;
  processedTx: string | null;
  expiresAt: string;
  depositAt: string | null;
  processedAt: string | null;
  status: NFTOrderStatus;
  lastError: string | null;
  depositTransactions: unknown[];
}

export interface INftOrdersMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface INftOrdersResponse {
  meta: INftOrdersMeta;
  data: INftOrder[];
}

export interface INftOrdersQueryParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sort?: "asc" | "desc";
  status?: NFTOrderStatus | "all";
  search?: string;
  nftId?: string;
  tokenId?: string;
  minUsdPrice?: number;
  maxUsdPrice?: number;
  chainId?: number;
}
