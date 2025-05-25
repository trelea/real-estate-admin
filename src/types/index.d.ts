export interface ContextProps<M = unknown, D = unknown> {
  meta: M;
  data: D;
}

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  last_page: number;
};

export type UrlQueriesType = {
  page: number;
  search: string;
  limit?: number = 10;
};

export type LanguagesFieldsType = {
  ro: string;
  ru: string;
  en: string;
};
