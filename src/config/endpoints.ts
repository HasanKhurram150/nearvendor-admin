//----------------------------------------------------------------
// api endpoints

export const ENDPOINTS = {
  verifyInviteToken: "/auth/verify-invite-token", //GET
  setPassword: "/auth/set-password", // PATCH
  get2Fa: "/auth/2fa-qr", //GET
  verify2Fa: "/auth/verify-2fa",
  login: "/auth/login", //POST
  getCampaigns: "/campaign", //GET
  getAllPlacements: "/placement/all", //GET
  getAllAdvertiser: "/advertiser/all", //GET
  getAllInventory: "/inventory/all", //GET
  addCampaign: "/campaign", //POST
  addAdvertiser: "/advertiser", //POST
  addInventory: "/inventory", //POST
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
  getAdminEmailSettings: "/settings/admin/email",
};
//----------------------------------------------------------------
