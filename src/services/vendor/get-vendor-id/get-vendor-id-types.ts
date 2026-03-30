export interface GetVendorIdInputDto {
  id: string;
}

export interface GetVendorIdOutputDto {
  success: boolean;
  statusCode: number;
  data: {
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
    shops: [];
  };
}
