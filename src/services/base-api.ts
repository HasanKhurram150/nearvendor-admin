// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const baseAPI = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: [TAGS.CAMPAIGN, TAGS.ADVERTISER, TAGS.CATEGORIES, TAGS.KOLS],
  endpoints: () => ({}),
});
