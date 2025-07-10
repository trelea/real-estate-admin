import { baseApi } from "@/store/api";
import {
  type CreateUserReqType,
  type CreateUserResType,
  type DeleteUserReqType,
  type DeleteUserResType,
  type GetUsersReqType,
  type GetUsersResType,
  type UpdateUserReqType,
  type UpdateUserResType,
  type CreateUserCarouselReqType,
  type DeleteUserCarouselReqType,
  type GetUsersCarouselResType,
  type UpdateUserCarouselReqType,
} from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get users
     */
    getUsers: build.query<GetUsersResType, GetUsersReqType>({
      query: ({ page, limit = DEFAULT_PAGINATION_LIMIT, search }) => ({
        url: "/users",
        method: "GET",
        params: { page, limit, search },
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
     * update user
     */
    updateUser: build.mutation<UpdateUserResType, UpdateUserReqType>({
      query: ({ user: data, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "users", ...params }],
    }),
    updateUserThumbnail: build.mutation<UpdateUserResType, UpdateUserReqType>({
      query: ({ thumbnail: data, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
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

    /**
     * carousel data
     */
    /**
     * GET carousel users
     */
    getUsersCarousel: build.query<GetUsersCarouselResType, void>({
      query: () => ({
        url: "/users-carousel",
        method: "GET",
      }),
      providesTags: ["users-carousel"],
    }),

    /**
     * Add user to carousel
     */
    createUserCarousel: build.mutation<unknown, CreateUserCarouselReqType>({
      query: (data) => ({
        url: "/users-carousel",
        method: "POST",
        data,
      }),
      invalidatesTags: ["users-carousel"],
    }),

    /**
     * Update carousel entry
     */
    updateUserCarousel: build.mutation<unknown, UpdateUserCarouselReqType>({
      query: ({ id, ...data }) => ({
        url: `/users-carousel/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["users-carousel"],
    }),

    /**
     * Remove user from carousel
     */
    deleteUserCarousel: build.mutation<unknown, DeleteUserCarouselReqType>({
      query: ({ id }) => ({
        url: `/users-carousel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users-carousel"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateUserThumbnailMutation,
  /**
   * users carousel
   */
  useGetUsersCarouselQuery,
  useCreateUserCarouselMutation,
  useUpdateUserCarouselMutation,
  useDeleteUserCarouselMutation,
} = usersApi;
