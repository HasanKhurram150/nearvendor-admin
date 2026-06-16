export interface ItemCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  iconUrl: string | null;
  parentId: string | null;
  parent: any | null;
}

export interface GetAllItemCategoriesOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: ItemCategory[];
}

export interface CreateItemCategoryInputDto {
  categoryName: string;
  iconUrl?: string;
  parentId?: string | null;
}

export interface UpdateItemCategoryInputDto {
  categoryName?: string;
  iconUrl?: string;
  parentId?: string | null;
}
