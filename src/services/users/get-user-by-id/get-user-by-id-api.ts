import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  GetUserByIdInputDto,
  GetUserByIdOutputDto,
} from "./get-user-by-id-types";

export const getUserByIdAPI = {
  // Login user
  getUserById: async (input: GetUserByIdInputDto) => {
    return API.get<GetUserByIdOutputDto>(
      ENDPOINTS.getUserById + `/${input.id}`,
    );
  },
};
