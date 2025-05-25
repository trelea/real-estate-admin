import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateTerrainFeatureReqType,
  type CreateTerrainFeatureResType,
  type DeleteTerrainFeatureReqType,
  type DeleteTerrainFeatureResType,
  type GetTerrainFeaturesReqType,
  type GetTerrainFeaturesResType,
  type UpdateTerrainFeatureReqType,
  type UpdateTerrainFeatureResType,
} from "../types";

export const terrainFeaturesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get terrain features
     */
    getTerrainFeatures: build.query<
      GetTerrainFeaturesResType,
      GetTerrainFeaturesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/terrains/features",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "terrains-features", ...params },
      ],
    }),

    /**
     * create terrain feature
     */
    createTerrainFeature: build.mutation<
      CreateTerrainFeatureResType,
      CreateTerrainFeatureReqType
    >({
      query: ({ data }) => ({
        url: "/terrains/features",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-features", ...params },
      ],
    }),

    /**
     * update terrain feature
     */
    updateTerrainFeature: build.mutation<
      UpdateTerrainFeatureResType,
      UpdateTerrainFeatureReqType
    >({
      query: ({ id, data }) => ({
        url: `/terrains/features/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-features", ...params },
      ],
    }),

    /**
     * delete terrain feature
     */
    deleteTerrainFeature: build.mutation<
      DeleteTerrainFeatureResType,
      DeleteTerrainFeatureReqType
    >({
      query: ({ id }) => ({
        url: `/terrains/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-features", ...params },
      ],
    }),
  }),
});

export const {
  useGetTerrainFeaturesQuery,
  useCreateTerrainFeatureMutation,
  useUpdateTerrainFeatureMutation,
  useDeleteTerrainFeatureMutation,
} = terrainFeaturesApi;
