export interface UpdateVendorInputDto {
  businessName: string;
  businessCategory: string;
  taxId: string;
  supportContact: string;
}

export interface UpdateVendorOutputDto {
  statusCode: number;
  message: string;
}
