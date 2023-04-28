export const API_URL = import.meta.env.VITE_API_ENDPOINT;
import axios from "axios";
import { AuthResponseType } from "../types/response";

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponseType>(
          `${API_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);
