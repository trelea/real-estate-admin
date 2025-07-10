import { baseApi } from "@/store/api";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";
import {
  type CreateConditionReqType,
  type CreateConditionResType,
  type DeleteConditionReqType,
  type DeleteConditionResType,
  type GetConditionReqType,
  type GetConditionResType,
  type UpdateConditionReqType,
  type UpdateConditionResType,
} from "../types";

export const conditionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get conditions
     */
    getConditions: build.query<GetConditionResType, GetConditionReqType>({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/housing-conditions",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [
        { type: "housing-conditions", ...params },
      ],
    }),

    /**
     * create condition
     */
    createCondition: build.mutation<
      CreateConditionResType,
      CreateConditionReqType
    >({
      query: ({ data }) => ({
        url: "/housing-conditions",
        method: "POST",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-conditions", ...params },
      ],
    }),

    /**
     * update condition
     */
    updateCondition: build.mutation<
      UpdateConditionResType,
      UpdateConditionReqType
    >({
      query: ({ data, id }) => ({
        url: `/housing-conditions/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-conditions", ...params },
      ],
    }),

    /**
     * delete condition
     */
    deleteCondition: build.mutation<
      DeleteConditionResType,
      DeleteConditionReqType
    >({
      query: ({ id }) => ({
        url: `/housing-conditions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [
        { type: "housing-conditions", ...params },
      ],
    }),
  }),
});

export const {
  useCreateConditionMutation,
  useDeleteConditionMutation,
  useGetConditionsQuery,
  useUpdateConditionMutation,
} = conditionsApi;
