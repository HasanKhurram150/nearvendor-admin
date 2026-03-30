import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  GetAllVendorInputDto,
  GetAllVendorOutputDto,
} from "./get-all-vendor-types";

export const getAllVendorAPI = {
  getAllVendor: async (input: GetAllVendorInputDto) => {
    return API.get<GetAllVendorOutputDto>(ENDPOINTS.vendorAll, input);
  },
};
