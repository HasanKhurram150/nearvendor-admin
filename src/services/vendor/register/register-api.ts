import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import { RegisterInputDto, RegisterOutputDto } from "./register-types";

export const registerAPI = {
  // Login user
  register: async (input: RegisterInputDto) => {
    return API.post<RegisterOutputDto>(ENDPOINTS.register, input);
  },
};
