import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IGet2Fa,
  ISetPassword,
  ISetPasswordRes,
  IVerifyInviteToken,
} from "./auth-api.types";

export const authAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    verifyInviteToken: builder.query<IVerifyInviteToken, string>({
      query: (token) => ({
        url: ENDPOINTS.verifyInviteToken,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Use Bearer token as shown in Postman
        },
      }),
      // Handle potential response format variations
      transformResponse: (response: any) => {
        if (response?.data) {
          return response.data as IVerifyInviteToken;
        }
        return response;
      },
    }),
    setPassword: builder.mutation<
      ISetPasswordRes,
      { body: ISetPassword; token: string }
    >({
      query: ({ body, token }) => ({
        url: ENDPOINTS.setPassword,
        method: "PATCH",
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: any) => {
        return response?.data as ISetPasswordRes;
      },
    }),
    get2Fa: builder.query<IGet2Fa, void>({
      query: () => ({
        url: ENDPOINTS?.get2Fa,
        method: "GET",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }),
      transformResponse: (response: any) => {
        return response?.data as IGet2Fa;
      },
    }),
  }),
});

export const {
  useVerifyInviteTokenQuery,
  useGet2FaQuery,
  useSetPasswordMutation,
} = authAPI;
