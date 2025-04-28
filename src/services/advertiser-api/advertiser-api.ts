import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { Iadvertiser } from "./advertiser-api.types";

export const advertiserAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllAdvertiser: builder.query<Iadvertiser[], void>({
      query: () => ({
        url: ENDPOINTS.getAllAdvertiser,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as Iadvertiser[];
      },
    }),
  }),
});

export const { useGetAllAdvertiserQuery } = advertiserAPI;
