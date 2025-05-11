import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    console.log(error.response?.data);
    if (originalRequest.url === "/auth/signin") return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${
            import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1"
          }/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (process.env.NODE_ENV !== "prod") {
          console.error("Refresh token failed", refreshError);
        }

        window.location.pathname = "/signin";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
