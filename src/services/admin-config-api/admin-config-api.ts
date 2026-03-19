import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
  IAdminConfig,
  IUpdateNftMasterWalletPayload,
  IUpdateNftMasterWalletResponse,
} from "./admin-config-api.types";

export const adminConfigAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAdminConfig: builder.query<IAdminConfig, void>({
      query: () => ({
        url: ENDPOINTS.getAdminConfig,
        method: "GET",
      }),
      transformResponse: (response: any) => response as IAdminConfig,
      providesTags: [TAGS.AdminConfig],
    }),
    updateNftMasterWallet: builder.mutation<
      IUpdateNftMasterWalletResponse,
      IUpdateNftMasterWalletPayload
    >({
      query: (body) => ({
        url: ENDPOINTS.updateNftMasterWallet,
        method: "PUT",
        body,
      }),
      transformResponse: (response: any) =>
        response as IUpdateNftMasterWalletResponse,
      invalidatesTags: [TAGS.AdminConfig],
    }),
  }),
});

export const { useGetAdminConfigQuery, useUpdateNftMasterWalletMutation } =
  adminConfigAPI;
