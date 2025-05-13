import { baseApi } from "@/store/api";
import {
  CreateUserReqType,
  CreateUserResType,
  DeleteUserReqType,
  DeleteUserResType,
  GetUsersReqType,
  GetUsersResType,
} from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get users
     */
    getUsers: build.query<GetUsersResType, GetUsersReqType>({
      query: ({ page, limit = DEFAULT_PAGINATION_LIMIT }) => ({
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

    /**
     * delete user
     */
    deleteUser: build.mutation<DeleteUserResType, DeleteUserReqType>({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "users", ...params }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = usersApi;
