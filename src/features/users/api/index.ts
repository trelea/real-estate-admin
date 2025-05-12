import { baseApi } from "@/store/api";
import {
  CreateUserReqType,
  CreateUserResType,
  GetUsersReqType,
  GetUsersResType,
} from "../types";

export const DEFAULT_LIMIT = 10;

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get users
     */
    getUsers: build.query<GetUsersResType, GetUsersReqType>({
      query: ({ page, limit = DEFAULT_LIMIT }) => ({
        url: "/users",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: (_, __, params) => [{ type: "users", ...params }],
    }),

    /**
     * new user
     */
    createUser: build.mutation<CreateUserResType, CreateUserReqType>({
      query: ({ data }) => ({
        url: "/users",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "users", ...params }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
