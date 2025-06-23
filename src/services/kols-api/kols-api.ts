import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IGetKolParams,
  IGetKols,
  IKolBadge,
  IKolStatus,
  IMeta,
} from "./kols-api.types";
import { TAGS } from "../tags";

export const kolsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getKolRequests: builder.query<
      { data: IGetKols[]; meta: IMeta },
      IGetKolParams
    >({
      query: (params) => ({
        url: ENDPOINTS.getKolRequests,
        method: "GET",
        params: {
          page: params?.page,
          pageSize: params?.pageSize,
          sortBy: params?.sortBy,
          sort: params?.sort,
          status: params?.status,
          badge: params?.badge,
        },
      }),
      transformResponse: (response: any) => {
        return {
          data: response?.data as IGetKols[],
          meta: response?.meta as IMeta,
        };
      },
      providesTags: [TAGS.KOLS],
    }),
    updateKolRequestStatus: builder.mutation<
      void,
      {
        id: string;
        body: {
          badge?: IKolBadge;
          status: IKolStatus;
        };
      }
    >({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.approveKolRequest}/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAGS.KOLS],
    }),
  }),
});

export const { useGetKolRequestsQuery, useUpdateKolRequestStatusMutation } =
  kolsAPI;
