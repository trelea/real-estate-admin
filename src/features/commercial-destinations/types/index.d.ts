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

export type CommercialDestinationType = MultilingualItemType;

export type GetCommercialDestinationsReqType = GetMultilingualItemsReqType;
export type GetCommercialDestinationsResType = GetMultilingualItemsResType;

export type CreateCommercialDestinationReqType = CreateMultilingualItemReqType;
export type CreateCommercialDestinationResType = CreateMultilingualItemResType;

export type UpdateCommercialDestinationReqType = UpdateMultilingualItemReqType;
export type UpdateCommercialDestinationResType = UpdateMultilingualItemResType;

export type DeleteCommercialDestinationReqType = DeleteMultilingualItemReqType;
export type DeleteCommercialDestinationResType = DeleteMultilingualItemResType;
