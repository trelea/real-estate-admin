import { baseApi } from "@/store/api";
import { SigninReqType, SigninResType } from "../types";

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
  }),
});

export const { useSigninMutation } = authApi;
