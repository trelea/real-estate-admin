import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateGarageFeatureReqType,
  type CreateGarageFeatureResType,
  type DeleteGarageFeatureReqType,
  type DeleteGarageFeatureResType,
  type GetGarageFeaturesReqType,
  type GetGarageFeaturesResType,
  type UpdateGarageFeatureReqType,
  type UpdateGarageFeatureResType,
} from "../types";

export const garageFeaturesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get garage features
     */
    getGarageFeatures: build.query<
      GetGarageFeaturesResType,
      GetGarageFeaturesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/garages/features",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "garages-features", ...params },
      ],
    }),

    /**
     * create garage feature
     */
    createGarageFeature: build.mutation<
      CreateGarageFeatureResType,
      CreateGarageFeatureReqType
    >({
      query: ({ data }) => ({
        url: "/garages/features",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "garages-features", ...params },
      ],
    }),

    /**
     * update garage feature
     */
    updateGarageFeature: build.mutation<
      UpdateGarageFeatureResType,
      UpdateGarageFeatureReqType
    >({
      query: ({ id, data }) => ({
        url: `/garages/features/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "garages-features", ...params },
      ],
    }),

    /**
     * delete garage feature
     */
    deleteGarageFeature: build.mutation<
      DeleteGarageFeatureResType,
      DeleteGarageFeatureReqType
    >({
      query: ({ id }) => ({
        url: `/garages/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "garages-features", ...params },
      ],
    }),
  }),
});

export const {
  useGetGarageFeaturesQuery,
  useCreateGarageFeatureMutation,
  useUpdateGarageFeatureMutation,
  useDeleteGarageFeatureMutation,
} = garageFeaturesApi;
