//----------------------------------------------------------------
// api endpoints

export const ENDPOINTS = {
  verifyInviteToken: "/auth/verify-invite-token", //GET
  setPassword: "/auth/set-password", // PATCH
  get2Fa: "/auth/2fa-qr", //GET
  verify2Fa: "/auth/verify-2fa",
  login: "/auth/login", //POST
  getNfts: "/nft", //GET
  getCampaigns: "/campaign", //GET
  getAllPlacements: "/placement/all", //GET
  getAllAdvertiser: "/advertiser/all", //GET
   getAdvertiserById: "/advertiser", //GET
  getAllInventory: "/inventory/all", //GET
  getInventoryById: "/inventory/one", //GET
  addCampaign: "/campaign", //POST
  addAdvertiser: "/advertiser", //POST
  addInventory: "/inventory", //POST
  updateInventory: "/inventory/update", //PUT
  updateInventoryStatus: "/inventory/update/status", //PUT
  getCategories: "/categories", //GET
  createCategory: "/categories", //POST
  updateCategory: "/categories", //PATCH
  deleteCategory: "/categories", //DELETE
  getEvents: "/events", //GET
  getOurEvents: "/events/our-events-list", //GET
  uploadEventCSV: "/events/upload/csv", //POST
  processEventCSV: "/events/process/csv", //PATCH
  getKolRequests: "/kol/requests", //GET
  approveKolRequest: "/kol/approve", //PATCH
  getDashboardStats: "/dashboard/stats", //GET
  getDashboardUsers: "/dashboard/users", //GET
  updatePackagePrice: "/packages", //GET
  getAllPackages: "/packages", //GET
  getPackageById: "/packages",
  getNftOrderStats: "/nft/orders/stats", //GET
  getNftOrderSales: "/nft/orders/sales", //GET
  getNftOrders: "/nft/orders", //GET
  getAdminConfig: "/config", //GET
  updateNftMasterWallet: "/config/nft-master-wallet", //PUT
};
//----------------------------------------------------------------
