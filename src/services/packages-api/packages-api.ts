import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { IPackages, IUpdatePackagePrice } from "./packages-api.types";
import { TAGS } from "../tags";

export const packagesAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllPackages: builder.query<IPackages[], void>({
      query: () => ({
        url: ENDPOINTS.getAllPackages,
        method: "GET",
      }),
      transformErrorResponse: (response: any) => {
        return response?.data as IPackages;
      },
      providesTags: [TAGS.PACKAGES],
    }),
    getPackageById: builder.query<IPackages, string>({
      query: (id) => ({
        url: `${ENDPOINTS.getPackageById}/${id}`,
        method: "GET",
      }),
      providesTags: [TAGS.PACKAGES],
    }),
    updatePackagePrice: builder.mutation<
      { amount: number },
      IUpdatePackagePrice
    >({
      query: ({ packageId, priceId, amount }) => ({
        url: `${ENDPOINTS.updatePackagePrice}/${packageId}/prices/${priceId}`,
        method: "PATCH",
        body: { amount },
      }),
      invalidatesTags: [TAGS.PACKAGES],
    }),
  }),
});

export const { useGetAllPackagesQuery, useGetPackageByIdQuery, useUpdatePackagePriceMutation } =
  packagesAPI;
