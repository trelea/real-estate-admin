import { baseApi } from "@/store/api";
import {
  CreateBlogReqType,
  CreateBlogResType,
  DeleteBlogReqType,
  DeleteBlogResType,
  GetBlogsReqType,
  GetBlogsResType,
  RemoveBlogThumbReqType,
  RemoveBlogThumbResType,
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
      query: ({ id, blog: data, thumbnail }) => ({
        url: `/blogs/${id}`,
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
      invalidatesTags: (_, __, { params }) => [{ type: "blogs", ...params }],
    }),

    /**
     * remove thumbnail
     */
    removeBlogThumb: build.mutation<
      RemoveBlogThumbResType,
      RemoveBlogThumbReqType
    >({
      query: ({ id }) => ({
        url: `/blogs/${id}/rm-thumb`,
        method: "DELETE",
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
  useRemoveBlogThumbMutation,
} = blogsApi;
