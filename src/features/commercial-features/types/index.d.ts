import {
  type MultilingualItemType,
  type GetMultilingualItemsReqType,
  type GetMultilingualItemsResType,
  type CreateMultilingualItemReqType,
  type CreateMultilingualItemResType,
  type UpdateMultilingualItemReqType,
  type UpdateMultilingualItemResType,
  type DeleteMultilingualItemReqType,
  type DeleteMultilingualItemResType,
} from "@/features/multilingual/types";

export type CommercialFeatureType = MultilingualItemType;

export type GetCommercialFeaturesReqType = GetMultilingualItemsReqType;
export type GetCommercialFeaturesResType = GetMultilingualItemsResType;

export type CreateCommercialFeatureReqType = CreateMultilingualItemReqType;
export type CreateCommercialFeatureResType = CreateMultilingualItemResType;

export type UpdateCommercialFeatureReqType = UpdateMultilingualItemReqType;
export type UpdateCommercialFeatureResType = UpdateMultilingualItemResType;

export type DeleteCommercialFeatureReqType = DeleteMultilingualItemReqType;
export type DeleteCommercialFeatureResType = DeleteMultilingualItemResType;
