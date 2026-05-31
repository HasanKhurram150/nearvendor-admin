export interface GetAllReportsInputDto {
  page: number;
  limit: number;
}

interface Users {
  id: string;
  // fullName: string;
  email: string;
  // role: string;
  // isActive: boolean;
  // photoUrl: string;
  // createdAt: string;
  reportCount: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllReportsOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    users: Users[];
    pagination: Pagination;
  };
}
