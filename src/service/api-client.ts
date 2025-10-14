import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// ✅ New: helper for safe revalidation
async function safeRevalidate(path: string) {
  try {
    // Use environment variable for base URL if available
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:4646";

    // POST to Next.js revalidation route (if it exists)
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });

    if (!response.ok) {
      console.warn(
        `⚠️ Revalidation failed for ${path}: ${response.status} ${response.statusText}`,
      );
    } else {
      console.log(`✅ Successfully revalidated path: ${path}`);
    }
  } catch (error) {
    // Fail silently to avoid breaking server logic
    console.warn(
      `⚠️ Skipping revalidation for ${path}: ${String(error)} (safe fallback)`,
    );
  }
}

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

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
  /**
   * Automatically revalidate this path after success
   */
  revalidatePath?: string | string[];
  /**
   * School Token
   */
  schoolToken?: string | string[];
}

/**
 * Reusable API request function with safe revalidation support
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
        ...(options.schoolToken ? { "School-Token": options.schoolToken } : {}), // ✅ ADD THIS LINE
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

    // ✅ Auto revalidate if required
    if (
      options.revalidatePath &&
      ["post", "put", "patch", "delete"].includes(method)
    ) {
      const paths = Array.isArray(options.revalidatePath)
        ? options.revalidatePath
        : [options.revalidatePath];

      for (const path of paths) {
        await safeRevalidate(path);
      }
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
