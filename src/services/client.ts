import axios from "axios";
import { useAuthStore } from "@/store/auth-store";

//for dev
const API_BASE_URL = process.env.NEXT_PUBLIC_API_KEY;

//for prod
// const API_BASE_URL = "https://api.nearvendor.pro/api";
// const API_BASE_URL = "http://76.13.223.103:3836/api";

//ip based
// const API_BASE_URL = "https://10.111.101.26/v1/api"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const { token } = useAuthStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // Handle 304 Not Modified - axios should handle this, but ensure data exists
    if (response.status === 304) {
      console.log("304 Not Modified response received, using cached data");
      // If response.data is empty, we might need to retry without cache
      if (!response.data) {
        console.warn("304 response has no data, may need to retry");
      }
    }
    return response;
  },
  (error) => {
    // Log error details for debugging
    console.log("API Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message,
    });

    // Handle 304 as a special case - it's not really an error
    if (error.response?.status === 304) {
      console.log("304 Not Modified - treating as successful with cached data");
      // Return a response-like object with the cached data if available
      return Promise.resolve({
        status: 304,
        statusText: "Not Modified",
        data: error.response?.data || null,
        headers: error.response?.headers || {},
        config: error.config,
      });
    }

    if (error.response?.status === 401) {
      // Only auto-logout if it's not a login endpoint or token verification endpoint
      const isLoginEndpoint = error.config?.url?.includes("/auth/");
      const isVerifyEndpoint = error.config?.url?.includes("/auth/verify");

      if (
        !isLoginEndpoint &&
        !isVerifyEndpoint &&
        typeof window !== "undefined"
      ) {
        console.log("401 error on non-auth endpoint, logging out");
        const { logout } = useAuthStore.getState();
        logout();
        window.location.href = "/";
      } else if (isLoginEndpoint || isVerifyEndpoint) {
        console.log("401 error on auth endpoint, not auto-logging out");
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;

// export const bulkApiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 90000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
