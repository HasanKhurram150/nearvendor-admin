export interface GetAllUsersInputDto {
  page: number;
  limit: number;
}

export interface VendorProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  businessType: string;
  taxId: string;
  cnic: string;
  cnicImageUrl: string;
  supportContact: string;
  status: string;
  isVerified: boolean;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  phone: string | null;
  photoUrl: string | null;
  isPhoneVerified: boolean;
  role: string;
  isActive: boolean;
  lastKnownLongitude: string;
  lastKnownLatitude: string;
  lastLoginAt: string | null;
  vendorProfile: VendorProfile;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllUsersOutputDto {
  success: boolean;
  statusCode: number;
  data: {
    users: User[];
    pagination: Pagination;
  };
}
