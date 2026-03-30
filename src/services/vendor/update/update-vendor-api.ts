import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  UpdateVendorInputDto,
  UpdateVendorOutputDto,
} from "./update-vendor-types";

export const updateVendorAPI = {
  // Login user
  updateVendor: async (input: UpdateVendorInputDto) => {
    return API.put<UpdateVendorOutputDto>(ENDPOINTS.vendorUpdate, input);
  },
};
