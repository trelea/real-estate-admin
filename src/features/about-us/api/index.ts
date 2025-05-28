import { baseApi } from "@/store/api";
import {
  GetAboutUsContentReqType,
  GetAboutUsContentResType,
  PatchAboutUsContentReqType,
  PatchAboutUsContentResType,
} from "../types";

export const aboutUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAboutUsContent: build.query<
      GetAboutUsContentResType,
      GetAboutUsContentReqType
    >({
      query: () => ({ url: "about-us", method: "GET" }),
      providesTags: [{ type: "about-us" }],
    }),

    patchAboutUsContent: build.mutation<
      PatchAboutUsContentResType,
      PatchAboutUsContentReqType
    >({
      query: (data) => ({ url: "about-us", method: "PATCH", data }),
      invalidatesTags: [{ type: "about-us" }],
    }),
  }),
});

export const { useGetAboutUsContentQuery, usePatchAboutUsContentMutation } =
  aboutUsApi;
