import { ENDPOINTS } from "@/config";
import { API } from "../base-api";
import {
  GetReportsByIdInputDto,
  GetReportsByIdOutputDto,
} from "./reports-by-id-types";

export const getReportsByIdAPI = {
  // Login user
  getReportsById: async (input: GetReportsByIdInputDto) => {
    return API.get<GetReportsByIdOutputDto>(
      ENDPOINTS.getAllReportsById + `/${input.id}`,
    );
  },
};
