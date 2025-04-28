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

export interface IInventoryItem {
  id: string;
  // Add other inventory properties based on your actual data structure
}

export interface IInventoryResponse {
  meta: IInventoryMeta;
  data: IInventoryItem[];
}
