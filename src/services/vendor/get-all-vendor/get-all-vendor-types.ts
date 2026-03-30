export interface GetAllVendorInputDto {
  status?: string;
  page?: number;
  limit?: number;
}

export interface VendorItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  businessName: string;
  businessType: string;
  taxId: string;
  cnic: string; // Changed back to string based on user's response example "12345-1234567-1"
  cnicImageUrl: string;
  supportContact: string; // Changed back to string based on user's response example "+12234545656"
  status: string;
  isVerified: boolean;
  user: {
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
  };
}

export interface GetAllVendorOutputDto {
  success: boolean;
  statusCode: number;
  data: {
    vendors: VendorItem[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
