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

export type HousingStockType = MultilingualItemType;

export type GetHousingStocksReqType = GetMultilingualItemsReqType;
export type GetHousingStocksResType = GetMultilingualItemsResType;

export type CreateHousingStockReqType = CreateMultilingualItemReqType;
export type CreateHousingStockResType = CreateMultilingualItemResType;

export type UpdateHousingStockReqType = UpdateMultilingualItemReqType;
export type UpdateHousingStockResType = UpdateMultilingualItemResType;

export type DeleteHousingStockReqType = DeleteMultilingualItemReqType;
export type DeleteHousingStockResType = DeleteMultilingualItemResType;
