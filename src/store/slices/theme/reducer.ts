"use client";
import { createSlice } from "@reduxjs/toolkit";
import { ThemesSliceStateProps } from "./theme.types";
import { getLocalStorage } from "@/utils";


export const ThemeIntitalState: ThemesSliceStateProps = {
  mode: getLocalStorage("theme") || "light",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState: ThemeIntitalState,

  reducers: {
    setTheme(state: any, action) {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export const themeReducer = ThemeSlice.reducer;
