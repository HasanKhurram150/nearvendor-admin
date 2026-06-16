export enum NotificationTargetType {
  ALL = 'all',
  VENDORS = 'vendors',
  CONSUMERS = 'consumers',
  SPECIFIC_USER = 'specificUser',
  SPECIFIC_CATEGORY = 'specificCategory',
}

export enum CategoryType {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion & Apparel items",
  PHARMACY = "Pharmacy items",
  HOME = "Home & Living",
  FLOWERS = "Flowers & Bouquets",
  HOME_MAINTAINANCE = "Home Maintainance",
  AUTOMOTIVE = "Automotive items",
}

export interface SendBroadcastInputDto {
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, any>;
  targetType: NotificationTargetType | string;
  targetCategory?: string | null;
  targetUserId?: string | null;
}

export interface SendBroadcastOutputDto {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, any>;
  targetType: string;
  targetCategory?: string | null;
  targetUserId?: string | null;
  status: string;
  sentBy: string;
  totalTargeted: number;
  totalDelivered: number;
  totalFailed: number;
  scheduledAt?: string | null;
  sentAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BroadcastItem {
  id: string;
  title: string;
  body: string;
  targetType: string;
  status: string;
  totalTargeted: number;
  totalDelivered: number;
  totalFailed: number;
  sentAt?: string | null;
  createdAt: string;
}

export interface GetBroadcastsOutputDto {
  items: BroadcastItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface GetBroadcastDetailsOutputDto {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  data?: Record<string, any>;
  targetType: string;
  targetCategory?: string | null;
  targetUserId?: string | null;
  status: string;
  sentBy: string;
  totalTargeted: number;
  totalDelivered: number;
  totalFailed: number;
  scheduledAt?: string | null;
  sentAt?: string | null;
  createdAt: string;
  updatedAt: string;
}
