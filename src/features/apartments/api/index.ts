import { baseApi } from "@/store/api";
import {
  CreateApartmentReqType,
  CreateApartmentResType,
  GetApartmentsReqType,
  GetApartmentsResType,
  UploadApartmentMediaReqType,
  UploadApartmentMediaResType,
  DeleteApartmentReqType,
  DeleteApartmentResType,
  UpdateApartmentReqType,
  UpdateApartmentResType,
  Apartment,
} from "../types/index.d";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const apartmentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createApartment: build.mutation<
      CreateApartmentResType,
      CreateApartmentReqType
    >({
      query: (data) => ({
        url: "apartments",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "apartments" }],
    }),

    updateApartment: build.mutation<
      UpdateApartmentResType,
      UpdateApartmentReqType
    >({
      query: ({ id, data }) => ({
        url: `apartments/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "apartments" }],
    }),

    uploadApartmentMedia: build.mutation<
      UploadApartmentMediaResType,
      UploadApartmentMediaReqType
    >({
      query: ({ id, data }) => ({
        url: `apartments/${id}/upload-media`,
        method: "PATCH",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: [{ type: "apartments" }],
    }),

    removeApartmentMedia: build.mutation<
      { message: string },
      { id: string; media_id: string }
    >({
      query: ({ id, media_id }) => ({
        url: `apartments/${id}/remove-media/${media_id}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "apartments" }],
    }),

    deleteApartment: build.mutation<
      DeleteApartmentResType,
      DeleteApartmentReqType
    >({
      query: ({ id }) => ({
        url: `apartments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "apartments" }],
    }),

    getApartment: build.query<Apartment, string>({
      query: (id) => ({
        url: `apartments/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "apartments", id }],
    }),

    getApartments: build.query<GetApartmentsResType, GetApartmentsReqType>({
      query: ({ page, limit = DEFAULT_PAGINATION_LIMIT, search }) => ({
        url: "apartments/admin",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "apartments", ...params }],
      transformResponse: (value: GetApartmentsResType) => {
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
  useCreateApartmentMutation,
  useUpdateApartmentMutation,
  useUploadApartmentMediaMutation,
  useRemoveApartmentMediaMutation,
  useGetApartmentsQuery,
  useGetApartmentQuery,
  useDeleteApartmentMutation,
} = apartmentsApi;
