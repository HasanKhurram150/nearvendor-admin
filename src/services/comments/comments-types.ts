export interface Comment {
  id: string;
  reviewId: string;
  authorId: string;
  authorName: string;
  authorPhotoUrl: string | null;
  authorType: "USER" | "VENDOR";
  text: string;
  images: string[];
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentReport {
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

export interface ReportedComment {
  report: CommentReport;
  comment: Comment;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetCommentsOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: Comment[];
    pagination: PaginationMeta;
  };
}

export interface GetReportedCommentsOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: ReportedComment[];
    pagination: PaginationMeta;
  };
}

export interface GetCommentsInputDto {
  reviewId?: string;
  authorId?: string;
  authorType?: string; // "USER" | "VENDOR"
  isEdited?: boolean;
  sort?: string; // "latest" | "oldest"
  page?: number;
  limit?: number;
}

export interface GetReportedCommentsInputDto {
  page?: number;
  limit?: number;
}
