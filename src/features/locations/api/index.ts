import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import { baseApi } from "@/store/api";
import {
  type CreateLocationCategoryResType,
  type GetLocationCategoriesReqType,
  type GetLocationCategoriesResType,
  type CreateLocationCategoryReqType,
  type DeleteLocationCategoryReqType,
  type DeleteLocationCategoryResType,
  type UpdateLocationCategoryReqType,
  type UpdateLocationCategoryResType,
  type GetLocationSubCategoriesReqType,
  type GetLocationSubCategoriesResType,
  type CreateLocationSubCategoryReqType,
  type CreateLocationSubCategoryResType,
  type UpdateLocationSubCategoryReqType,
  type UpdateLocationSubCategoryResType,
  type DeleteLocationSubCategoryReqType,
  type DeleteLocationSubCategoryResType,
} from "../types";

export const locationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get location categories
     */
    getLocationCategories: build.query<
      GetLocationCategoriesResType,
      GetLocationCategoriesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/locations/categories",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "locations-categories", ...params },
      ],
    }),
    /**
     * create location category
     */
    createLocationCategory: build.mutation<
      CreateLocationCategoryResType,
      CreateLocationCategoryReqType
    >({
      query: ({ data }) => ({
        url: "/locations/categories",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * update location category
     */
    updateLocationCategory: build.mutation<
      UpdateLocationCategoryResType,
      UpdateLocationCategoryReqType
    >({
      query: ({ data, id }) => ({
        url: `/locations/categories/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * delete location category
     */
    deleteLocationCategory: build.mutation<
      DeleteLocationCategoryResType,
      DeleteLocationCategoryReqType
    >({
      query: ({ id }) => ({
        url: `/locations/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * get location subcategories
     */
    getLocationSubCategories: build.query<
      GetLocationSubCategoriesResType,
      GetLocationSubCategoriesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT, id }) => ({
        url: `/locations/categories/${id}`,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * create location subcategory
     */
    createLocationSubCategory: build.mutation<
      CreateLocationSubCategoryResType,
      CreateLocationSubCategoryReqType
    >({
      query: ({ data }) => ({
        url: "/locations/subcategories",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * update location subcategory
     */
    updateLocationSubCategory: build.mutation<
      UpdateLocationSubCategoryResType,
      UpdateLocationSubCategoryReqType
    >({
      query: ({ data, id }) => ({
        url: `/locations/subcategories/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),

    /**
     * delete location category
     */
    deleteLocationSubCategory: build.mutation<
      DeleteLocationSubCategoryResType,
      DeleteLocationSubCategoryReqType
    >({
      query: ({ id }) => ({
        url: `/locations/subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "locations-categories", ...params },
      ],
    }),
  }),
});

export const {
  // categories
  useGetLocationCategoriesQuery,
  useCreateLocationCategoryMutation,
  useDeleteLocationCategoryMutation,
  useUpdateLocationCategoryMutation,
  // subcategories
  useGetLocationSubCategoriesQuery,
  useCreateLocationSubCategoryMutation,
  useDeleteLocationSubCategoryMutation,
  useUpdateLocationSubCategoryMutation,
} = locationsApi;
