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
  // Define campaign properties here based on your actual data structure
  id?: string;
  name?: string;
  // Add other campaign properties
}

export interface ICampaignResponse {
  statusCode: number;
  message: string;
  data: {
    meta: ICampaignMeta;
    data: ICampaign[];
  };
}
