import { ENDPOINTS } from "@/config";
import { baseAPI } from "../base-api";
import { TAGS } from "../tags";
import { ICategory, ICreateCategory } from "./categories-api.types";

export const categoriesAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], { type?: string }>({
      query: (params) => ({
        url: ENDPOINTS.getCategories,
        method: "GET",
        ...(params && { params }),
      }),
      transformResponse: (response: any) => {
        return response as ICategory[];
      },
      providesTags: [TAGS.CATEGORIES],
    }),
    createCategory: builder.mutation<ICategory, ICreateCategory>({
      query: (payload) => ({
        url: ENDPOINTS.createCategory,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [TAGS.CATEGORIES],
    }),
    updateCategory: builder.mutation<
      ICategory,
      { id: string; payload: ICreateCategory }
    >({
      query: ({ id, payload }) => ({
        url: `${ENDPOINTS.updateCategory}/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [TAGS.CATEGORIES],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ENDPOINTS.deleteCategory}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAGS.CATEGORIES],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesAPI;
