export interface GetUserByIdInputDto {
  id: string;
  page?: number;
  limit?: number;
}

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  phone: null;
  photoUrl: null;
  isPhoneVerified: boolean;
  role: string;
  isActive: boolean;
  lastKnownLongitude: string;
  lastKnownLatitude: string;
  lastLoginAt: null;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface Wishlist {
  items: [];
  pagination: Pagination;
}
export interface SearchHistory {
  items: [];
  pagination: Pagination;
}
export interface RecentItems {
  items: [];
  pagination: Pagination;
}
export interface AnalyticsEvents {
  items: [];
  pagination: Pagination;
}

export interface GetUserByIdOutputDto {
  success: boolean;
  statusCode: number;
  data: {
    user: User;
    wishlist: Wishlist;
    searchHistory: SearchHistory;
    recentItems: RecentItems;
    analyticsEvents: AnalyticsEvents;
  };
}
