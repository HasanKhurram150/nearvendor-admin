import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
  IAdminRewardSettlement,
  IAdminRewardSettlementsParams,
  IAdminRewardSettlementsResponse,
  ICreateAdminRewardSettlementPayload,
  ICreateAdminRewardSettlementResponse,
  IAdminRewardsParams,
  IAdminRewardsResponse,
  IAdminRewardsSummary,
  IRewardConfig,
  IRewardConfigsParams,
  ICreateRewardConfigPayload,
  IUpdateRewardConfigPayload,
  IUpdateRewardConfigStatusPayload,
  IPlatformRewardsParams,
  IPlatformRewardsResponse,
} from "./rewards-api.types";

export const rewardsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAdminRewards: builder.query<IAdminRewardsResponse, IAdminRewardsParams>({
      query: (params) => ({
        url: ENDPOINTS.getAdminRewards,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => response?.data as IAdminRewardsResponse,
      providesTags: [TAGS.AdminRewards],
    }),
    getAdminRewardSettlements: builder.query<
      IAdminRewardSettlementsResponse,
      IAdminRewardSettlementsParams
    >({
      query: (params) => ({
        url: ENDPOINTS.getAdminRewardSettlements,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) =>
        response?.data as IAdminRewardSettlementsResponse,
      providesTags: [TAGS.AdminRewardSettlements],
    }),
    getAdminRewardSettlement: builder.query<IAdminRewardSettlement, string>({
      query: (settlementId) => ({
        url: `${ENDPOINTS.getAdminRewardSettlement}/${settlementId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data as IAdminRewardSettlement,
      providesTags: [TAGS.AdminRewardSettlements],
    }),
    getAdminRewardsSummary: builder.query<IAdminRewardsSummary, void>({
      query: () => ({
        url: ENDPOINTS.getAdminRewardsSummary,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data as IAdminRewardsSummary,
      providesTags: [TAGS.AdminRewards],
    }),
    createAdminRewardSettlement: builder.mutation<
      ICreateAdminRewardSettlementResponse,
      ICreateAdminRewardSettlementPayload
    >({
      query: (body) => ({
        url: ENDPOINTS.createAdminRewardSettlement,
        method: "POST",
        body,
      }),
      transformResponse: (response: any) =>
        response?.data as ICreateAdminRewardSettlementResponse,
      invalidatesTags: [TAGS.AdminRewards, TAGS.AdminRewardSettlements],
    }),
    deleteAdminRewardSettlement: builder.mutation<void, string>({
      query: (settlementId) => ({
        url: `${ENDPOINTS.deleteAdminRewardSettlement}/${settlementId}`,
        method: "DELETE",
      }),
      transformResponse: () => undefined,
      invalidatesTags: [TAGS.AdminRewards, TAGS.AdminRewardSettlements],
    }),
    getRewardConfigs: builder.query<IRewardConfig[], IRewardConfigsParams>({
      query: (params) => ({
        url: ENDPOINTS.getRewardConfigs,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) =>
        response?.data as IRewardConfig[],
      providesTags: [TAGS.RewardConfigs],
    }),
    createRewardConfig: builder.mutation<IRewardConfig, ICreateRewardConfigPayload>({
      query: (body) => ({
        url: ENDPOINTS.getRewardConfigs,
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => response?.data as IRewardConfig,
      invalidatesTags: [TAGS.RewardConfigs],
    }),
    updateRewardConfig: builder.mutation<IRewardConfig, IUpdateRewardConfigPayload>({
      query: ({ id, ...body }) => ({
        url: `${ENDPOINTS.updateRewardConfig}/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: any) => response?.data as IRewardConfig,
      invalidatesTags: [TAGS.RewardConfigs],
    }),
    updateRewardConfigStatus: builder.mutation<IRewardConfig, IUpdateRewardConfigStatusPayload>({
      query: ({ id, isActive }) => ({
        url: `${ENDPOINTS.updateRewardConfigStatus}/${id}/status`,
        method: "PATCH",
        body: { isActive },
      }),
      transformResponse: (response: any) => response?.data as IRewardConfig,
      invalidatesTags: [TAGS.RewardConfigs],
    }),
    getPlatformRewards: builder.query<IPlatformRewardsResponse, IPlatformRewardsParams>({
      query: (params) => ({
        url: ENDPOINTS.getPlatformRewards,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => response?.data as IPlatformRewardsResponse,
      providesTags: [TAGS.PlatformRewards],
    }),
  }),
});

export const {
  useGetAdminRewardsQuery,
  useGetAdminRewardSettlementsQuery,
  useLazyGetAdminRewardSettlementQuery,
  useGetAdminRewardsSummaryQuery,
  useCreateAdminRewardSettlementMutation,
  useDeleteAdminRewardSettlementMutation,
  useGetRewardConfigsQuery,
  useCreateRewardConfigMutation,
  useUpdateRewardConfigMutation,
  useUpdateRewardConfigStatusMutation,
  useGetPlatformRewardsQuery,
} = rewardsAPI;
