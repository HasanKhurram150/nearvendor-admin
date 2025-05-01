// campaign-api.types.ts

export interface ICampaignQueryParams {
  search?: string;
  sortBy?: string;
  sort?: string;
  limit?: number | null;
  page?: number;
}

export interface ICampaignMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number | null;
  totalPages: number | null;
  totalItems: number;
}

export interface ICampaign {
  createdAt: string;
  updatedAt: string;
  id: string;
  uniqueId: string;
  name: string;
  campaignType: string;
  status: number;
  agencyId: string;
  channelId: any;
  agencyFee: number;
  budgetTotal: string;
  coinBudgetTotal: string;
  budgetRemaining: string;
  settlement: string;
  budgetEvent: string;
  remainingBudgetEvent: string;
  remainingBudgetChannel: string;
  remainingBudgetInventory: string;
  budgetInventory: string;
  budgetChannel: string;
  startDate: string;
  endDate: string;
  trackerUseYn: string;
  trackerEventYn: string;
  trackerChannelYn: string;
  trackerInventoryYn: string;
  document: string;
}

export interface ICampaignResponse {
  meta: ICampaignMeta;
  data: ICampaign[];
}

export interface IAddCampaignPayload {
  advertiserId: string;
  name: string;
  startDate: string;
  endDate: string;
}
