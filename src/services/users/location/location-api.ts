import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import { LocationInputDto, LocationOutputDto } from "./location-api-types";

export const locationAPI = {
  // Login user
  location: async (input: LocationInputDto) => {
    return API.patch<LocationOutputDto>(ENDPOINTS.userLocation, input);
  },
};
