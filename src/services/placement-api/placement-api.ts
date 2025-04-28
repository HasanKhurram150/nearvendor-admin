import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { IPlacements } from "./placement-api.types";

export const placementAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllPlacements: builder.query<IPlacements[], void>({
      query: () => ({
        url: ENDPOINTS.getAllPlacements,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as IPlacements[];
      },
    }),
  }),
});

export const { useGetAllPlacementsQuery } = placementAPI;
