// api-client-realtime.ts
import apiRequest, { APIResponse, ApiRequestOptions } from "./api-client";
import { realtimeClient } from "./realtime-client";

/**
 * Enhanced API request with built-in real-time support
 */
async function apiRequestRealtime<
  TRequest = unknown,
  TResponse = unknown,
  TEntity = TResponse,
>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: TRequest,
  options: ApiRequestOptions & {
    // Real-time specific options
    entityType?: string;
    onCreated?: (entity: TEntity) => void;
    onUpdated?: (entity: TEntity) => void;
    onDeleted?: (entityId: string) => void;
  } = {},
): Promise<APIResponse<TResponse> & { unsubscribeRealtime?: () => void }> {
  const { entityType, onCreated, onUpdated, onDeleted, ...apiOptions } =
    options;

  // Make the regular API request
  const result = await apiRequest<TRequest, TResponse>(
    method,
    url,
    data,
    apiOptions,
  );

  let unsubscribe: (() => void) | undefined;

  // Set up real-time subscriptions if needed
  if (entityType && result.data) {
    const handleEvent = (event: any) => {
      if (event.entity_type === entityType) {
        switch (event.event_type) {
          case "created":
            onCreated?.(event.data);
            break;
          case "updated":
            onUpdated?.(event.data);
            break;
          case "deleted":
            onDeleted?.(event.entity_id);
            break;
        }
      }
    };

    // Subscribe to real-time events
    unsubscribe = realtimeClient.subscribe(entityType, handleEvent);
  }

  // Return result with unsubscribe method
  return {
    ...result,
    unsubscribeRealtime: unsubscribe,
  };
}

export { apiRequestRealtime };
