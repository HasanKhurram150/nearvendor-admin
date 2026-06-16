import { ENDPOINTS } from "@/config/endpoints";
import { API } from "../base-api";
import {
  GetAllShopCategoriesOutputDto,
  CreateShopCategoryInputDto,
  UpdateShopCategoryInputDto,
  GetShopsByCategoryInputDto,
  GetShopsByCategoryOutputDto,
  AssignItemCategoriesInputDto,
} from "./shop-categories-types";

export const shopCategoriesAPI = {
  getAllShopCategories: async () => {
    return API.get<GetAllShopCategoriesOutputDto>(ENDPOINTS.shopCategories);
  },

  createShopCategory: async (input: CreateShopCategoryInputDto) => {
    return API.post<any>(ENDPOINTS.shopCategories, input);
  },

  updateShopCategory: async (id: string, input: UpdateShopCategoryInputDto) => {
    return API.patch<any>(`${ENDPOINTS.shopCategories}/${id}`, input);
  },

  deleteShopCategory: async (id: string) => {
    return API.delete<any>(`${ENDPOINTS.shopCategories}/${id}`);
  },

  getShopsByCategory: async (
    id: string,
    input?: GetShopsByCategoryInputDto
  ) => {
    return API.get<GetShopsByCategoryOutputDto>(
      `${ENDPOINTS.shopCategories}/${id}/shops`,
      input
    );
  },

  assignItemCategories: async (
    id: string,
    input: AssignItemCategoriesInputDto
  ) => {
    return API.put<any>(`${ENDPOINTS.shopCategories}/${id}/item-categories`, input);
  },

  removeItemCategory: async (id: string, categoryId: string) => {
    return API.delete<any>(
      `${ENDPOINTS.shopCategories}/${id}/item-categories/${categoryId}`
    );
  },
};
