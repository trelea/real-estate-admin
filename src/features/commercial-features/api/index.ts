import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateCommercialFeatureReqType,
  type CreateCommercialFeatureResType,
  type DeleteCommercialFeatureReqType,
  type DeleteCommercialFeatureResType,
  type GetCommercialFeaturesReqType,
  type GetCommercialFeaturesResType,
  type UpdateCommercialFeatureReqType,
  type UpdateCommercialFeatureResType,
} from "../types";

export const commercialFeaturesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get commercial features
     */
    getCommercialFeatures: build.query<
      GetCommercialFeaturesResType,
      GetCommercialFeaturesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/commercials/features",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "commercials-features", ...params },
      ],
    }),

    /**
     * create commercial feature
     */
    createCommercialFeature: build.mutation<
      CreateCommercialFeatureResType,
      CreateCommercialFeatureReqType
    >({
      query: ({ data }) => ({
        url: "/commercials/features",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-features", ...params },
      ],
    }),

    /**
     * update commercial feature
     */
    updateCommercialFeature: build.mutation<
      UpdateCommercialFeatureResType,
      UpdateCommercialFeatureReqType
    >({
      query: ({ id, data }) => ({
        url: `/commercials/features/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-features", ...params },
      ],
    }),

    /**
     * delete commercial feature
     */
    deleteCommercialFeature: build.mutation<
      DeleteCommercialFeatureResType,
      DeleteCommercialFeatureReqType
    >({
      query: ({ id }) => ({
        url: `/commercials/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-features", ...params },
      ],
    }),
  }),
});

export const {
  useGetCommercialFeaturesQuery,
  useCreateCommercialFeatureMutation,
  useUpdateCommercialFeatureMutation,
  useDeleteCommercialFeatureMutation,
} = commercialFeaturesApi;
