import { baseApi } from "@/store/api";
import {
  CreateBlogReqType,
  CreateBlogResType,
  DeleteBlogReqType,
  DeleteBlogResType,
  GetBlogsReqType,
  GetBlogsResType,
  UpdateBlogReqType,
  UpdateBlogResType,
} from "../types";
import { DEFAULT_PAGINATION_LIMIT } from "@/consts";

export const blogsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * get blogs
     */
    getBlogs: build.query<GetBlogsResType, GetBlogsReqType>({
      query: ({ page, search, limit = DEFAULT_PAGINATION_LIMIT }) => ({
        url: "/blogs",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: (_, __, params) => [{ type: "blogs", ...params }],
    }),
    /**
     * create blog
     */
    createBlog: build.mutation<CreateBlogResType, CreateBlogReqType>({
      query: ({ data }) => ({
        url: "/blogs",
        method: "POST",
        data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "blogs", ...params }],
    }),

    /**
     * delete blog
     */
    deleteBlog: build.mutation<DeleteBlogResType, DeleteBlogReqType>({
      query: ({ id }) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "blogs", ...params }],
    }),

    /**
     * update blog
     */
    updateBlog: build.mutation<UpdateBlogResType, UpdateBlogReqType>({
      query: ({ id, blog: data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_, __, { params }) => [{ type: "blogs", ...params }],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetBlogsQuery,
  useUpdateBlogMutation,
} = blogsApi;
