import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  GetAllUsersOutputDto,
  GetAllUsersInputDto,
} from "./get-all-user-types";

export const getAllUsersAPI = {
  // Login user
  getAllUsers: async (input: GetAllUsersInputDto) => {
    return API.get<GetAllUsersOutputDto>(ENDPOINTS.getAllUsers, input);
  },
};
