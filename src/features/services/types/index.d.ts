import {
  type RemoveBlogThumbReqType,
  type RemoveBlogThumbResType,
  type UpdateBlogReqType,
  type UpdateBlogResType,
  type CreateBlogReqType,
  type CreateBlogResType,
  type DeleteBlogReqType,
  type DeleteBlogResType,
  type GetBlogsReqType,
  type GetBlogsResType,
  Blog,
  BlogStatus,
} from "@/features/blogs/types";

export type ServiceStatus = BlogStatus;

export type Service = Blog;

export type GetServicesResType = GetBlogsResType;
export type GetServicesReqType = GetBlogsReqType;

export type CreateServiceResType = CreateBlogResType;
export type CreateServiceReqType = CreateBlogReqType;

export type DeleteServiceResType = DeleteBlogResType;
export type DeleteServiceReqType = DeleteBlogReqType;

export type UpdateServiceResType = UpdateBlogResType;
export type UpdateServiceReqType = UpdateBlogReqType;

export type RemoveServiceThumbResType = RemoveBlogThumbResType;
export type RemoveServiceThumbReqType = RemoveBlogThumbReqType;
