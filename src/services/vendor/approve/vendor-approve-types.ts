export interface VendorApproveInputDto {
  vendorId: string;
}

export interface VendorApproveOutputDto {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}
