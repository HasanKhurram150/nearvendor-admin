import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IDashboardStats,
  IDashboardUsersParams,
  IPaginatedUserData,
} from "./dashboard-api.types";
import { TAGS } from "../tags";

export const dashboardAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getDashboardStats: builder.query<IDashboardStats, void>({
      query: () => ({
        url: ENDPOINTS.getDashboardStats,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as IDashboardStats;
      },
      providesTags: [TAGS.DashboardStats],
    }),
    getDashboardUsers: builder.query<IPaginatedUserData, IDashboardUsersParams>(
      {
        query: ({
          page,
          pageSize,
          sortBy="createdAt",
          sort="desc",
          search
        }) => ({
          url: `${ENDPOINTS.getDashboardUsers}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sort=${sort}&search=${search}`,
          method: "GET",
        }),
        transformResponse: (response: any) => {
          return response?.data as IPaginatedUserData;
        },
        providesTags: [TAGS.DashboardStats],
      },
    ),
  }),
});

export const { useGetDashboardStatsQuery, useGetDashboardUsersQuery } =
  dashboardAPI;
