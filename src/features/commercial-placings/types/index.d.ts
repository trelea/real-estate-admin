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

export type CommercialPlacingType = MultilingualItemType;

export type GetCommercialPlacingsReqType = GetMultilingualItemsReqType;
export type GetCommercialPlacingsResType = GetMultilingualItemsResType;

export type CreateCommercialPlacingReqType = CreateMultilingualItemReqType;
export type CreateCommercialPlacingResType = CreateMultilingualItemResType;

export type UpdateCommercialPlacingReqType = UpdateMultilingualItemReqType;
export type UpdateCommercialPlacingResType = UpdateMultilingualItemResType;

export type DeleteCommercialPlacingReqType = DeleteMultilingualItemReqType;
export type DeleteCommercialPlacingResType = DeleteMultilingualItemResType;
