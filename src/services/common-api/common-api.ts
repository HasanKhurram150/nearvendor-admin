import { combineReducers } from '@reduxjs/toolkit';
import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { IAddAdvertiser, Iadvertiser } from "./common-api.types";
import { TAGS } from "../tags";

export const commonAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({

  }),
});

export const {  } =
commonAPI;
