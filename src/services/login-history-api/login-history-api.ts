import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  ILoginHistoryItem,
  ILoginHistoryMeta,
  IGetLoginHistoryParams,
} from "./login-history-api.types";
import { TAGS } from "../tags";

export const loginHistoryAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getLoginHistory: builder.query<
      { data: ILoginHistoryItem[]; meta: ILoginHistoryMeta },
      IGetLoginHistoryParams
    >({
      query: (params) => ({
        url: ENDPOINTS.getLoginHistoryList,
        method: "GET",
        params: {
          page: params.page,
          pageSize: params.pageSize,
          sortBy: params.sortBy ?? "loggedInAt",
          sort: params.sort ?? "desc",
          ...(params.search ? { search: params.search } : {}),
          ...(params.userId ? { userId: params.userId } : {}),
          ...(params.countryCode ? { countryCode: params.countryCode } : {}),
          ...(params.ip ? { ip: params.ip } : {}),
          ...(params.clientName ? { clientName: params.clientName } : {}),
          ...(params.deviceType ? { deviceType: params.deviceType } : {}),
          ...(params.fromDate ? { fromDate: params.fromDate } : {}),
          ...(params.toDate ? { toDate: params.toDate } : {}),
        },
      }),
      transformResponse: (response: any) => {
        return {
          data: response?.data?.data as ILoginHistoryItem[],
          meta: response?.data?.meta as ILoginHistoryMeta,
        };
      },
      providesTags: [TAGS.LoginHistory],
    }),
  }),
});

export const { useGetLoginHistoryQuery } = loginHistoryAPI;
