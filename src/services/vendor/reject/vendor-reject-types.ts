export interface VendorRejectInputDto {
    vendorId: string;
}

export interface VendorRejectOutputDto {
    success: boolean;
    statusCode: number;
    message: string;
    data: any;
}
