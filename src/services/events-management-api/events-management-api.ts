import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
// import { TAGS } from "../tags";
import {
  IEvent,
  IEventActionPayload,
  IGetEventsParams,
  IMeta,
  IOurEvent,
  IUpdateEvent,
  IUploadEventCSV,
} from "./events-management-api.types";
import { TAGS } from "../tags";

export const eventsManagementAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getEvents: builder.query<{ data: IEvent[]; meta: IMeta }, IGetEventsParams>(
      {
        query: (params) => ({
          url: ENDPOINTS.getEvents,
          method: "GET",
          params: {
            page: params?.page,
            pageSize: params?.pageSize,
            sortBy: params?.sortBy,
            sort: params?.sort,
            name: params?.name,
            type: params?.type,
            categoryId: params?.categoryId,
            locationId: params?.locationId,
            calendarId: params?.calendarId,
          },
        }),
        transformResponse: (response: any) => {
          return {
            data: response?.data?.data as IEvent[],
            meta: response?.data?.meta as IMeta,
          };
        },
        providesTags: ["Events"],
      },
    ),
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
      invalidatesTags: [TAGS.EVENTS],
    }),
    eventAction: builder.mutation<any, IEventActionPayload>({
      query: ({ id, action }) => ({
        url: `${ENDPOINTS.getEvents}/action`,
        method: "POST",
        body: {
          eventId: id,
          action: action,
        },
      }),
      invalidatesTags: [TAGS.EVENTS],
    }),
    uploadEventCSV: builder.mutation<IUploadEventCSV, FormData>({
      query: (formData) => ({
        url: ENDPOINTS.uploadEventCSV,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [TAGS.EVENTS],
    }),
    processEventCSV: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: ENDPOINTS.processEventCSV,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [TAGS.EVENTS],
    }),
    getOurEvents: builder.query<
      { data: IOurEvent[]; meta: IMeta },
      IGetEventsParams
    >({
      query: (params) => ({
        url: ENDPOINTS.getOurEvents,
        method: "GET",
        params: {
          page: params?.page,
          pageSize: params?.pageSize,
          sortBy: params?.sortBy || "createdAt",
          sort: params?.sort || "desc",
          name: params?.name,
          type: params?.type,
        },
      }),
      transformResponse: (response: any) => {
        return {
          data: response?.data?.data as IOurEvent[],
          meta: response?.data?.meta as IMeta,
        };
      },
      providesTags: [TAGS.EVENTS],
    }),
    deleteEvent: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINTS.getEvents}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAGS.EVENTS],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useUploadEventCSVMutation,
  useProcessEventCSVMutation,
  useUpdateEventMutation,
  useEventActionMutation,
  useGetOurEventsQuery,
  useGetEventByIdQuery,
  useDeleteEventMutation,
} = eventsManagementAPI;
