import {
  type PaginationMeta,
  type LanguagesFieldsType,
  type UrlQueriesType,
} from "@/types";

export type MultilingualItemType<T extends {}> = LanguagesFieldsType<T> & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type GetMultilingualItemsResType<R extends {}, T extends {}> = {
  data: MultilingualItemType<R>[];
  meta: PaginationMeta;
} & T;

export type GetMultilingualItemsReqType = UrlQueriesType;

export type CreateMultilingualItemResType = unknown;
export type CreateMultilingualItemReqType<R extends {}, T extends {}> = {
  data: LanguagesFieldsType<R>;
  params?: GetMultilingualItemsReqType<T>;
};

export type DeleteMultilingualItemResType = unknown;
export type DeleteMultilingualItemReqType<T extends {}> = {
  id: number;
  params?: GetMultilingualItemsReqType<T>;
};

export type UpdateMultilingualItemResType = unknown;
export type UpdateMultilingualItemReqType<R extends {}, T extends {}> = {
  id: number;
  data?: Partial<LanguagesFieldsType<R>>;
  params?: GetMultilingualItemsReqType<T>;
};
