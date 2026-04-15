import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
    VendorRejectInputDto,
    VendorRejectOutputDto,
} from "./vendor-reject-types";

export const vendorRejectAPI = {
    vendorReject: async (input: VendorRejectInputDto) => {
        return API.patch<VendorRejectOutputDto>(
            `${ENDPOINTS.vendorApprove}/${input.vendorId}`,
        );
    },
};
