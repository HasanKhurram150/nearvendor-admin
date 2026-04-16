export interface GetAllReportsInputDto {
  page: number;
  limit: number;
}

export interface GetAllReportsOutputDto {
  success: boolean;
  statusCode: number;
  data: {
    users: [];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
