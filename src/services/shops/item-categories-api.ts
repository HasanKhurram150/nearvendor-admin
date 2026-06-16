import { ENDPOINTS } from "@/config/endpoints";
import { API } from "../base-api";
import {
  GetAllItemCategoriesOutputDto,
  CreateItemCategoryInputDto,
  UpdateItemCategoryInputDto,
} from "./item-categories-types";

export const itemCategoriesAPI = {
  getAllItemCategories: async () => {
    return API.get<GetAllItemCategoriesOutputDto>(ENDPOINTS.itemCategories);
  },

  createItemCategory: async (input: CreateItemCategoryInputDto) => {
    return API.post<any>(ENDPOINTS.itemCategories, input);
  },

  updateItemCategory: async (id: string, input: UpdateItemCategoryInputDto) => {
    return API.patch<any>(`${ENDPOINTS.itemCategories}/${id}`, input);
  },

  deleteItemCategory: async (id: string) => {
    return API.delete<any>(`${ENDPOINTS.itemCategories}/${id}`);
  },
};
