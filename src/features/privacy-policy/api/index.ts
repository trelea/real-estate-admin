import { baseApi } from "@/store/api";
import {
  type GetPrivacyPolicyContentReqType,
  type GetPrivacyPolicyContentResType,
  type PatchPrivacyPolicyContentReqType,
  type PatchPrivacyPolicyContentResType,
} from "../types";

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrivacyPolicyContent: build.query<
      GetPrivacyPolicyContentResType,
      GetPrivacyPolicyContentReqType
    >({
      query: () => ({ url: "privacy-policy", method: "GET" }),
      providesTags: [{ type: "privacy-policy" }],
    }),

    patchPrivacyPolicyContent: build.mutation<
      PatchPrivacyPolicyContentResType,
      PatchPrivacyPolicyContentReqType
    >({
      query: (data) => ({ url: "privacy-policy", method: "PATCH", data }),
      invalidatesTags: [{ type: "privacy-policy" }],
    }),
  }),
});

export const {
  useGetPrivacyPolicyContentQuery,
  usePatchPrivacyPolicyContentMutation,
} = privacyPolicyApi;
