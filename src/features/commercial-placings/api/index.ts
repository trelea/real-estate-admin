import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateCommercialPlacingReqType,
  type CreateCommercialPlacingResType,
  type DeleteCommercialPlacingReqType,
  type DeleteCommercialPlacingResType,
  type GetCommercialPlacingsReqType,
  type GetCommercialPlacingsResType,
  type UpdateCommercialPlacingReqType,
  type UpdateCommercialPlacingResType,
} from "../types";

export const commercialPlacingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get commercial placings
     */
    getCommercialPlacings: build.query<
      GetCommercialPlacingsResType,
      GetCommercialPlacingsReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/commercials/placings",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "commercials-placings", ...params },
      ],
    }),

    /**
     * create commercial placing
     */
    createCommercialPlacing: build.mutation<
      CreateCommercialPlacingResType,
      CreateCommercialPlacingReqType
    >({
      query: ({ data }) => ({
        url: "/commercials/placings",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-placings", ...params },
      ],
    }),

    /**
     * update commercial placing
     */
    updateCommercialPlacing: build.mutation<
      UpdateCommercialPlacingResType,
      UpdateCommercialPlacingReqType
    >({
      query: ({ id, data }) => ({
        url: `/commercials/placings/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-placings", ...params },
      ],
    }),

    /**
     * delete commercial placing
     */
    deleteCommercialPlacing: build.mutation<
      DeleteCommercialPlacingResType,
      DeleteCommercialPlacingReqType
    >({
      query: ({ id }) => ({
        url: `/commercials/placings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-placings", ...params },
      ],
    }),
  }),
});

export const {
  useGetCommercialPlacingsQuery,
  useCreateCommercialPlacingMutation,
  useUpdateCommercialPlacingMutation,
  useDeleteCommercialPlacingMutation,
} = commercialPlacingsApi;
