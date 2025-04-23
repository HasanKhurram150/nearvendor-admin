export interface IVerifyInviteToken {
  email: string;
}

export interface IGet2Fa {
  qr: string;
  formattedKey: string;
}

export interface ISetPassword {
  password: string;
  passwordConfirmation: string;
}

export interface ISetPasswordRes {
  token: string;
}

export interface ApiErrorResponse {
  data: {
    statusCode: number;
    message: string;
  };
}
