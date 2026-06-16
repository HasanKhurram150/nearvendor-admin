export interface ShopCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  iconUrl: string | null;
  parentId: string | null;
  itemCategories: any[];
  parent: any | null;
  shopCount: number;
}

export interface GetAllShopCategoriesOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: ShopCategory[];
}

export interface CreateShopCategoryInputDto {
  name: string;
  iconUrl?: string;
  parentId?: string | null;
}

export interface UpdateShopCategoryInputDto {
  name?: string;
  iconUrl?: string;
  parentId?: string | null;
}

export interface Shop {
  id: string;
  createdAt: string;
  updatedAt: string;
  shopName: string;
  shopImageUrl: string;
  whatsappNumber: string;
  shopAddress: string;
  isActive: boolean;
  shopLongitude: string;
  shopLatitude: string;
  location: any;
  shopLogoUrl: string;
  timezone: string;
  currency: string;
  categoryId: string;
  registrationNumber: string | null;
  shopContactPhone: string;
  storeEmail: string | null;
  openingHours: any;
  lastInventoryUpdate: string | null;
  subscriptionAmount: string | null;
  vendorProfile: any;
}

export interface GetShopsByCategoryInputDto {
  page?: number;
  limit?: number;
}

export interface GetShopsByCategoryOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    shopCategory: Partial<ShopCategory>;
    shops: Shop[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface AssignItemCategoriesInputDto {
  categoryIds: string[];
}
