// inventory-api.types.ts

export interface IInventoryQueryParams {
  sort?: string;
  sortBy?: string;
  limit?: number | null;
  page?: number;
  search?: string;
}

export interface IInventoryMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number | null;
  totalPages: number | null;
  totalItems: number;
}

export interface IInventory {
  createdAt: string;
  updatedAt: string;
  id: string;
  uniqueId: string;
  campaignId: string;
  groupId: any;
  placementId: string;
  inventoryName: string;
  inventoryDesc: string;
  status: number;
  impressionDay: string;
  targetUseYn: string;
  startDate: string;
  endDate: string;
  exposureTime: string;
  totalExposure: string;
  exposureCounter: string;
  totalClicks: string;
  budgetTotal: string;
  budgetRemaining: string;
  budgetDaylmt: string;
  bonusPercent: number;
  spendType: string;
  spendPercent: number;
  costType: string;
  unitCost: string;
  adsName: string;
  platformType: number;
  adTypeCd: number;
  landingType: number;
  landingUrl: string;
  optimizationUseYn: string;
  optimizationDay: number;
  aGrade: number;
  bGrade: number;
  cGrade: number;
  file1: string;
  file2: string;
  ratio1: number;
  ratio2: number;
  trackerUrl: string;
  startTime: string;
  endTime: string;
  defaultInventory: boolean;
  campaign: ICampaign;
  placement: IPlacement;
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
  advertiser: IAdvertiser;
}

export interface IAdvertiser {
  createdAt: string;
  updatedAt: string;
  id: string;
  uniqueId: string;
  companyName: string;
  nickName: string;
  registrationNumber: string;
  representative: string;
  departmentName: string;
  departmentIncharge: string;
  contactPersonEmail: string;
  contactPersonNumber: string;
  businessRegistrationDocument: string;
  cooperateAccountDocument: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
}

export interface IPlacement {
  createdAt: string;
  updatedAt: string;
  id: string;
  sort: number;
  status: number;
  placementName: string;
  placementType: string;
  support: string;
  mediaCd: any;
  width: number;
  height: number;
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  promotionUrl: string;
  adidMax: number;
  adidWeight: number;
  sbtMax: number;
  sbtWeight: number;
  placementCode: string;
  placementLocation: string;
  form: string;
  rollingControl: any;
  rollingCycle: any;
  adsMin: any;
  adsMax: any;
}

export interface IInventoryResponse {
  meta: IInventoryMeta;
  data: IInventory[];
}

export interface IAddInventory {
  placementId: string;
  campaignId: string;
  inventorySelection: string;
  inventoryName: string;
  inventoryDesc: string;
  startDate: string;
  endDate: string;
  impressionDay: string;
  dailyStartTime: string;
  dailyEndTime: string;
  budgetTotal: number;
  materialName: string;
  materialDetails: string;
  materialType: string;
  materialSize: string;
  landingType: string;
  landingUrl: string;
  trackingUsage: string;
  trackingUrl: string;
  creativeFile: File | null;
}
