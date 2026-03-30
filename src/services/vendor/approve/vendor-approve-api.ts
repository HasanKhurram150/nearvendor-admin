import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  VendorApproveInputDto,
  VendorApproveOutputDto,
} from "./vendor-approve-types";

export const vendorApproveAPI = {
  vendorApprove: async (input: VendorApproveInputDto) => {
    return API.patch<VendorApproveOutputDto>(
      `${ENDPOINTS.vendorApprove}/${input.vendorId}`,
    );
  },
};
