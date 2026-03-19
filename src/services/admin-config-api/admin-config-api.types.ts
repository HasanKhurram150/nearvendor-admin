// Record of chainId (as string key) → wallet address or null
export type INftMasterWallets = Record<string, string | null>;

export interface IAdminConfig {
  nftMasterWallets: INftMasterWallets;
}

export interface IUpdateNftMasterWalletPayload {
  chainId: number;
  address: string;
}

export interface IUpdateNftMasterWalletResponse {
  statusCode: number;
  message: string;
  value: string;
}
