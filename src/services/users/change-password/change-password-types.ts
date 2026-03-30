export interface ChangePasswordInputDto {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordOutputDto {
  success: boolean;
  message: string;
}
