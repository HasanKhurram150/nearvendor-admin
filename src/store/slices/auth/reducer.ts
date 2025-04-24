import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./auth.type";
import { setSessionStorage } from "@/utils";

const initialState: AuthState = {
  authToken: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    token: (state: AuthState, action) => {
      state.authToken = action?.payload;
    },
    login: (state: AuthState, action) => {
      state.authToken = action?.payload?.token;
      setSessionStorage("accessToken", action?.payload?.token);
    },
    logout: (state) => {
      const savedTheme = localStorage.getItem("theme");

      state.authToken = null;
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
