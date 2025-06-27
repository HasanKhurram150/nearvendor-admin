export interface IUpdatePackagePrice {
  packageId: string;
  priceId: string;
  amount: number;
}

export interface IPackages {
  data: IData;
}

export interface IData {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  description: string;
  stripeProductId: string;
  isDefault: boolean;
  isActive: boolean;
  prices: IPrice[];
  features: IFeature[];
}

export interface IPrice {
  createdAt: string;
  updatedAt: string;
  id: string;
  amount: number;
  currency: string;
  stripePriceId: string;
  interval: string;
  isActive: boolean;
}

export interface IFeature {
  createdAt: string;
  updatedAt: string;
  id: string;
  featureKey: string;
  name: string;
  description: string;
  isIncluded: boolean;
  displayOrder: number;
}
