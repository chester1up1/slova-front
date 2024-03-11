import axios, { AxiosRequestConfig } from "axios";

import { ApiRoutes } from "@/api";

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response.data as any;
  },

  //OLD
  // (error: AxiosError) => {
  //   if (error.response != null && error.response.data != null) {
  //     if (error.response.status === 401) {
  //       api.post("/auth/refresh-tokens").then((data) => {
  //         //@ts-ignore
  //         localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  //       });
  //     }
  //     throw error.response.data;
  //   }

  //   throw error;
  // }
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;

    const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (
      error.response &&
      error.response.status === 401 &&
      access_token != null
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          // Refresh the access token
          // const newAccessToken = await refreshAccessToken();

          const newAccessToken = await api
            .post<any, { access_token: string }>(ApiRoutes.Refresh)
            .then((data) => {
              localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
              return data.access_token;
            })
            .catch(() => {
              localStorage.removeItem(ACCESS_TOKEN_KEY);
            });

          // Update the request headers with the new access token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Retry all requests in the queue with the new token
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });

          // Clear the queue
          refreshAndRetryQueue.length = 0;

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // Handle token refresh error
          // You can clear all storage and redirect the user to the login page
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }

      // Add the original request to the queue
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    // Return a Promise rejection if the status code is not 401
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const auth = token ? `Bearer ${token}` : null;
    if (auth != null) {
      config.headers["Authorization"] = auth;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.defaults.withCredentials = true;

export default api;
