import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  CurrentUserOutputDto,
} from "./current-user-types";

export const currentUserAPI = {
  // Login user
  currentUser: async () => {
    return API.get<CurrentUserOutputDto>(ENDPOINTS.currentUser);
  },
};
