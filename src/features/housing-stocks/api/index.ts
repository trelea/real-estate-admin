import { baseApi } from "@/store/api";
import {
  DeleteHousingStockReqType,
  DeleteHousingStockResType,
  type CreateHousingStockReqType,
  type CreateHousingStockResType,
  type GetHousingStocksReqType,
  type GetHousingStocksResType,
  type UpdateHousingStockReqType,
  type UpdateHousingStockResType,
} from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const housingStocksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get stocks
     */
    getHousingStocks: build.query<
      GetHousingStocksResType,
      GetHousingStocksReqType
    >({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/housing-stocks",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "housing-stocks", ...params }],
    }),

    /**
     * create housing stock
     */
    createHousingStock: build.mutation<
      CreateHousingStockResType,
      CreateHousingStockReqType
    >({
      query: ({ data }) => ({
        url: "/housing-stocks",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-stocks", ...params },
      ],
    }),

    /**
     * update housing stock
     */
    updateHousingStock: build.mutation<
      UpdateHousingStockResType,
      UpdateHousingStockReqType
    >({
      query: ({ data, id }) => ({
        url: `/housing-stocks/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-stocks", ...params },
      ],
    }),

    /**
     * delete housing stock
     */
    deleteHousingStock: build.mutation<
      DeleteHousingStockResType,
      DeleteHousingStockReqType
    >({
      query: ({ id }) => ({
        url: `/housing-stocks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-stocks", ...params },
      ],
    }),
  }),
});

export const {
  useCreateHousingStockMutation,
  useDeleteHousingStockMutation,
  useGetHousingStocksQuery,
  useUpdateHousingStockMutation,
} = housingStocksApi;
