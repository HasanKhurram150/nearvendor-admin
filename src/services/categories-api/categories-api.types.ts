export interface ICategory {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  type: string;
  orderBy: number;
  eventCount: number;
  sourceId: string | null;
  iconUrl: string | null;
}

export interface ICreateCategory {
  name: string;
  type: string;
}
