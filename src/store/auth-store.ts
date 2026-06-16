import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "@/services/auth/auth-api/auth-api";
import { cookieUtils } from "@/utils/cookie-utils";

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  phone: number;
  photoUrl: string;
  isPhoneVerified: boolean;
  role: string;
  isActive: boolean;
  lastKnownLongitude: number;
  lastKnownLatitude: number;
  lastLoginAt: number;
  deletedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string, refreshToken?: string, expiryMs?: number) => void;
}

const mapApiUser = (user: any): User => ({
  ...user,
  id: user.id || user.userId || user.uuid || "",
  fullName: user.fullName || user.employeeName || "",
  role: user.role || (Array.isArray(user.userRole) ? user.userRole[0] : user.userRole) || "",
});

function getTokenExpiry(token: string): number | null {
  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;
    
    const payloadStr = typeof window !== "undefined" 
      ? atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      : Buffer.from(payloadBase64, 'base64').toString();
      
    const payload = JSON.parse(payloadStr);
    if (payload.exp) {
      return payload.exp * 1000; // JWT exp is in seconds
    }
  } catch (e) {
    console.error("Failed to decode token", e);
  }
  return null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // Synchronous initialization from cookies to prevent "flash of dashboard"
      let initialToken = typeof window !== "undefined" ? cookieUtils.get("auth-token") : null;
      if (!initialToken && typeof window !== "undefined") {
        initialToken = localStorage.getItem("authToken");
      }
      
      let initialRefreshToken = typeof window !== "undefined" ? cookieUtils.get("refresh-token") : null;
      if (!initialRefreshToken && typeof window !== "undefined") {
        initialRefreshToken = localStorage.getItem("refreshToken");
      }
      
      return {
        user: null,
        token: initialToken || null,
        refreshToken: initialRefreshToken || null,
        tokenExpiry: null,
        isAuthenticated: !!initialToken,
        isLoading: false,
        isHydrated: false,

        login: async (email: string, password: string) => {
          try {
            set({ isLoading: true });
            const response = await authAPI.login({ email, password });

            if (response.data?.token) {
              const decodedExpiry = getTokenExpiry(response.data.token);
              const expiry = decodedExpiry || (Date.now() + 24 * 60 * 60 * 1000);
              cookieUtils.set("auth-token", response.data.token, {
                persistent: true,
                expires: new Date(expiry),
              });
              localStorage.setItem("authToken", response.data.token);

              if (response.data.refreshToken) {
                // Refresh token typically lives longer, e.g., 7 days
                const rtExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                cookieUtils.set("refresh-token", response.data.refreshToken, {
                  persistent: true,
                  expires: rtExpiry,
                });
                localStorage.setItem("refreshToken", response.data.refreshToken);
              }

              set({
                user: mapApiUser(response.data.user || {}),
                token: response.data.token,
                refreshToken: response.data.refreshToken || null,
                tokenExpiry: expiry,
                isAuthenticated: true,
                isLoading: false,
              });
              return { success: true };
            }

            set({ isLoading: false });
            return { success: false, error: "Invalid login response" };
          } catch (err: unknown) {
            set({ isLoading: false });
            const message =
              (err as any)?.response?.data?.message ||
              (err as any)?.response?.data?.error ||
              (err as any)?.message ||
              "Login failed";
            return { success: false, error: message };
          }
        },

        logout: async () => {
          cookieUtils.remove("auth-token");
          cookieUtils.remove("refresh-token");
          localStorage.removeItem("authToken");
          localStorage.removeItem("refreshToken");
          set({
            user: null,
            token: null,
            refreshToken: null,
            tokenExpiry: null,
            isAuthenticated: false,
            isLoading: false,
          });
        },

        verifyToken: async () => {
          const { token, tokenExpiry } = get();

          if (!token || (tokenExpiry && Date.now() > tokenExpiry)) {
            await get().logout();
            return;
          }

          set({ isLoading: true });
          try {
            // Placeholder for actual verify logic
            set({ isLoading: false });
          } catch (error) {
            await get().logout();
            set({ isLoading: false });
          }
        },

        setUser: (user: User) => {
          set({ user });
        },

        setToken: (token: string, refreshToken?: string, expiryMs?: number) => {
          const decodedExpiry = getTokenExpiry(token);
          const expiry = expiryMs || decodedExpiry || (Date.now() + 24 * 60 * 60 * 1000);
          cookieUtils.set("auth-token", token, {
            persistent: true,
            expires: new Date(expiry),
          });
          localStorage.setItem("authToken", token);

          if (refreshToken) {
            const rtExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            cookieUtils.set("refresh-token", refreshToken, {
              persistent: true,
              expires: rtExpiry,
            });
            localStorage.setItem("refreshToken", refreshToken);
          }

          set((state) => ({
            token,
            refreshToken: refreshToken || state.refreshToken,
            tokenExpiry: expiry,
            isAuthenticated: true,
            isLoading: false,
          }));
        },
      };
    },
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const cookieToken = cookieUtils.get("auth-token");
          if (!cookieToken && state.token) {
            cookieUtils.set("auth-token", state.token, {
              persistent: true,
              expires: state.tokenExpiry ? new Date(state.tokenExpiry) : undefined,
            });
          }
          
          const cookieRefreshToken = cookieUtils.get("refresh-token");
          if (!cookieRefreshToken && state.refreshToken) {
            const rtExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            cookieUtils.set("refresh-token", state.refreshToken, {
              persistent: true,
              expires: rtExpiry,
            });
          }
        }
        useAuthStore.setState({ isHydrated: true });
      },
    },
  ),
);

