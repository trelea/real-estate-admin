import {
  type AboutUsType,
  type GetAboutUsContentReqType,
  type PatchAboutUsContentReqType,
  type PatchAboutUsContentResType,
} from "@/features/about-us/types";

export type PrivacyPolicyType = AboutUsType;

export type GetPrivacyPolicyContentResType = PrivacyPolicyType;
export type GetPrivacyPolicyContentReqType = GetAboutUsContentReqType;

export type PatchPrivacyPolicyContentResType = PatchAboutUsContentResType;
export type PatchPrivacyPolicyContentReqType = PatchAboutUsContentReqType;
