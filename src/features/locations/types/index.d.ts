import {
  type CreateMultilingualItemReqType,
  type CreateMultilingualItemResType,
  type DeleteMultilingualItemReqType,
  type DeleteMultilingualItemResType,
  type UpdateMultilingualItemReqType,
  type UpdateMultilingualItemResType,
  type GetMultilingualItemsReqType,
  type GetMultilingualItemsResType,
  type MultilingualItemType,
} from "@/features/multilingual/types";

export type LocationCategoryType = MultilingualItemType;

export type GetLocationCategoriesReqType = GetMultilingualItemsReqType;
export type GetLocationCategoriesResType = GetMultilingualItemsResType;

export type CreateLocationCategoryReqType = CreateMultilingualItemReqType;
export type CreateLocationCategoryResType = CreateMultilingualItemResType;

export type UpdateLocationCategoryReqType = UpdateMultilingualItemReqType;
export type UpdateLocationCategoryResType = UpdateMultilingualItemResType;

export type DeleteLocationCategoryReqType = DeleteMultilingualItemReqType;
export type DeleteLocationCategoryResType = DeleteMultilingualItemResType;

export type LocationSubCategoryType = MultilingualItemType;

export type GetLocationSubCategoriesReqType = GetMultilingualItemsReqType & {
  id?: number;
};
export type GetLocationSubCategoriesResType = GetMultilingualItemsResType & {
  category: LocationCategoryType;
};

export type CreateLocationSubCategoryReqType = CreateMultilingualItemReqType<
  {
    category: number;
  },
  {
    category: number;
  }
>;
export type CreateLocationSubCategoryResType = CreateMultilingualItemResType;

export type UpdateLocationSubCategoryReqType = UpdateMultilingualItemReqType<{
  category: number;
}>;
export type UpdateLocationSubCategoryResType = UpdateMultilingualItemResType;

export type DeleteLocationSubCategoryReqType = DeleteMultilingualItemReqType;
export type DeleteLocationSubCategoryResType = DeleteMultilingualItemResType;
