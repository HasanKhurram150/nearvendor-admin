import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth.type";
import { IAdmin } from "@/services/auth-api/auth-api.types";

const initialState: AuthState = {
  token: null,
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    token: (state: AuthState, action) => {
      state.token = action?.payload;
    },
    login: (state, action: PayloadAction<{ token: string; user: IAdmin }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      const savedTheme = localStorage.getItem("theme");

      state.token = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      if (savedTheme) {
        localStorage.setItem("theme", savedTheme);
      }
    },
  },
});

export const authActions = slice.actions;
export const authReducer = slice.reducer;
