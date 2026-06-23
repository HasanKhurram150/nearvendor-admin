import { ENDPOINTS } from "@/config/endpoints";
import { API } from "../base-api";
import {
  GetCommentsInputDto,
  GetCommentsOutputDto,
  GetReportedCommentsInputDto,
  GetReportedCommentsOutputDto,
} from "./comments-types";

export const commentsAPI = {
  getComments: async (input?: GetCommentsInputDto) => {
    return API.get<GetCommentsOutputDto>(ENDPOINTS.comments, input);
  },

  deleteComment: async (id: string) => {
    return API.delete<any>(`${ENDPOINTS.comments}/${id}`);
  },

  getReportedComments: async (input?: GetReportedCommentsInputDto) => {
    return API.get<GetReportedCommentsOutputDto>(ENDPOINTS.commentsReported, input);
  },

  resolveCommentReport: async (reportId: string) => {
    return API.patch<any>(ENDPOINTS.resolveCommentReport(reportId));
  },
};
