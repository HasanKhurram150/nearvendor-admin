import { ENDPOINTS } from "@/config/endpoints";
import { API } from "../base-api";
import {
  GetReviewsInputDto,
  GetReviewsOutputDto,
  GetReportedReviewsInputDto,
  GetReportedReviewsOutputDto,
} from "./reviews-types";

export const reviewsAPI = {
  getReviews: async (input?: GetReviewsInputDto) => {
    return API.get<GetReviewsOutputDto>(ENDPOINTS.reviews, input);
  },

  deleteReview: async (id: string) => {
    return API.delete<any>(`${ENDPOINTS.reviews}/${id}`);
  },

  getReportedReviews: async (input?: GetReportedReviewsInputDto) => {
    return API.get<GetReportedReviewsOutputDto>(ENDPOINTS.reviewsReported, input);
  },

  resolveReviewReport: async (reportId: string) => {
    return API.patch<any>(ENDPOINTS.resolveReviewReport(reportId));
  },
};
