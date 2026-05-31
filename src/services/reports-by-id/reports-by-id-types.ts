export interface GetReportsByIdInputDto {
  id: string;
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Reporter {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  photoUrl: string;
  isPhoneVerified: boolean;
  role: string;
  isActive: boolean;
  lastKnownLongitude: number;
  lastKnownLatitude: number;
  lastLoginAt: string;
}

interface Reports {
  id: string;
  // createdAt: string;
  // updatedAt: string;
  // targetId: string;
  // targetType: string;
  reporterId: string;
  reason: string;
  // additionalDetails: string;
  // isResolved: boolean;
  // reporter: Reporter;
}

export interface GetReportsByIdOutputDto {
  success: true;
  statusCode: number;
  data: {
    reports: Reports[];
    pagination: Pagination;
  };
}
