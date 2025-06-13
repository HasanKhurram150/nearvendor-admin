import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import {
  IGetEventsParams,
  IUploadEventCSV,
} from "./events-management-api.types";

export const eventsManagementAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getEvents: builder.query<Event[], IGetEventsParams>({
      query: (params) => ({
        url: ENDPOINTS.getEvents,
        method: "GET",
        params: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
          sortBy: params?.sortBy || "createdAt",
          sort: params?.sort,
          name: params?.name,
          type: params?.type,
          categoryId: params?.categoryId,
          locationId: params?.locationId,
          calendarId: params?.calendarId,
        },
      }),
      transformResponse: (response: any) => {
        return response?.data as Event[];
      },
      // providesTags: [TAGS.EVENTS],
    }),
    uploadEventCSV: builder.mutation<IUploadEventCSV, FormData>({
      query: (formData) => ({
        url: ENDPOINTS.uploadEventCSV,
        method: "POST",
        body: formData,
      }),
      // invalidatesTags: [TAGS.EVENTS],
    }),
  }),
});

export const { useGetEventsQuery, useUploadEventCSVMutation } =
  eventsManagementAPI;
