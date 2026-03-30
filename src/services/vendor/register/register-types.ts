export interface RegisterInputDto {
  businessName: string;
  businessCategory: string;
  taxId: string;
  supportContact: string;
  cnic: string;
  cnicImageUrl: string;
}

export interface RegisterOutputDto {
  statusCode: number;
  message: string;
}
