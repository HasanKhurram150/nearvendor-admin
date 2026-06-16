export interface GetAllVendorInputDto {
  status?: string;
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Applications {
  id: string;
  createdAt: string;
  // updatedAt: string;
  businessName: string;
  // firstName: string;
  // lastName: string;
  // businessType: string;
  businessEmail: string;
  // mobileNumber: string;
  // businessPhoneNumber: string;
  // cnicFrontImageUrl: string;
  // cnicBackImageUrl: string;
  // state: string;
  // city: string;
  // area: string;
  // postalCode: string;
  // streetAddress: string;
  // shopLongitude: number | null;
  // shopLatitude: number | null;
  status: string;
  // rejectionReason: string | null;
  // reviewedAt: string | null;
  // userId: string;
}

export interface GetAllVendorOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    applications: Applications[];
    pagination: Pagination;
  };
}
