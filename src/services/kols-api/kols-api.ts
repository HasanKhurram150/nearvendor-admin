import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { IGetKols, IKolBadge, IKolStatus } from "./kols-api.types";
import { TAGS } from "../tags";

export const kolsAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getKolRequests: builder.query<IGetKols[], void>({
      query: () => ({
        url: ENDPOINTS.getKolRequests,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as IGetKols[];
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
