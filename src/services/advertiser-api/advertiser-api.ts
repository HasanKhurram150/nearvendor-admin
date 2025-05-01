import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { IAddAdvertiser, Iadvertiser } from "./advertiser-api.types";
import { TAGS } from "../tags";

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
      providesTags: [TAGS.ADVERTISER],
    }),
    addAdvertiser: builder.mutation<void, IAddAdvertiser>({
      query: (payload) => ({
        url: ENDPOINTS.addAdvertiser,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TAGS.ADVERTISER],
    }),
  }),
});

export const { useGetAllAdvertiserQuery, useAddAdvertiserMutation } =
  advertiserAPI;
