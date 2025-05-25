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

export type TerrainUsabilityType = MultilingualItemType;

export type GetTerrainUsabilitiesReqType = GetMultilingualItemsReqType;
export type GetTerrainUsabilitiesResType = GetMultilingualItemsResType;

export type CreateTerrainUsabilityReqType = CreateMultilingualItemReqType;
export type CreateTerrainUsabilityResType = CreateMultilingualItemResType;

export type UpdateTerrainUsabilityReqType = UpdateMultilingualItemReqType;
export type UpdateTerrainUsabilityResType = UpdateMultilingualItemResType;

export type DeleteTerrainUsabilityReqType = DeleteMultilingualItemReqType;
export type DeleteTerrainUsabilityResType = DeleteMultilingualItemResType;
