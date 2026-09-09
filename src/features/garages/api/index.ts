import { baseApi } from "@/store/api";
import { Garage, GarageResponse, GarageQueriesType } from "../types";

export const garagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGarages: build.query<GarageResponse, GarageQueriesType>({
      query: ({ page, limit, search }) => ({
        url: "garages/admin",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "garages", ...params }],
    }),

    getGarage: build.query<Garage, number>({
      query: (id) => ({
        url: `garages/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "garages", id }],
    }),

    createGarage: build.mutation<Garage, Record<string, any>>({
      query: (data) => ({
        url: "garages",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "garages" }],
    }),

    updateGarage: build.mutation<
      Garage,
      { id: number; data: Record<string, any> }
    >({
      query: ({ id, data }) => ({
        url: `garages/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "garages" }],
    }),

    uploadGarageMedia: build.mutation<
      { message: string },
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `garages/${id}/upload-media`,
        method: "PATCH",
        data,
        headers: { "Content-Type": "multipart/form-data" },
      }),
      invalidatesTags: [{ type: "garages" }],
    }),

    removeGarageMedia: build.mutation<
      { message: string },
      { id: number; media_id: string }
    >({
      query: ({ id, media_id }) => ({
        url: `garages/${id}/remove-media/${media_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "garages" }],
    }),

    deleteGarage: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `garages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "garages" }],
    }),
  }),
});

export const {
  useGetGaragesQuery,
  useGetGarageQuery,
  useCreateGarageMutation,
  useUpdateGarageMutation,
  useUploadGarageMediaMutation,
  useRemoveGarageMediaMutation,
  useDeleteGarageMutation,
} = garagesApi;
