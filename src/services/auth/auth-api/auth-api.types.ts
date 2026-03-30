// export interface IVerifyInviteToken {
//   email: string;
// }

// export interface ISetPassword {
//   password: string;
//   passwordConfirmation: string;
// }

// export interface IGet2Fa {
//   qr: string;
//   formattedKey: string;
// }

// export interface IAdmin {
//   createdAt: string;
//   updatedAt: string;
//   uuid: string;
//   email: string;
//   name: string;
//   contactNo: string;
//   emailConfirmed: boolean;
//   status: string;
//   role: {
//     createdAt: string;
//     updatedAt: string;
//     id: string;
//     name: string;
//   };
//   department: {
//     createdAt: string;
//     updatedAt: string;
//     id: string;
//     name: string;
//   };
//   country: {
//     createdAt: string;
//     updatedAt: string;
//     id: string;
//     flag: string;
//     name: string;
//     iso2Symbol: string;
//     iso3Symbol: string;
//     dialingCode: string;
//     currencyCode: string;
//     countryCode: string;
//   };
// }

// export interface IVerify2FaRes {
//   token: string;
//   admin: IAdmin;
// }

// export interface IVerify2Fa {
//   code: string;
// }

// export interface ISetPasswordRes {
//   token: string;
// }

// export interface ILogin {
//   email: string;
//   password: string;
// }

// export interface ILoginRes {
//   token: string;
// }

// export interface IEmailSetting {
//   id: string;
//   key: string;
//   value: string;
//   description: string;
//   isActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: any;
// }

// export interface IAddAdminEmail {
//   email: string;
// }

// export interface ApiErrorResponse {
//   data: {
//     statusCode: number;
//     message: string;
//   };
// }
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  user: {
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
    lastLoginAt: number;
    deletedAt: string;
  };
  token: string;
}
