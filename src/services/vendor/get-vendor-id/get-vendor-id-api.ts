import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  GetVendorIdInputDto,
  GetVendorIdOutputDto,
} from "./get-vendor-id-types";

export const getVendorIdAPI = {
  getVendorId: async (input: GetVendorIdInputDto) => {
    return API.get<GetVendorIdOutputDto>(
      `${ENDPOINTS.vendorGetById}/${input.id}`,
    );
  },
};
