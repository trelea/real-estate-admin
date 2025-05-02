import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api";

export const rootReducer = combineReducers({
  /**
   * Api Reduces
   */
  [baseApi.reducerPath]: baseApi.reducer,
  /**
   * Other Reducers
   */
});
