import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import { StatusOutputDto } from "./status-types";

export const vendorStatusAPI = {
  // Login user
  vendorStatus: async () => {
    return API.get<StatusOutputDto>(ENDPOINTS.vendorStatus);
  },
};
