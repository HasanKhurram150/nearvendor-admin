import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import {
  IAddAdminEmail,
  IEmailSetting,
  IGet2Fa,
  ILogin,
  ILoginRes,
  ISetPassword,
  ISetPasswordRes,
  IVerify2Fa,
  IVerify2FaRes,
  IVerifyInviteToken,
} from "./auth-api.types";
import { TAGS } from "../tags";

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
    verify2Fa: builder.mutation<IVerify2FaRes, IVerify2Fa>({
      query: (body) => ({
        url: ENDPOINTS.verify2Fa,
        method: "POST",
        body,
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      }),
      transformResponse: (response: any) => {
        return response?.data as IVerify2FaRes;
      },
    }),
    login: builder.mutation<ILoginRes, ILogin>({
      query: (credentials) => ({
        url: ENDPOINTS.login,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        return response?.data as ILoginRes;
      },
    }),
    getAdminEmail: builder.query<IEmailSetting, void>({
      query: () => ({
        url: ENDPOINTS.getAdminEmailSettings,
        method: "GET",
      }),
      transformResponse: (response: any) => {
        return response?.data as IEmailSetting;
      },
      providesTags: [TAGS.EMAILSETTINGS],
    }),
    addAdminEmail: builder.mutation<IEmailSetting, IAddAdminEmail>({
      query: (body) => ({
        url: ENDPOINTS.getAdminEmailSettings,
        method: "POST",
        body,
      }),
      transformResponse: (response: any) => {
        return response?.data as IEmailSetting;
      },
      invalidatesTags: [TAGS.EMAILSETTINGS],
    }),
  }),
});

export const {
  useVerifyInviteTokenQuery,
  useSetPasswordMutation,
  useGet2FaQuery,
  useVerify2FaMutation,
  useLoginMutation,
  useGetAdminEmailQuery,
  useAddAdminEmailMutation,
} = authAPI;
