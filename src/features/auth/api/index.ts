import { baseApi } from "@/store/api";
import { SigninReqType, SigninResType, StatusResType } from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /**
     * login
     */
    signin: build.mutation<SigninResType, SigninReqType>({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        data,
      }),
    }),

    /**
     * status
     */
    status: build.query<StatusResType, StatusResType>({
      query: () => ({
        url: "/auth/status",
        method: "GET",
      }),
    }),
  }),
});

export const { useSigninMutation, useStatusQuery } = authApi;
