import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateCommercialDestinationReqType,
  type CreateCommercialDestinationResType,
  type DeleteCommercialDestinationReqType,
  type DeleteCommercialDestinationResType,
  type GetCommercialDestinationsReqType,
  type GetCommercialDestinationsResType,
  type UpdateCommercialDestinationReqType,
  type UpdateCommercialDestinationResType,
} from "../types";

export const commercialDestinationsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get commercial destinations
     */
    getCommercialDestinations: build.query<
      GetCommercialDestinationsResType,
      GetCommercialDestinationsReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/commercials/destinations",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "commercials-destinations", ...params },
      ],
    }),

    /**
     * create commercial destination
     */
    createCommercialDestination: build.mutation<
      CreateCommercialDestinationResType,
      CreateCommercialDestinationReqType
    >({
      query: ({ data }) => ({
        url: "/commercials/destinations",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-destinations", ...params },
      ],
    }),

    /**
     * update commercial destination
     */
    updateCommercialDestination: build.mutation<
      UpdateCommercialDestinationResType,
      UpdateCommercialDestinationReqType
    >({
      query: ({ id, data }) => ({
        url: `/commercials/destinations/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-destinations", ...params },
      ],
    }),

    /**
     * delete commercial destination
     */
    deleteCommercialDestination: build.mutation<
      DeleteCommercialDestinationResType,
      DeleteCommercialDestinationReqType
    >({
      query: ({ id }) => ({
        url: `/commercials/destinations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "commercials-destinations", ...params },
      ],
    }),
  }),
});

export const {
  useGetCommercialDestinationsQuery,
  useCreateCommercialDestinationMutation,
  useUpdateCommercialDestinationMutation,
  useDeleteCommercialDestinationMutation,
} = commercialDestinationsApi;
