export interface IDashboardStats {
  totalEvents: number;
  totalUsers: number;
  dailyEvents: number;
}

/**
 * Interface for the metadata of the paginated response.
 */
export interface Meta {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

/**
 * Interface for a single user data entry.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  createdAt: string; // ISO 8601 date string
  totalEvents: string; // This is a string, as per the example "0", "2"
}

/**
 * Interface for the data object containing meta and the array of user data.
 */
export interface IPaginatedUserData {
  meta: Meta;
  data: User[];
}

export interface IDashboardUsersParams {
  page: number,
  pageSize: number,
  sortBy?: string,
  sort?: string,
  search: string
}