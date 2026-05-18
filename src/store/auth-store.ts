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
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  verifyToken: () => Promise<void>;
  setUser: (user: User) => void;
  setToken: (token: string, expiryMs?: number) => void;
}

const mapApiUser = (user: any): User => ({
  ...user,
  id: user.id || user.userId || user.uuid || "",
  fullName: user.fullName || user.employeeName || "",
  role: user.role || (Array.isArray(user.userRole) ? user.userRole[0] : user.userRole) || "",
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => {
      // Synchronous initialization from cookies to prevent "flash of dashboard"
      const initialToken = typeof window !== "undefined" ? cookieUtils.get("auth-token") : null;
      
      return {
        user: null,
        token: initialToken || null,
        tokenExpiry: null,
        isAuthenticated: !!initialToken,
        isLoading: false,
        isHydrated: false,

        login: async (email: string, password: string) => {
          try {
            set({ isLoading: true });
            const response = await authAPI.login({ email, password });

            if (response.data?.token) {
              const expiry = Date.now() + 24 * 60 * 60 * 1000;
              cookieUtils.set("auth-token", response.data.token, {
                persistent: true,
                expires: new Date(expiry),
              });
              localStorage.setItem("authToken", response.data.token);

              set({
                user: mapApiUser(response.data.user || {}),
                token: response.data.token,
                tokenExpiry: expiry,
                isAuthenticated: true,
                isLoading: false,
              });
              setAutoLogout(expiry);
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
          localStorage.removeItem("authToken");
          set({
            user: null,
            token: null,
            tokenExpiry: null,
            isAuthenticated: false,
            isLoading: false,
          });
          if (logoutTimer) clearTimeout(logoutTimer);
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

        setToken: (token: string, expiryMs?: number) => {
          const expiry = expiryMs || Date.now() + 24 * 60 * 60 * 1000;
          cookieUtils.set("auth-token", token, {
            persistent: true,
            expires: new Date(expiry),
          });
          set({
            token,
            tokenExpiry: expiry,
            isAuthenticated: true,
            isLoading: false,
          });
          setAutoLogout(expiry);
        },
      };
    },
    {
      name: "auth-storage",
      partialize: (state: AuthState) => ({
        user: state.user,
        token: state.token,
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
          if (state.tokenExpiry) {
            setAutoLogout(state.tokenExpiry);
          }
        }
        useAuthStore.setState({ isHydrated: true });
      },
    },
  ),
);

let logoutTimer: ReturnType<typeof setTimeout> | null = null;
function setAutoLogout(expiry: number | null) {
  if (logoutTimer) clearTimeout(logoutTimer);
  if (!expiry) return;
  const ms = expiry - Date.now();
  if (ms <= 0) {
    useAuthStore.getState().logout();
    return;
  }
  logoutTimer = setTimeout(() => {
    useAuthStore.getState().logout();
  }, ms);
}
