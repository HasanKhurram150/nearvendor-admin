export interface GetVendorIdInputDto {
  id: string;
}

export interface GetVendorIdOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    businessName: string;
    firstName: string;
    lastName: string;
    businessType: string;
    businessEmail: string;
    mobileNumber: string;
    businessPhoneNumber: string;
    cnicFrontImageUrl: string;
    cnicBackImageUrl: string;
    state: string;
    city: string;
    area: string;
    postalCode: string;
    streetAddress: string;
    status: string;
    rejectionReason: string | null;
    reviewedAt: string | null;
    userId: string;
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
      isPasswordSet: boolean;
      role: string;
      isActive: boolean;
      lastKnownLongitude: number | null;
      lastKnownLatitude: number | null;
      lastLoginAt: string | null;
    };
    reviewedBy: string | null;
  };
}
