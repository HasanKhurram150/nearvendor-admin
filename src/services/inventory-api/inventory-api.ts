import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IAddInventory,
  IInventory,
  IInventoryQueryParams,
  IInventoryResponse,
  IUpdateInventory,
} from "./inventory-api.types";
import { TAGS } from "../tags";

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
      providesTags: [TAGS.INVENTORY],
    }),
    addInventory: builder.mutation<void, IAddInventory>({
      query: (payload) => ({
        url: ENDPOINTS.addInventory,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TAGS.INVENTORY],
    }),
    getInventoryById: builder.query<IInventory, string | string[] | undefined>({
      query: (id) => ({
        url: `${ENDPOINTS.getInventoryById}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response;
      },
      providesTags: [TAGS.INVENTORY],
    }),
    updateInventory: builder.mutation<void, IUpdateInventory>({
      query: (payload) => {
        const { id, ...rest } = payload;
        return {
          url: `${ENDPOINTS.updateInventory}/${payload.id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: [TAGS.INVENTORY],
    }),
  }),
});

export const {
  useGetAllInventoryQuery,
  useAddInventoryMutation,
  useGetInventoryByIdQuery,
  useUpdateInventoryMutation
} = inventoryAPI;
