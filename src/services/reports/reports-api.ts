import { ENDPOINTS } from "@/config";
import { API } from "../base-api";
import { GetAllReportsOutputDto, GetAllReportsInputDto } from "./reports-types";

export const getAllReportsAPI = {
  // Login user
  getAllReports: async (input: GetAllReportsInputDto) => {
    return API.get<GetAllReportsOutputDto>(ENDPOINTS.getAllReports, input);
  },
};
