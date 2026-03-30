import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  ChangePasswordInputDto,
  ChangePasswordOutputDto,
} from "./change-password-types";

export const changePasswordAPI = {
  // Login user
  changePassword: async (input: ChangePasswordInputDto) => {
    return API.post<ChangePasswordOutputDto>(ENDPOINTS.userChangePassword, input);
  },
};
