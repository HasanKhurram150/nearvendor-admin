import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
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
    getAdminRewardsSummary: builder.query<IAdminRewardsSummary, void>({
      query: () => ({
        url: ENDPOINTS.getAdminRewardsSummary,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data as IAdminRewardsSummary,
      providesTags: [TAGS.AdminRewards],
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
  useGetAdminRewardsSummaryQuery,
  useGetRewardConfigsQuery,
  useCreateRewardConfigMutation,
  useUpdateRewardConfigMutation,
  useUpdateRewardConfigStatusMutation,
  useGetPlatformRewardsQuery,
} = rewardsAPI;
