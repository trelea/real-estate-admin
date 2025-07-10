import { baseApi } from "@/store/api";
import {
  Commercial,
  CommercialResponse,
  CommercialQueriesType,
} from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const commercialsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCommercials: build.query<CommercialResponse, CommercialQueriesType>({
      query: ({ page, limit = DEFAULT_PAGINATION_LIMIT, search }) => ({
        url: "commercials/admin",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "commercials", ...params }],
      transformResponse: (value: CommercialResponse) => {
        value.meta.page = parseInt(
          typeof value.meta.page === "string"
            ? value.meta.page
            : value.meta.page.toString()
        );
        return value;
      },
    }),

    getCommercial: build.query<Commercial, string>({
      query: (id) => ({
        url: `commercials/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "commercials", id }],
    }),

    createCommercial: build.mutation<Commercial, FormData>({
      query: (data) => ({
        url: "commercials",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "commercials" }],
    }),

    updateCommercial: build.mutation<
      Commercial,
      { id: string; data: Record<string, any> }
    >({
      query: ({ id, data }) => ({
        url: `commercials/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "commercials" }],
    }),

    uploadCommercialMedia: build.mutation<
      { message: string },
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `commercials/${id}/upload-media`,
        method: "PATCH",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [{ type: "commercials" }],
    }),

    removeCommercialMedia: build.mutation<
      { message: string },
      { id: number; media_id: string }
    >({
      query: ({ id, media_id }) => ({
        url: `commercials/${id}/remove-media/${media_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "commercials" }],
    }),

    deleteCommercial: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `commercials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "commercials" }],
    }),
  }),
});

export const {
  useGetCommercialsQuery,
  useGetCommercialQuery,
  useCreateCommercialMutation,
  useUpdateCommercialMutation,
  useUploadCommercialMediaMutation,
  useRemoveCommercialMediaMutation,
  useDeleteCommercialMutation,
} = commercialsApi;
