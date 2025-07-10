import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateTerrainUsabilityReqType,
  type CreateTerrainUsabilityResType,
  type DeleteTerrainUsabilityReqType,
  type DeleteTerrainUsabilityResType,
  type GetTerrainUsabilitiesReqType,
  type GetTerrainUsabilitiesResType,
  type UpdateTerrainUsabilityReqType,
  type UpdateTerrainUsabilityResType,
} from "../types";

export const terrainUsabilitiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get terrain usabilities
     */
    getTerrainUsabilities: build.query<
      GetTerrainUsabilitiesResType,
      GetTerrainUsabilitiesReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/terrains/usabilities",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "terrains-usabilities", ...params },
      ],
    }),

    /**
     * create terrain usability
     */
    createTerrainUsability: build.mutation<
      CreateTerrainUsabilityResType,
      CreateTerrainUsabilityReqType
    >({
      query: ({ data }) => ({
        url: "/terrains/usabilities",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-usabilities", ...params },
      ],
    }),

    /**
     * update terrain usability
     */
    updateTerrainUsability: build.mutation<
      UpdateTerrainUsabilityResType,
      UpdateTerrainUsabilityReqType
    >({
      query: ({ id, data }) => ({
        url: `/terrains/usabilities/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-usabilities", ...params },
      ],
    }),

    /**
     * delete terrain usability
     */
    deleteTerrainUsability: build.mutation<
      DeleteTerrainUsabilityResType,
      DeleteTerrainUsabilityReqType
    >({
      query: ({ id }) => ({
        url: `/terrains/usabilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "terrains-usabilities", ...params },
      ],
    }),
  }),
});

export const {
  useGetTerrainUsabilitiesQuery,
  useCreateTerrainUsabilityMutation,
  useUpdateTerrainUsabilityMutation,
  useDeleteTerrainUsabilityMutation,
} = terrainUsabilitiesApi;
