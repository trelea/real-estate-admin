import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateHouseFeatureReqType,
  type CreateHouseFeatureResType,
  type DeleteHouseFeatureReqType,
  type DeleteHouseFeatureResType,
  type GetHouseFeaturesReqType,
  type GetHouseFeaturesResType,
  type UpdateHouseFeatureReqType,
  type UpdateHouseFeatureResType,
} from "../types";

export const housesFeaturesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get house features
     */
    getHouseFeatures: build.query<
      GetHouseFeaturesResType,
      GetHouseFeaturesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/houses/features",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "houses-features", ...params }],
    }),

    /**
     * create house feature
     */
    createHouseFeature: build.mutation<
      CreateHouseFeatureResType,
      CreateHouseFeatureReqType
    >({
      query: ({ data }) => ({
        url: "/houses/features",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "houses-features", ...params },
      ],
    }),

    /**
     * update house feature
     */
    updateHouseFeature: build.mutation<
      UpdateHouseFeatureResType,
      UpdateHouseFeatureReqType
    >({
      query: ({ id, data }) => ({
        url: `/houses/features/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "houses-features", ...params },
      ],
    }),

    /**
     * delete house feature
     */
    deleteHouseFeature: build.mutation<
      DeleteHouseFeatureResType,
      DeleteHouseFeatureReqType
    >({
      query: ({ id }) => ({
        url: `/houses/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "houses-features", ...params },
      ],
    }),
  }),
});

export const {
  useGetHouseFeaturesQuery,
  useCreateHouseFeatureMutation,
  useUpdateHouseFeatureMutation,
  useDeleteHouseFeatureMutation,
} = housesFeaturesApi;
