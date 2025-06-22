import { baseApi } from "@/store/api";
import {
  CreateHouseReqType,
  CreateHouseResType,
  GetHousesReqType,
  GetHousesResType,
  UploadHouseMediaReqType,
  UploadHouseMediaResType,
  DeleteHouseReqType,
  DeleteHouseResType,
  UpdateHouseReqType,
  UpdateHouseResType,
  House,
} from "../types/index.d";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const housesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHouse: build.mutation<CreateHouseResType, CreateHouseReqType>({
      query: (data) => ({
        url: "houses",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "houses" }],
    }),

    updateHouse: build.mutation<UpdateHouseResType, UpdateHouseReqType>({
      query: ({ id, data }) => ({
        url: `houses/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "houses" }],
    }),

    uploadHouseMedia: build.mutation<
      UploadHouseMediaResType,
      UploadHouseMediaReqType
    >({
      query: ({ id, data }) => ({
        url: `houses/${id}/upload-media`,
        method: "PATCH",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [{ type: "houses" }],
    }),

    removeHouseMedia: build.mutation<
      { message: string },
      { id: number; media_id: string }
    >({
      query: ({ id, media_id }) => ({
        url: `houses/${id}/remove-media/${media_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "houses" }],
    }),

    deleteHouse: build.mutation<DeleteHouseResType, DeleteHouseReqType>({
      query: ({ id }) => ({
        url: `houses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "houses" }],
    }),

    getHouse: build.query<House, number>({
      query: (id) => ({
        url: `houses/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "houses", id }],
    }),

    getHouses: build.query<GetHousesResType, GetHousesReqType>({
      query: ({ page, limit = DEFAULT_PAGINATION_LIMIT, search }) => ({
        url: "houses/admin",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "houses", ...params }],
      transformResponse: (value: GetHousesResType) => {
        value.meta.page = parseInt(
          typeof value.meta.page === "string"
            ? value.meta.page
            : value.meta.page.toString()
        );
        return value;
      },
    }),
  }),
});

export const {
  useCreateHouseMutation,
  useUpdateHouseMutation,
  useUploadHouseMediaMutation,
  useRemoveHouseMediaMutation,
  useGetHousesQuery,
  useGetHouseQuery,
  useDeleteHouseMutation,
} = housesApi;
