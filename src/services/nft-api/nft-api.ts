import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
  IGetNftsQueryParams,
  IGetNftsResponse,
  IMintNftsPayload,
  IMintNftsResponse,
  INftItem,
  IUpdateNftPayload,
} from "./nft-api.types";

export const nftAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getNfts: builder.query<IGetNftsResponse, IGetNftsQueryParams | void>({
      query: (params) => {
        const queryParams: Record<string, string | number> = {
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 10,
          sortBy: params?.sortBy ?? "createdAt",
          sort: params?.sort ?? "desc",
        };

        if (params?.search) {
          queryParams.search = params.search;
        }

        if (typeof params?.minUsdPrice === "number" && !Number.isNaN(params.minUsdPrice)) {
          queryParams.minUsdPrice = params.minUsdPrice;
        }

        if (typeof params?.maxUsdPrice === "number" && !Number.isNaN(params.maxUsdPrice)) {
          queryParams.maxUsdPrice = params.maxUsdPrice;
        }

        if (params?.ownerWalletAddress) {
          queryParams.ownerWalletAddress = params.ownerWalletAddress;
        }

        if (params?.status) {
          queryParams.status = params.status;
        }

        return {
          url: ENDPOINTS.getNfts,
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response: any) => {
        return response?.data as IGetNftsResponse;
      },
      providesTags: (result) => {
        const itemTags =
          result?.data?.map((item) => ({ type: TAGS.NFT, id: item.id })) ?? [];

        return [...itemTags, { type: TAGS.NFT, id: "LIST" }];
      },
    }),
    getNftById: builder.query<INftItem, string>({
      query: (id) => ({
        url: `${ENDPOINTS.getNfts}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as INftItem;
      },
      providesTags: (_result, _error, id) => [{ type: TAGS.NFT, id }],
    }),
    updateNft: builder.mutation<INftItem, { id: string; body: IUpdateNftPayload }>({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.getNfts}/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: any) => {
        return response?.data as INftItem;
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: TAGS.NFT, id },
        { type: TAGS.NFT, id: "LIST" },
      ],
    }),
    mintNfts: builder.mutation<IMintNftsResponse, IMintNftsPayload>({
      query: ({ chainId, nfts, images }) => {
        const formData = new FormData();

        formData.append("chainId", String(chainId));
        formData.append("nfts", JSON.stringify(nfts));

        images.forEach((image) => {
          formData.append("images", image);
        });

        return {
          url: ENDPOINTS.getNfts,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (response: any) => {
        if (response?.data) {
          return {
            message: response.message,
            data: response.data as INftItem[],
          } satisfies IMintNftsResponse;
        }

        return response as IMintNftsResponse;
      },
      invalidatesTags: [{ type: TAGS.NFT, id: "LIST" }],
    }),
  }),
});

export const {
  useGetNftsQuery,
  useGetNftByIdQuery,
  useUpdateNftMutation,
  useMintNftsMutation,
} = nftAPI;