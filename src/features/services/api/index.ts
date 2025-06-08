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
  type GetServicesOnLandingReqType,
  type GetServicesOnLandingResType,
  type PatchServiceOnLandingResType,
  type PatchServiceOnLandingReqType,
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

    /**
     * get services on landing
     */
    getServicesOnLanding: build.query<
      GetServicesOnLandingResType,
      GetServicesOnLandingReqType
    >({
      query: () => ({
        url: "/services/landing",
        method: "GET",
      }),
      providesTags: [{ type: "services-landing" }],
    }),

    /**
     * patch service landing
     */
    patchServiceOnLanding: build.mutation<
      PatchServiceOnLandingResType,
      PatchServiceOnLandingReqType
    >({
      query: ({ id, data }) => ({
        url: `/services/landing/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [{ type: "services-landing" }],
    }),

    /**
     * remove service from landing
     */
    removeServiceFromLanding: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/services/landing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "services-landing" }],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useGetServicesQuery,
  useRemoveServiceThumbMutation,
  useUpdateServiceMutation,
  useGetServicesOnLandingQuery,
  usePatchServiceOnLandingMutation,
  useRemoveServiceFromLandingMutation,
} = servicesApi;
