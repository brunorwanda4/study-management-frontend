import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

// Define the API response interface
export interface APIResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
  realtime?: {
    enabled: boolean;
    entityType?: string;
  };
}

// Define the options interface
export interface ApiRequestOptions {
  token?: string;
  role?: string;
  /**
   * Enable real-time updates for this request
   */
  realtime?: boolean | string;
  /**
   * Callback for real-time events
   */
  onRealtimeEvent?: (event: any) => void;
}

/**
 * Reusable API request function
 */
async function apiRequest<TRequest = unknown, TResponse = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest,
  options: ApiRequestOptions = {},
): Promise<APIResponse<TResponse>> {
  try {
    if (data && typeof data !== "object" && data !== undefined) {
      throw new TypeError(
        `Invalid data type: Expected object, received ${typeof data}`,
      );
    }

    const config: AxiosRequestConfig = {
      method,
      url: `http://127.0.0.1:4646${url}`,
      headers: {
        "Content-Type": "application/json",
        ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options.role ? { role: options.role } : {}),
      },
      ...(method !== "get" && data ? { data } : {}),
    };

    const response: AxiosResponse<TResponse> = await axios<TResponse>(config);

    const result: APIResponse<TResponse> = {
      data: response.data,
      message: "Request successful",
      statusCode: response.status,
    };

    // Add real-time info if enabled
    if (options.realtime) {
      result.realtime = {
        enabled: true,
        entityType:
          typeof options.realtime === "string" ? options.realtime : undefined,
      };
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      return {
        error: error.message,
        message: "Type Error",
        statusCode: 400,
      };
    }

    if (axios.isAxiosError(error)) {
      const res = error.response;
      return {
        error: res?.data?.error || res?.statusText || "Axios Error",
        message: res?.data?.message || "Something went wrong",
        statusCode: res?.status || 500,
      };
    }

    return {
      error: "Unknown error",
      message: `${error}` || "An unexpected error occurred",
      statusCode: 500,
    };
  }
}

export default apiRequest;
