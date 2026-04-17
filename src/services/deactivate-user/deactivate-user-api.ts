import { ENDPOINTS } from "@/config";
import { API } from "../base-api";
import { DeactivateUserInputDto, DeactivateUserOutputDto } from "./deactivate-user-types";


export const deactivateUserAPI = {
  // Login user
  deactivateUser: async (input: DeactivateUserInputDto) => {
    return API.get<DeactivateUserOutputDto>(
      ENDPOINTS.deactivateUser + `/${input.id}`,
    );
  },
};
