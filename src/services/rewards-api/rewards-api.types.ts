export interface IRewardConfigsParams {
  rewardType?: string;
  isActive?: boolean;
}

export interface ICreateRewardLevelPayload {
  level: number;
  percentageBps: number;
}

export interface ICreateRewardConfigPayload {
  rewardType: string;
  purchaseFeeBps: number;
  platformShareBps: number;
  referralShareBps: number;
  defaultLevelPercentageBps: number;
  isActive: boolean;
  levels: ICreateRewardLevelPayload[];
}

export interface IUpdateRewardConfigPayload extends ICreateRewardConfigPayload {
  id: string;
}

export interface IUpdateRewardConfigStatusPayload {
  id: string;
  isActive: boolean;
}

export interface IRewardLevel {
  id: string;
  level: number;
  percentageBps: number;
  createdAt: string;
  updatedAt: string;
}

export interface IRewardConfig {
  id: string;
  rewardType: string;
  purchaseFeeBps: number;
  platformShareBps: number;
  referralShareBps: number;
  defaultLevelPercentageBps: number;
  isActive: boolean;
  levels: IRewardLevel[];
  createdAt: string;
  updatedAt: string;
}

export interface IRewardConfigsResponse {
  statusCode: number;
  message: string;
  data: IRewardConfig[];
}

export interface IPlatformRewardsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: "asc" | "desc";
  rewardType?: string;
}

export interface IAdminRewardsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: "asc" | "desc";
}

export interface IAdminRewardSettlementsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: "asc" | "desc";
}

export interface IAdminRewardMetadata {
  effectivePercentageBps?: number;
  configuredLevelPercentageBps?: number;
  platformPoolBaseAmount?: string;
  undistributedReferralAmount?: string;
}

export interface IAdminReward {
  id: string;
  createdAt: string;
  rewardType: string;
  beneficiaryType: string;
  beneficiaryKey: string;
  level: number | null;
  rewardAmount: string;
  sourceAmount: string;
  rewardPoolAmount: string;
  referralPoolAmount: string;
  platformPoolAmount: string;
  paymentTokenAddress: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  settlementAt: string | null;
  settlementTx: string | null;
  isSettled: boolean;
  chainId: number;
  nftOrderId: string;
  purchaserUserId: string | null;
  beneficiaryUserId: string | null;
  purchaserWalletAddress: string | null;
  beneficiaryWalletAddress: string | null;
  nftProcessedTx: string | null;
  rewardAt: string;
  nftId: string;
  nftName: string;
  nftImageUri: string;
  nftTokenId: string;
  metadata: IAdminRewardMetadata;
}

export interface IPlatformRewardMetadata {
  platformPoolBaseAmount: string;
  undistributedReferralAmount: string;
}

export interface IPlatformReward {
  id: string;
  createdAt: string;
  rewardType: string;
  rewardAmount: string;
  sourceAmount: string;
  rewardPoolAmount: string;
  referralPoolAmount: string;
  platformPoolAmount: string;
  paymentTokenAddress: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  chainId: number;
  nftOrderId: string;
  purchaserUserId: string;
  purchaserWalletAddress: string | null;
  nftProcessedTx: string;
  rewardAt: string;
  nftId: string;
  nftName: string;
  nftTokenId: string;
  metadata: IPlatformRewardMetadata;
}

export interface IPlatformRewardsMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IPlatformRewardsResponse {
  meta: IPlatformRewardsMeta;
  data: IPlatformReward[];
}

export interface IAdminRewardsResponse {
  meta: IPlatformRewardsMeta;
  data: IAdminReward[];
}

export interface IAdminRewardsSummary {
  totalRewardCount: number;
  totalRewardAmount: string;
  totalUserRewardCount: number;
  totalUserRewardAmount: string;
  totalPlatformRewardCount: number;
  totalPlatformRewardAmount: string;
  totalUnsettledRewardCount: number;
  totalUnsettledRewardAmount: string;
  unsettledUserRewardCount: number;
  unsettledUserRewardAmount: string;
  unsettledPlatformRewardCount: number;
  unsettledPlatformRewardAmount: string;
  totalSettledRewardCount: number;
  totalSettledRewardAmount: string;
  settledUserRewardCount: number;
  settledUserRewardAmount: string;
  settledPlatformRewardCount: number;
  settledPlatformRewardAmount: string;
  uniquePurchasers: number;
  uniqueBeneficiaries: number;
  uniqueRewardOrders: number;
  uniqueNfts: number;
  averageRewardAmount: string;
  latestRewardAt: string | null;
  latestSettlementAt: string | null;
}

export interface ICreateAdminRewardSettlementPayload {
  chainId: number;
  paymentTokenAddress: string;
  platformAddress: string;
}

export interface IAdminRewardSettlementContractCall {
  settlementId: string;
  distributorAddress: string;
  paymentToken: string;
  platform: string;
  recipients: string[];
  amounts: string[];
  totalAmount: string;
  calldata: string;
  value: string;
}

export interface IAdminRewardUserDistribution {
  amount: string;
  amountRaw: string;
  recipient: string;
  rewardIds: string[];
  beneficiaryUserId: string | null;
}

export interface IAdminRewardSettlementChain {
  id: string;
}

export interface IAdminRewardSettlementContractArguments {
  paymentToken: string;
  platform: string;
  recipients: string[];
  amounts: string[];
  totalAmount: string;
}

export interface IAdminRewardSettlement {
  batchGroupId: string;
  batchIndex: number;
  status: string;
  chainId: number;
  distributorAddress: string;
  paymentTokenAddress: string;
  paymentTokenSymbol: string;
  paymentTokenDecimals: number;
  platformAddress: string;
  recipientCount: number;
  rewardCount: number;
  userAmount: string;
  platformAmount: string;
  totalAmount: string;
  userAmountRaw: string;
  platformAmountRaw: string;
  totalAmountRaw: string;
  rewardIds: string[];
  userRewardIds: string[];
  platformRewardIds: string[];
  userDistributions: IAdminRewardUserDistribution[];
  contractArguments: IAdminRewardSettlementContractArguments;
  calldata: string;
  chain: IAdminRewardSettlementChain;
  distributionId: string | null;
  txHash: string | null;
  blockNumber: string | null;
  lastError: string | null;
  submittedAt: string | null;
  lastCheckedAt: string | null;
  processedAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  attemptCount: number;
}

export interface ICreateAdminRewardSettlementResponse {
  batchGroupId: string;
  contractCalls: IAdminRewardSettlementContractCall[];
  distributorAddress: string;
  maxRecipientsPerBatch: number;
  settlements: IAdminRewardSettlement[];
  totalSettlements: number;
  totalRewardCount: number;
  totalUserAmount: string;
  totalPlatformAmount: string;
  totalAmount: string;
}

export interface IAdminRewardSettlementsResponse {
  meta: IPlatformRewardsMeta;
  data: IAdminRewardSettlement[];
}
