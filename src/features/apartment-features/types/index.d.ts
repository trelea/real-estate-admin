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

export type ApartmentFeatureType = MultilingualItemType;

export type GetApartmentFeaturesReqType = GetMultilingualItemsReqType;
export type GetApartmentFeaturesResType = GetMultilingualItemsResType;

export type CreateApartmentFeatureReqType = CreateMultilingualItemReqType;
export type CreateApartmentFeatureResType = CreateMultilingualItemResType;

export type UpdateApartmentFeatureReqType = UpdateMultilingualItemReqType;
export type UpdateApartmentFeatureResType = UpdateMultilingualItemResType;

export type DeleteApartmentFeatureReqType = DeleteMultilingualItemReqType;
export type DeleteApartmentFeatureResType = DeleteMultilingualItemResType;
