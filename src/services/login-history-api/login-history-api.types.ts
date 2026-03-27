export interface ILoginHistoryItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  loggedInAt: string;
  userId: string;
  userLabel: string;
  email: string;
  address: string;
  ip: string;
  countryCode: string;
  countryName: string;
  region: string;
  city: string;
  timezone: string;
  clientType: string;
  clientName: string;
  clientVersion: string;
  osName: string;
  osVersion: string;
  osPlatform: string;
  deviceType: string;
  deviceBrand: string;
  deviceModel: string;
  userAgent: string;
  fingerprint: string;
  locationRaw: Record<string, unknown>;
}

export interface ILoginHistoryMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IGetLoginHistoryParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sort?: "asc" | "desc";
  search?: string;
  userId?: string;
  countryCode?: string;
  ip?: string;
  clientName?: string;
  deviceType?: string;
  fromDate?: string;
  toDate?: string;
}
