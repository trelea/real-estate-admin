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

export type HouseFeatureType = MultilingualItemType;

export type GetHouseFeaturesReqType = GetMultilingualItemsReqType;
export type GetHouseFeaturesResType = GetMultilingualItemsResType;

export type CreateHouseFeatureReqType = CreateMultilingualItemReqType;
export type CreateHouseFeatureResType = CreateMultilingualItemResType;

export type UpdateHouseFeatureReqType = UpdateMultilingualItemReqType;
export type UpdateHouseFeatureResType = UpdateMultilingualItemResType;

export type DeleteHouseFeatureReqType = DeleteMultilingualItemReqType;
export type DeleteHouseFeatureResType = DeleteMultilingualItemResType;
