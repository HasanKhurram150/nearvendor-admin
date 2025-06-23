export type IKolBadge = "golden" | "blue" | "silver";
export type IKolStatus = "pending" | "approved" | "rejected";

export interface IGetKols {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  email: string;
  telegramId: string;
  instagram: string;
  x: string;
  totalAudienceSite: number;
  aboutYou: string;
  status: string;
  badge: any;
  instagramFollowers: number;
  xFollowers: number;
  user: IUser;
}

export interface IUser {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  userName: string;
  email: string;
  image: any;
  password: string;
  stripeCustomerId: any;
  stripeAccountId: any;
  isPasswordEnabled: boolean;
  twoFAEnabled: boolean;
  anonymous: boolean;
  qrCode: string;
  twoFaKey: any;
  countryCode: any;
  phoneNumber: any;
  twitter: any;
  instagram: any;
  youtube: any;
  tiktok: any;
  telegram: any;
  telegramId: any;
  telegramChatId: any;
  linkedin: any;
  website: any;
  bio: any;
  blurb: any;
}

export interface IGetKolParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: string;
  status?: string;
  badge?: string;
}


export interface IMeta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}
