import { ENDPOINTS } from "@/config";
import { API } from "../../base-api";
import {
  SendBroadcastInputDto,
  SendBroadcastOutputDto,
  GetBroadcastsOutputDto,
  GetBroadcastDetailsOutputDto,
} from "./admin-broadcasts-types";


export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export const adminBroadcastsAPI = {
  sendBroadcast: async (input: SendBroadcastInputDto) => {
    return API.post<ApiResponse<SendBroadcastOutputDto>>(ENDPOINTS.adminBroadcast, input);
  },
  
  getBroadcasts: async (params?: { page?: number; limit?: number }) => {
    return API.get<ApiResponse<GetBroadcastsOutputDto>>(ENDPOINTS.adminBroadcasts, params);
  },
  
  getBroadcastDetails: async (id: string) => {
    return API.get<ApiResponse<GetBroadcastDetailsOutputDto>>(`${ENDPOINTS.adminBroadcasts}/${id}`);
  },
};
