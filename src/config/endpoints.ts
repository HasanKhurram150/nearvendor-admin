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
};
//----------------------------------------------------------------
