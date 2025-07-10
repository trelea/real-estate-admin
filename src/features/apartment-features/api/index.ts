import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateApartmentFeatureReqType,
  type CreateApartmentFeatureResType,
  type DeleteApartmentFeatureReqType,
  type DeleteApartmentFeatureResType,
  type GetApartmentFeaturesReqType,
  type GetApartmentFeaturesResType,
  type UpdateApartmentFeatureReqType,
  type UpdateApartmentFeatureResType,
} from "../types";

export const apartmentsFeaturesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get apartment features
     */
    getApartmentFeatures: build.query<
      GetApartmentFeaturesResType,
      GetApartmentFeaturesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/apartments/features",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "apartments-features", ...params },
      ],
    }),

    /**
     * create apartment feature
     */
    createApartmentFeature: build.mutation<
      CreateApartmentFeatureResType,
      CreateApartmentFeatureReqType
    >({
      query: ({ data }) => ({
        url: "/apartments/features",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "apartments-features", ...params },
      ],
    }),

    /**
     * update apartment feature
     */
    updateApartmentFeature: build.mutation<
      UpdateApartmentFeatureResType,
      UpdateApartmentFeatureReqType
    >({
      query: ({ id, data }) => ({
        url: `/apartments/features/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "apartments-features", ...params },
      ],
    }),

    /**
     * delete apartment feature
     */
    deleteApartmentFeature: build.mutation<
      DeleteApartmentFeatureResType,
      DeleteApartmentFeatureReqType
    >({
      query: ({ id }) => ({
        url: `/apartments/features/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "apartments-features", ...params },
      ],
    }),
  }),
});

export const {
  useGetApartmentFeaturesQuery,
  useCreateApartmentFeatureMutation,
  useUpdateApartmentFeatureMutation,
  useDeleteApartmentFeatureMutation,
} = apartmentsFeaturesApi;
