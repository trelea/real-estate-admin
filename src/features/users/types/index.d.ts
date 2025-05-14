import { Profile, User } from "@/features/auth/types";
import { PaginationMeta } from "@/types";
import { unknown } from "zod";

export type GetUsersResType = {
  data?: (User & { posts?: number })[];
  meta: PaginationMeta;
};
export type GetUsersReqType = {
  page: number;
  limit?: number = 10;
  search: string;
};

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
