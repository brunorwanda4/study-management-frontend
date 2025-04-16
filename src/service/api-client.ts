// import { env } from '@/lib/env';
import axios, {  AxiosRequestConfig, AxiosResponse } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface APIResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

/**
 * Reusable API request function
 * @param method HTTP method ('get' | 'post' | 'put' | 'delete' | 'patch')
 * @param url Endpoint path (e.g. '/auth/register')
 * @param data Optional request payload
 * @param Authorization Optional bearer token
 * @returns JSON with data or detailed error info
 */
async function apiRequest<TRequest = unknown, TResponse = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest,
  Authorization?: string
): Promise<APIResponse<TResponse>> {
  try {
    if (data && typeof data !== 'object') {
      throw new TypeError(`Invalid data type: Expected object, received ${typeof data}`);
    }

    const config: AxiosRequestConfig = {
      method,
    //   url: `${env.API_ENDPOINT}${url}`,
      url: `http://localhost:4666${url}`,
      headers: {
        'Content-Type': 'application/json',
        ...(Authorization ? { Authorization } : {}),
      },
      ...(method !== 'get' && data ? { data } : {}),
    };

    const response: AxiosResponse<TResponse> = await axios<TResponse>(config);
    return {
      data: response.data,
      message: 'Request successful',
      statusCode: response.status,
    };
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      return {
        error: error.message,
        message: 'Type Error',
        statusCode: 400,
      };
    }

    if (axios.isAxiosError(error)) {
      const res = error.response;
      return {
        error: res?.data?.error || res?.statusText || 'Axios Error',
        message: res?.data?.message || 'Something went wrong',
        statusCode: res?.status || 500,
      };
    }

    return {
      error: 'Unknown error',
      message: `${error}` || 'An unexpected error occurred',
      statusCode: 500,
    };
  }
}

export default apiRequest;
