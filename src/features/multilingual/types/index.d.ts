import {
  type PaginationMeta,
  type LanguagesFieldsType,
  type UrlQueriesType,
} from "@/types";

export type MultilingualItemType = LanguagesFieldsType & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type GetMultilingualItemsResType = {
  data: MultilingualItemType[];
  meta: PaginationMeta;
};

export type GetMultilingualItemsReqType = UrlQueriesType;

export type CreateMultilingualItemResType = unknown;
export type CreateMultilingualItemReqType = {
  data: LanguagesFieldsType;
  params?: GetMultilingualItemsReqType;
};

export type DeleteMultilingualItemResType = unknown;
export type DeleteMultilingualItemReqType = {
  id: number;
  params?: GetMultilingualItemsReqType;
};

export type UpdateMultilingualItemResType = unknown;
export type UpdateMultilingualItemReqType = {
  id: number;
  data?: Partial<LanguagesFieldsType>;
  params?: GetMultilingualItemsReqType;
};
