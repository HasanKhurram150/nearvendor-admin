import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IInventoryQueryParams,
  IInventoryResponse,
} from "./inventory-api.types";

export const inventoryAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllInventory: builder.query<IInventoryResponse, IInventoryQueryParams>({
      query: (params) => ({
        url: ENDPOINTS.getAllInventory,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response as IInventoryResponse;
      },
    }),
  }),
});

export const { useGetAllInventoryQuery } = inventoryAPI;
