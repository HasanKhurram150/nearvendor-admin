// RTK Query
import {
  BaseQueryApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

// Store + configuration
import { TAGS } from "./tags";
import { environment } from "@/config";

// Create baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: environment.apiKey,
  prepareHeaders: (headers, { getState }) => {
    // If we have a token in the store, then use that for authenticated requests
    const token = localStorage.getItem("authToken");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | { url: string; method?: string; body?: any; params?: any },
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Handle 401 error - typically unauthorized

    // Option 1: Dispatch a logout action

    localStorage.removeItem("authToken"); // Clear the token from local storage

    window.location.href = "/signin";
    // Option 2: Optionally, you might want to retry the request after refreshing the token
    // (This requires a refresh token mechanism)
    // const refreshToken = localStorage.getItem("refreshToken");
    // if (refreshToken) {
    //   const refreshResult = await baseQuery(
    //     { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
    //     api,
    //     extraOptions
    //   );
    //   if (refreshResult?.data?.authToken) {
    //     localStorage.setItem('authToken', refreshResult.data.authToken as string);
    //     // Retry the original request with the new token
    //     result = await baseQuery(args, api, extraOptions);
    //   } else {
    //     // Handle refresh token failure (e.g., dispatch logout again)
    //     api.dispatch(logout());
    //     localStorage.removeItem("authToken");
    //     localStorage.removeItem("refreshToken");
    //   }
    // } else {
    //   // No refresh token, just logout
    //   api.dispatch(logout());
    //   localStorage.removeItem("authToken");
    // }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    TAGS.ADVERTISER,
    TAGS.CAMPAIGN,
    TAGS.CATEGORIES,
    TAGS.KOLS,
    TAGS.EVENTS,
    TAGS.PACKAGES,
    TAGS.EMAILSETTINGS,
  ],
  endpoints: () => ({}),
});
