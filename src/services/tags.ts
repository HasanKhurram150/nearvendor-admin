// set the Tag to Update APi

export const EXAMPLE = "EXAMPLE";

// export const TAGS = [EXAMPLE];

export const TAGS = {
  CAMPAIGN: "Campaign",
  ADVERTISER: "Advertiser",
  CATEGORIES: "Categories",
  KOLS: "Kols",
  DashboardStats: "DashboardStats",
  EVENTS: "Events",
  PACKAGES: "Packages",
  EMAILSETTINGS: "EmailSettings",
};

export const generateTags = (result: any, TAG: string) => {
  return result
    ? [
        ...result.map(({ _id }: any) => ({
          type: TAG,
          id: _id,
        })),
        { type: TAG, id: "LIST" },
      ]
    : [{ type: TAG, id: "LIST" }];
};

export const generateSingleTag = (result: any, TAG: string) => {
  return result
    ? [
        {
          type: TAG,
          id: result._id,
        },
      ]
    : [{ type: TAG, id: "LIST" }];
};
