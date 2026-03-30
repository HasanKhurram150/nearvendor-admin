
export interface CurrentUserDetails {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  phone: number;
  photoUrl: string;
  isPhoneVerified: boolean;
  role: string;
  isActive: boolean;
  lastKnownLongitude: number;
  lastKnownLatitude: number;
  lastLoginAt: string;
}

export interface CurrentUserOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: CurrentUserDetails;
}
