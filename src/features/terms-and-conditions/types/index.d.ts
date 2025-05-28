import {
  type AboutUsType,
  type GetAboutUsContentReqType,
  type PatchAboutUsContentReqType,
  type PatchAboutUsContentResType,
} from "@/features/about-us/types";

export type TermsAndConditionsType = AboutUsType;

export type GetTermsAndConditionsContentResType = TermsAndConditionsType;
export type GetTermsAndConditionsContentReqType = GetAboutUsContentReqType;

export type PatchTermsAndConditionsContentResType = PatchAboutUsContentResType;
export type PatchTermsAndConditionsContentReqType = PatchAboutUsContentReqType;
