import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IAddCampaignPayload,
  ICampaignQueryParams,
  ICampaignResponse,
} from "./campaign-api.types";

import { TAGS } from "../tags";

export const campaignAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCampaigns: builder.query<ICampaignResponse, ICampaignQueryParams>({
      query: (params) => ({
        url: ENDPOINTS.getCampaigns,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        return response?.data as ICampaignResponse;
      },
      providesTags: [TAGS.CAMPAIGN],
    }),
    addCampaign: builder.mutation<void, IAddCampaignPayload>({
      query: (payload) => ({
        url: ENDPOINTS.addCampaign,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TAGS.CAMPAIGN],
    }),
  }),
});

export const { useGetCampaignsQuery, useAddCampaignMutation } = campaignAPI;
