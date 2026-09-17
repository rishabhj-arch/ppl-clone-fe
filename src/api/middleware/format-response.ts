import { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ErrorResponseData {
  message?: string;
  detail?: string;
  Message?: string;
  [key: string]: any; 
}

export function formatResponse(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.response.use(
    (resolveRes: AxiosResponse): AxiosResponse => {
      resolveRes.data = {
        ...resolveRes.data,
        formatted: {
          data: resolveRes.data,
          status: resolveRes.status,
          success: true,
        },
      };
      return resolveRes;
    },
    (error: AxiosError): Promise<AxiosResponse> => {
      const responseData: ErrorResponseData = error?.response?.data || {}; 

      const message = responseData?.message || "";
      const status = error?.response?.status;
      const detail = responseData?.detail || "";
      const Message = responseData?.Message || "";

      if (status === 403) {
        localStorage.clear();
        window.location.href = "/";
      }

      return Promise.reject({
        data: message || detail || Message || "Something Went Wrong!!",
        status: status || NaN,
        success: false,
        headers: error?.response?.headers || {},
        config: error?.config,
        statusText: error?.response?.statusText || "",
      });
    }
  );

  return instance;
}
