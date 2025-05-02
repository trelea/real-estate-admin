import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { axiosInstance } from "./axios-instance";

export interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: unknown;
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
}

export interface AxiosBaseQueryError<R = unknown> {
  status: number;
  data: R;
  message: string;
}

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosBaseQueryError> =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result: AxiosResponse = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
      });

      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (err.response) {
        return {
          error: {
            status: err.response.status,
            data: err.response.data || err.message,
            message: err.message,
          },
        };
      } else {
        return {
          error: {
            status: 500,
            data: err.message,
            message: "Network or unexpected error",
          },
        };
      }
    }
  };
