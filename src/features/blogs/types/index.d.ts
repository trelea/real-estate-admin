import { PaginationMeta, UrlQueriesType } from "@/types";

export type BlogStatus = "PUBLIC" | "PRIVATE" | (string & {});

export type Blog = {
  id: string;
  created_at: string;
  updated_at: string;
  thumbnail: string;
  status: BlogStatus;
  views: number;
  content: Content;
};

export type Content = {
  id: string;
  created_at: string;
  updated_at: string;
  title_ro: string;
  title_ru: string;
  title_en: string;
  desc_ro: string;
  desc_ru: string;
  desc_en: string;
  content_ro: string;
  content_ru: string;
  content_en: string;
};

export type GetBlogsResType = {
  data?: Blog[];
  meta: PaginationMeta;
};
export type GetBlogsReqType = UrlQueriesType;

export type CreateBlogResType = unknown;
export type CreateBlogReqType = {
  data: FormData;
  params?: GetUsersReqType;
};

export type DeleteBlogResType = unknown;
export type DeleteBlogReqType = {
  id: string;
  params?: GetBlogsReqType;
};

export type RemoveBlogThumbResType = unknown;
export type RemoveBlogThumbReqType = DeleteBlogReqType;

export type UpdateBlogResType = unknown;
export type UpdateBlogReqType = {
  id: string;
  blog?: Partial<
    Omit<Content, "id" | "created_at" | "updated_at"> & Pick<Blog, "status">
  >;
  thumbnail?: FormData;
  params?: GetBlogsReqType;
  // invalidate?: boolean = true;
};
