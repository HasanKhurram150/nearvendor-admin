import apiClient from "@/services/client";

export const API = {
  get: async <T>(url: string, data?: any): Promise<T> => {
    // If callers pass a plain object, treat it as query params; if they pass an
    // axios config (already containing params/headers/etc), forward it as-is.
    const config =
      data && typeof data === "object" && !Array.isArray(data)
        ? "params" in data ||
          "headers" in data ||
          "timeout" in data ||
          "responseType" in data
          ? data
          : { params: data }
        : undefined;

    const response = await apiClient.get(url, config);
    return response.data as T;
  },

  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await apiClient.post(url, data, config);
    return response.data as T;
  },

  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await apiClient.put(url, data, config);
    return response.data as T;
  },

  patch: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await apiClient.patch(url, data, config);
    return response.data as T;
  },

  delete: async <T>(url: string, config?: any): Promise<T> => {
    const response = await apiClient.delete(url, config);
    return response.data as T;
  },
};
