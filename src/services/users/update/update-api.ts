import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import { UpdateInputDto, UpdateOutputDto } from "./update-types";

export const updateAPI = {
  // Login user
  update: async (input: UpdateInputDto) => {
    return API.patch<UpdateOutputDto>(ENDPOINTS.userUpdate, input);
  },
};
