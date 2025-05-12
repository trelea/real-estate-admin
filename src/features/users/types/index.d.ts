import { Profile, User } from "@/features/auth/types";
import { unknown } from "zod";

export type GetUsersResType = {
  data?: (User & { posts?: number })[];
  meta: { page: number; limit: number; total: number; last_page: number };
};
export type GetUsersReqType = { page: number; limit?: number = 10 };

export type CreateUserResType = unknown;
export type CreateUserReqType = {
  data: FormData;
  params: GetUsersReqType;
};
