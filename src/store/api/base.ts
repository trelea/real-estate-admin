import { axiosBaseQuery } from "@/services";
import { createApi } from "@reduxjs/toolkit/query/react";
import tagTypes from "./tags";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  // sec
  keepUnusedDataFor: 60 * 30,
});
