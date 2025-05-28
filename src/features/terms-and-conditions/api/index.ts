import { baseApi } from "@/store/api";
import {
  type GetTermsAndConditionsContentReqType,
  type GetTermsAndConditionsContentResType,
  type PatchTermsAndConditionsContentReqType,
  type PatchTermsAndConditionsContentResType,
} from "../types";

export const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTermsAndConditionsContent: build.query<
      GetTermsAndConditionsContentResType,
      GetTermsAndConditionsContentReqType
    >({
      query: () => ({ url: "terms-and-conditions", method: "GET" }),
      providesTags: [{ type: "terms-and-conditions" }],
    }),

    patchTermsAndConditionsContent: build.mutation<
      PatchTermsAndConditionsContentResType,
      PatchTermsAndConditionsContentReqType
    >({
      query: (data) => ({ url: "terms-and-conditions", method: "PATCH", data }),
      invalidatesTags: [{ type: "terms-and-conditions" }],
    }),
  }),
});

export const {
  useGetTermsAndConditionsContentQuery,
  usePatchTermsAndConditionsContentMutation,
} = termsAndConditionsApi;
