export type Event = {
  createdAt: string;
  updatedAt: string;
  id: string;
  identifier: string;
  name: string;
  link: any;
  startDateTime: string;
  endDateTime: string;
  description?: string;
  instructions?: string;
  capacity: number;
  type: string;
  image: string;
  showAttendee: boolean;
  participationCount: number;
  hostCount: number;
  isFeatured: boolean;
  location: Location;
  timeZone: ITimeZone;
  calendar: ICalendar;
  category: any;
  currencies: any[];
  campaign: any;
};

export interface ILocation {
  createdAt: string;
  updatedAt: string;
  id: string;
  location: string;
  latitude: number;
  longitude: number;
}

export interface ITimeZone {
  id: string;
  timezone: string;
  region: string;
  displayName: string;
  gmtOffset: string;
  gmtText: string;
}

export interface ICalendar {
  createdAt: string;
  updatedAt: string;
  id: string;
  identifier: string;
  name: string;
  coverImage?: string;
  profileImage?: string;
  description?: string;
  color?: string;
  twitter: any;
  instagram: any;
  youtube: any;
  tiktok: any;
  linkedin: any;
  website: any;
  sourceId: any;
  isFeatured: boolean;
}

export interface IGetEventsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sort?: string;
  name?: string;
  type?: string;
  categoryId?: string;
  locationId?: string;
  calendarId?: string;
}

export interface IUploadEventCSV {
  success: boolean;
  file: IFile;
}

export interface IFile {
  originalname: string;
  size: number;
  mimetype: string;
}
