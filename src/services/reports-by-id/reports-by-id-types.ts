export interface GetReportsByIdInputDto {
  id: string;
  page?: number;
  limit?: number;
}

export interface GetReportsByIdOutputDto {
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
