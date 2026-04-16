import { ENDPOINTS } from "@/config";
import { API } from "../base-api";
import {
  GetReportsByIdInputDto,
  GetReportsByIdOutputDto,
} from "./reports-by-id-types";

export const getUserByIdAPI = {
  // Login user
  getUserById: async (input: GetReportsByIdInputDto) => {
    return API.get<GetReportsByIdOutputDto>(
      ENDPOINTS.getUserById + `/${input.id}`,
    );
  },
};
