export interface ICustomer {
  accountId: string;
  accountStatus: string;
  createdAt: string;
  updatedAt: string;
  countryId: string | null;
  countryName: string | null;
  countryFlag: string | null;
  name: string | null;
  userName: string | null;
  email: string | null;
  status: string;
  contactNo: string | null;
  address: string | null;
  referral: string | null;
  referralCode: string | null;
  referralMessageSigned: boolean;
  referralTreeViewEnabled: boolean;
  backupAvailable: boolean;
}

export interface ICustomerMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface IGetCustomersParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sort?: "asc" | "desc";
  search?: string;
}
