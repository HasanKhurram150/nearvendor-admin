//----------------------------------------------------------------
// api endpoints

export const ENDPOINTS = {
  // verifyInviteToken: "/auth/verify-invite-token", //GET
  // setPassword: "/auth/set-password", // PATCH
  // get2Fa: "/auth/2fa-qr", //GET
  // verify2Fa: "/auth/verify-2fa",
  // login: "/auth/login", //POST
  // getNfts: "/nft", //GET
  // getCampaigns: "/campaign", //GET
  // getAllPlacements: "/placement/all", //GET
  // getAllAdvertiser: "/advertiser/all", //GET
  // getAdvertiserById: "/advertiser", //GET
  // getAllInventory: "/inventory/all", //GET
  // getInventoryById: "/inventory/one", //GET
  // addCampaign: "/campaign", //POST
  // addAdvertiser: "/advertiser", //POST
  // addInventory: "/inventory", //POST
  // updateInventory: "/inventory/update", //PUT
  // updateInventoryStatus: "/inventory/update/status", //PUT
  // getCategories: "/categories", //GET
  // createCategory: "/categories", //POST
  // updateCategory: "/categories", //PATCH
  // deleteCategory: "/categories", //DELETE
  // getEvents: "/events", //GET
  // getOurEvents: "/events/our-events-list", //GET
  // uploadEventCSV: "/events/upload/csv", //POST
  // processEventCSV: "/events/process/csv", //PATCH
  // getKolRequests: "/kol/requests", //GET
  // approveKolRequest: "/kol/approve", //PATCH
  // getDashboardStats: "/dashboard/stats", //GET
  // getDashboardUsers: "/dashboard/users", //GET
  // updatePackagePrice: "/packages", //GET
  // getAllPackages: "/packages", //GET
  // getPackageById: "/packages",
  // getNftOrderStats: "/nft/orders/stats", //GET
  // getNftOrderSales: "/nft/orders/sales", //GET
  // getNftOrders: "/nft/orders", //GET
  // getAdminConfig: "/config", //GET
  // updateNftMasterWallet: "/config/nft-master-wallet", //PUT
  // getAdminRewards: "/rewards", //GET
  // getAdminRewardsSummary: "/rewards/summary", //GET
  // getAdminRewardSettlements: "/rewards/settlements", //GET
  // getAdminRewardSettlement: "/rewards/settlements", //GET /:id
  // createAdminRewardSettlement: "/rewards/settlements", //POST
  // deleteAdminRewardSettlement: "/rewards/settlements", //DELETE /:id
  // getRewardConfigs: "/rewards/configs", //GET
  // updateRewardConfig: "/rewards/configs", //PATCH
  // updateRewardConfigStatus: "/rewards/configs", //PATCH :id/status
  // getPlatformRewards: "/rewards/platform", //GET
  // getCustomerList: "/customer/list", //GET
  // toggleReferralTreeView: "/customer", //PUT /:accountId/referral-tree-view
  // getLoginHistoryList: "/login-history/list", //GET

  // NEW APIS
  auth: "/auth/login",

  // USER
  userUpdate: "/users/update",
  userChangePassword: "/users/change-password",
  deleteUser: "/users/delete-account",
  currentUser: "/users/me", //GET
  userLocation: "/users/location", //GET
  getAllUsers: "/admin/users", //GET
  getUserById: "/admin/user", //GET :{id}

  // VENDOR
  register: "/vendor/register", //POST
  vendorUpdate: "/vendor/update", //PUT
  vendorStatus: "/vendor/me/status", //GET
  vendorApprove: "/admin/applications/approve", //PATCH :{vendorId}
  vendorReject: "/admin/applications/reject", //PATCH :{vendorId}
  vendorGetById: "/admin/applications", //GET :{id}
  vendorAll: "/admin/applications", //GET
  vendorProfile: "/vendor/me/profile", //GET
  vendorSearch: "/vendor/portfolio/search", //GET
  vendorperformance: "/vendor/portfolio/performance", //GET

  //REPORTS
  getAllReports: "admin/reports/users", //GET
  getAllReportsById: "admin/reports/user", //GET
  deactivateUser: "admin/user/inactivate", //GET
};
//----------------------------------------------------------------
