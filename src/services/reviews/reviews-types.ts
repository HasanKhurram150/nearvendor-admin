export interface Review {
  id: string;
  shopId: string;
  userId: string;
  userName: string;
  userPhotoUrl: string | null;
  rating: number;
  text: string;
  images: string[];
  isEdited: boolean;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewReport {
  id: string;
  reason: string;
  additionalDetails: string | null;
  isResolved: boolean;
  reportedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface ReportedReview {
  report: ReviewReport;
  review: Review;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetReviewsOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: Review[];
    pagination: PaginationMeta;
  };
}

export interface GetReportedReviewsOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: ReportedReview[];
    pagination: PaginationMeta;
  };
}

export interface GetReviewsInputDto {
  shopId?: string;
  userId?: string;
  rating?: number;
  isEdited?: boolean;
  sort?: string; // "latest" | "oldest" | "highest" | "lowest"
  page?: number;
  limit?: number;
}

export interface GetReportedReviewsInputDto {
  page?: number;
  limit?: number;
}
