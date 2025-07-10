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

export type TerrainFeatureType = MultilingualItemType;

export type GetTerrainFeaturesReqType = GetMultilingualItemsReqType;
export type GetTerrainFeaturesResType = GetMultilingualItemsResType;

export type CreateTerrainFeatureReqType = CreateMultilingualItemReqType;
export type CreateTerrainFeatureResType = CreateMultilingualItemResType;

export type UpdateTerrainFeatureReqType = UpdateMultilingualItemReqType;
export type UpdateTerrainFeatureResType = UpdateMultilingualItemResType;

export type DeleteTerrainFeatureReqType = DeleteMultilingualItemReqType;
export type DeleteTerrainFeatureResType = DeleteMultilingualItemResType;
