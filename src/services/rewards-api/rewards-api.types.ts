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
