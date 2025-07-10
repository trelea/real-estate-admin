import { baseApi } from "@/store/api";
import { Terrain, TerrainResponse, TerrainQueriesType } from "../types";

export const terrainsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTerrains: build.query<TerrainResponse, TerrainQueriesType>({
      query: ({ page, limit, search }) => ({
        url: "terrains/admin",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "terrains", ...params }],
    }),

    getTerrain: build.query<Terrain, number>({
      query: (id) => ({
        url: `terrains/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "terrains", id }],
    }),

    createTerrain: build.mutation<Terrain, Record<string, any>>({
      query: (data) => ({
        url: "terrains",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "terrains" }],
    }),

    updateTerrain: build.mutation<
      Terrain,
      { id: number; data: Record<string, any> }
    >({
      query: ({ id, data }) => ({
        url: `terrains/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "terrains" }],
    }),

    uploadTerrainMedia: build.mutation<
      { message: string },
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `terrains/${id}/upload-media`,
        method: "PATCH",
        data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: [{ type: "terrains" }],
    }),

    removeTerrainMedia: build.mutation<
      { message: string },
      { id: number; media_id: string }
    >({
      query: ({ id, media_id }) => ({
        url: `terrains/${id}/remove-media/${media_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "terrains" }],
    }),

    deleteTerrain: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `terrains/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "terrains" }],
    }),
  }),
});

export const {
  useGetTerrainsQuery,
  useGetTerrainQuery,
  useCreateTerrainMutation,
  useUpdateTerrainMutation,
  useUploadTerrainMediaMutation,
  useRemoveTerrainMediaMutation,
  useDeleteTerrainMutation,
} = terrainsApi;
