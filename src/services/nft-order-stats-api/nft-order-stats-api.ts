import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
  INftOrderStats,
  INftOrderSalesData,
  INftOrdersQueryParams,
  INftOrdersResponse,
  TimeSpan,
} from "./nft-order-stats-api.types";

export const nftOrderStatsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNftOrderStats: builder.query<INftOrderStats, TimeSpan>({
      query: (timeSpan) => ({
        url: ENDPOINTS.getNftOrderStats,
        method: "GET",
        params: { timeSpan },
      }),
      transformResponse: (response: any) => response?.data as INftOrderStats,
      providesTags: [TAGS.NftOrderStats],
    }),
    getNftOrderSales: builder.query<INftOrderSalesData, TimeSpan>({
      query: (timeSpan) => ({
        url: ENDPOINTS.getNftOrderSales,
        method: "GET",
        params: { timeSpan },
      }),
      transformResponse: (response: any) =>
        response?.data as INftOrderSalesData,
      providesTags: [TAGS.NftOrderStats],
    }),
    getNftOrders: builder.query<INftOrdersResponse, INftOrdersQueryParams>({
      query: ({ page, pageSize, sortBy = "createdAt", sort = "desc", status, search, nftId, tokenId, minUsdPrice, maxUsdPrice, chainId }) => {
        const params: Record<string, string | number> = {
          page,
          pageSize,
          sortBy,
          sort,
        };
        if (status && status !== "all") params.status = status;
        if (search) params.search = search;
        if (nftId) params.nftId = nftId;
        if (tokenId) params.tokenId = tokenId;
        if (typeof minUsdPrice === "number" && !Number.isNaN(minUsdPrice)) params.minUsdPrice = minUsdPrice;
        if (typeof maxUsdPrice === "number" && !Number.isNaN(maxUsdPrice)) params.maxUsdPrice = maxUsdPrice;
        if (typeof chainId === "number" && !Number.isNaN(chainId)) params.chainId = chainId;
        return {
          url: ENDPOINTS.getNftOrders,
          method: "GET",
          params,
        };
      },
      transformResponse: (response: any) => response?.data as INftOrdersResponse,
      providesTags: [TAGS.NftOrderStats],
    }),
  }),
});

export const {
  useGetNftOrderStatsQuery,
  useGetNftOrderSalesQuery,
  useGetNftOrdersQuery,
} = nftOrderStatsAPI;
