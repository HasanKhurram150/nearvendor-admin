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
