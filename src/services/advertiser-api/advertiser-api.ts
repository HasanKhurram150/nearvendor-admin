import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IAddAdvertiser,
  Iadvertiser,
  IUpdateAdvertiser,
} from "./advertiser-api.types";
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
    getAdvertiserById: builder.query<
      Iadvertiser,
      string | string[] | undefined
    >({
      query: (id) => ({
        url: `${ENDPOINTS.getAdvertiserById}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as Iadvertiser;
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
    editAdvertiser: builder.mutation<void, IUpdateAdvertiser>({
      query: (payload) => {
        const { id, ...rest } = payload;
        return {
          url: `${ENDPOINTS.addAdvertiser}/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: [TAGS.ADVERTISER],
    }),
  }),
});

export const {
  useGetAllAdvertiserQuery,
  useAddAdvertiserMutation,
  useGetAdvertiserByIdQuery,
  useEditAdvertiserMutation
} = advertiserAPI;
