export interface UpdateInputDto {
  fullName: string;
  phone: number;
  photoUrl: string;
  longitude: string;
  latitude: string;
}

export interface UpdateOutputDto {
  success: boolean;
  message: string;
  user: {
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
    lastKnownLongitude: string;
    lastKnownLatitude: string;
    lastLoginAt: string;
    deletedAt: string;
  };
}
