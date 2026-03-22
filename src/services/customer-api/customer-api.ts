import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  ICustomer,
  ICustomerMeta,
  IGetCustomersParams,
} from "./customer-api.types";
import { TAGS } from "../tags";

export const customerAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCustomers: builder.query<
      { data: ICustomer[]; meta: ICustomerMeta },
      IGetCustomersParams
    >({
      query: (params) => ({
        url: ENDPOINTS.getCustomerList,
        method: "GET",
        params: {
          page: params.page,
          pageSize: params.pageSize,
          sortBy: params.sortBy ?? "createdAt",
          sort: params.sort ?? "desc",
          ...(params.search ? { search: params.search } : {}),
        },
      }),
      transformResponse: (response: any) => {
        return {
          data: response?.data?.data as ICustomer[],
          meta: response?.data?.meta as ICustomerMeta,
        };
      },
      providesTags: [TAGS.CUSTOMERS],
    }),
    toggleReferralTreeView: builder.mutation<
      void,
      { accountId: string; enabled: boolean }
    >({
      query: ({ accountId, enabled }) => ({
        url: `${ENDPOINTS.toggleReferralTreeView}/${accountId}/referral-tree-view`,
        method: "PUT",
        body: { enabled },
      }),
      invalidatesTags: [TAGS.CUSTOMERS],
    }),
  }),
});

export const { useGetCustomersQuery, useToggleReferralTreeViewMutation } =
  customerAPI;
