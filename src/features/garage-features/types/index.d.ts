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

export type GarageFeatureType = MultilingualItemType;

export type GetGarageFeaturesReqType = GetMultilingualItemsReqType;
export type GetGarageFeaturesResType = GetMultilingualItemsResType;

export type CreateGarageFeatureReqType = CreateMultilingualItemReqType;
export type CreateGarageFeatureResType = CreateMultilingualItemResType;

export type UpdateGarageFeatureReqType = UpdateMultilingualItemReqType;
export type UpdateGarageFeatureResType = UpdateMultilingualItemResType;

export type DeleteGarageFeatureReqType = DeleteMultilingualItemReqType;
export type DeleteGarageFeatureResType = DeleteMultilingualItemResType;
