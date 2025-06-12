import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IAddInventory,
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
        return response?.data as IInventoryResponse;
      },
    }),
    addInventory: builder.mutation<void, IAddInventory>({
      query: (payload) => ({
        url: ENDPOINTS.addInventory,
        method: "POST",
        body: payload,
      }),
      // invalidatesTags: [TAGS.INVENTORY],
    }),
  }),
});

export const { useGetAllInventoryQuery, useAddInventoryMutation } =
  inventoryAPI;
