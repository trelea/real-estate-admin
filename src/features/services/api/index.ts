import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type DeleteServiceReqType,
  type DeleteServiceResType,
  type RemoveServiceThumbReqType,
  type RemoveServiceThumbResType,
  type UpdateServiceReqType,
  type UpdateServiceResType,
  type CreateServiceReqType,
  type CreateServiceResType,
  type GetServicesReqType,
  type GetServicesResType,
} from "../types";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get services
     */
    getServices: build.query<GetServicesResType, GetServicesReqType>({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/services",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "services", ...params }],
    }),
    /**
     * create services
     */
    createService: build.mutation<CreateServiceResType, CreateServiceReqType>({
      query: ({ data }) => ({
        url: "/services",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "services", ...params }],
    }),

    /**
     * delete services
     */
    deleteService: build.mutation<DeleteServiceResType, DeleteServiceReqType>({
      query: ({ id }) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "services", ...params }],
    }),

    /**
     * update services
     */
    updateService: build.mutation<UpdateServiceResType, UpdateServiceReqType>({
      query: ({ id, blog: data, thumbnail }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        data: (() => {
          return thumbnail ? thumbnail : data;
        })(),
        headers: {
          "Content-Type": thumbnail
            ? "multipart/form-data"
            : "application/json",
        },
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "services", ...params }],
    }),

    /**
     * remove thumbnail
     */
    removeServiceThumb: build.mutation<
      RemoveServiceThumbResType,
      RemoveServiceThumbReqType
    >({
      query: ({ id }) => ({
        url: `/services/${id}/rm-thumb`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "services", ...params }],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useRemoveServiceThumbMutation,
  useUpdateServiceMutation,
} = servicesApi;
