import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { ICampaignQueryParams, ICampaignResponse } from "./campaign-api.types";

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
    }),
  }),
});

export const { useGetCampaignsQuery } = campaignAPI;
