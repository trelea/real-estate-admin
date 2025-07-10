import { baseApi } from "@/store/api";
import {
  SigninReqType,
  SigninResType,
  SignoutReqType,
  SignoutResType,
  StatusReqType,
  StatusResType,
} from "../types";

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
      invalidatesTags: [{ type: "status" }],
    }),
    /**
     * signout
     */
    signout: build.mutation<SignoutResType, SignoutReqType>({
      query: (data) => ({
        url: "/auth/signout",
        method: "POST",
        data,
      }),
      invalidatesTags: [{ type: "status" }],
    }),

    /**
     * status
     */
    status: build.query<StatusResType, StatusReqType>({
      query: () => ({
        url: "/auth/status",
        method: "GET",
      }),
      providesTags: [{ type: "status" }],
    }),
  }),
});

export const { useSigninMutation, useStatusQuery, useSignoutMutation } =
  authApi;
