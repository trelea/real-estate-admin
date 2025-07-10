import { Profile, User } from "@/features/auth/types";
import { PaginationMeta, UrlQueriesType } from "@/types";
import { unknown } from "zod";

export type GetUsersResType = {
  data?: (User & { posts?: number })[];
  meta: PaginationMeta;
};
export type GetUsersReqType = UrlQueriesType;

export type CreateUserResType = unknown;
export type CreateUserReqType = {
  data: FormData;
  params?: GetUsersReqType;
};

export type DeleteUserResType = unknown;
export type DeleteUserReqType = {
  id: string;
  params?: GetUsersReqType;
};

export type UpdateUserResType = unknown;
export type UpdateUserReqType = {
  id: string;
  user?: Partial<{
    name: string;
    surname: string;
    email: string;
  }>;
  thumbnail?: FormData;
  params?: GetUsersReqType;
};

export type GetUsersCarouselResType = {
  data: { id: string; priority: number; user: User }[];
};

export type CreateUserCarouselReqType = {
  user: string;
  priority?: number;
};

export type UpdateUserCarouselReqType = {
  id: string;
  priority?: number;
};

export type DeleteUserCarouselReqType = {
  id: string;
};
