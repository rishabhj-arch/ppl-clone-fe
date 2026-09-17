import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "../config";
import { formatResponse } from "./format-response";

const generalMiddleware: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

generalMiddleware.interceptors.request.use(
  async (requestConfig: InternalAxiosRequestConfig) => {
    requestConfig.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Access-Control-Allow-Origin": "*",
      "ngrok-skip-browser-warning": "true",
      ...requestConfig.headers,
    } as any;

    return requestConfig;
  }
);

export const instanc: AxiosInstance = generalMiddleware;
export default formatResponse(generalMiddleware);
