import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
// import { TAGS } from "../tags";
import {
  IEvent,
  IGetEventsParams,
  IUpdateEvent,
  IUploadEventCSV,
} from "./events-management-api.types";
import { TAGS } from "../tags";

export const eventsManagementAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getEvents: builder.query<IEvent[], IGetEventsParams>({
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
        return response?.data?.data as IEvent[];
      },
      providesTags: ["Events"],
    }),
    getEventById: builder.query<IEvent, string>({
      query: (id) => ({
        url: `${ENDPOINTS.getEvents}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as IEvent;
      },
      // providesTags: [TAGS.EVENTS],
    }),
    updateEvent: builder.mutation<any, IUpdateEvent>({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.getEvents}/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Events"],
    }),
    uploadEventCSV: builder.mutation<IUploadEventCSV, FormData>({
      query: (formData) => ({
        url: ENDPOINTS.uploadEventCSV,
        method: "POST",
        body: formData,
      }),
      // invalidatesTags: [TAGS.EVENTS],
    }),
    processEventCSV: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: ENDPOINTS.processEventCSV,
        method: "POST",
        body: formData,
      }),
      // invalidatesTags: [TAGS.EVENTS],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useUploadEventCSVMutation,
  useProcessEventCSVMutation,
  useUpdateEventMutation,
} = eventsManagementAPI;
