import { realtimeClient } from "@/service/realtime-client";
import { useCallback, useEffect, useRef, useState } from "react";

export interface RealtimeEvent {
  event_type: string;
  entity_type: string;
  entity_id?: string;
  data: any;
  timestamp: string;
}

interface UseRealtimeOptions {
  entityType?: string;
  onEvent?: (event: RealtimeEvent) => void;
  autoConnect?: boolean;
}

/**
 * Hook for real-time event subscriptions (SSR-safe)
 */
export function useRealtime(options: UseRealtimeOptions = {}) {
  const { entityType, onEvent, autoConnect = true } = options;
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const subscribe = useCallback(
    (callback?: (event: RealtimeEvent) => void) => {
      console.log("🔄 useRealtime: subscribe called");

      // Unsubscribe from previous subscription
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      const eventCallback = callback || onEvent;
      if (!eventCallback) {
        console.log(
          "🔄 useRealtime: No callback provided, skipping subscription",
        );
        return;
      }

      console.log(
        `🔄 useRealtime: Subscribing to ${entityType || "all events"}`,
      );

      if (entityType) {
        unsubscribeRef.current = realtimeClient.subscribe(
          entityType,
          eventCallback,
        );
      } else {
        unsubscribeRef.current = realtimeClient.subscribeToAll(eventCallback);
      }

      // Check connection status after subscribing
      setIsConnected(realtimeClient.isConnected());
    },
    [entityType, onEvent],
  );

  const unsubscribe = useCallback(() => {
    console.log("🔄 useRealtime: unsubscribe called");
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const connect = useCallback(async () => {
    console.log("🔄 useRealtime: connect called");
    setConnectionAttempts((prev) => prev + 1);
    try {
      await realtimeClient.connect();
      setIsConnected(true);
      console.log("✅ useRealtime: Connected successfully");

      // Resubscribe after connecting
      if (onEvent) {
        subscribe();
      }
    } catch (error) {
      console.error(
        "❌ useRealtime: Failed to connect to real-time events:",
        error,
      );
      setIsConnected(false);
      throw error;
    }
  }, [subscribe, onEvent]);

  const disconnect = useCallback(() => {
    console.log("🔄 useRealtime: disconnect called");
    realtimeClient.disconnect();
    unsubscribe();
    setIsConnected(false);
  }, [unsubscribe]);

  // Auto-connect and subscribe on mount (client-side only)
  useEffect(() => {
    console.log("🔄 useRealtime: useEffect running, autoConnect:", autoConnect);

    if (autoConnect && onEvent) {
      console.log("🔄 useRealtime: Auto-connecting...");
      connect().catch((error) => {
        console.error("❌ useRealtime: Auto-connect failed:", error);
      });
      subscribe();
    }

    return () => {
      console.log("🔄 useRealtime: Cleanup");
      unsubscribe();
    };
  }, [autoConnect, onEvent, subscribe, unsubscribe, connect]);

  // Update connection status periodically
  useEffect(() => {
    const checkConnection = () => {
      const connected = realtimeClient.isConnected();
      if (connected !== isConnected) {
        console.log(
          `🔄 useRealtime: Connection status changed to: ${connected}`,
        );
        setIsConnected(connected);
      }
    };

    // Check connection status more frequently
    const interval = setInterval(checkConnection, 2000);
    checkConnection(); // Initial check

    return () => {
      clearInterval(interval);
    };
  }, [isConnected]);

  return {
    subscribe,
    unsubscribe,
    connect,
    disconnect,
    isConnected,
    connectionAttempts,
  };
}

/**
 * Hook for real-time entity updates (SSR-safe)
 */
export function useRealtimeEntity<T>(
  entityType: string,
  onCreated?: (entity: T) => void,
  onUpdated?: (entity: T) => void,
  onDeleted?: (entityId: string) => void,
) {
  console.log(`🔄 useRealtimeEntity: Setting up for ${entityType}`);

  const handleEvent = useCallback(
    (event: RealtimeEvent) => {
      console.log(
        `🔄 useRealtimeEntity: Received event for ${event.entity_type}`,
        event,
      );

      if (event.entity_type !== entityType) {
        console.log(
          `🔄 useRealtimeEntity: Event type mismatch, expected ${entityType}, got ${event.entity_type}`,
        );
        return;
      }

      switch (event.event_type) {
        case "created":
          console.log("🔄 useRealtimeEntity: Calling onCreated", event.data);
          onCreated?.(event.data);
          break;
        case "updated":
          console.log("🔄 useRealtimeEntity: Calling onUpdated", event.data);
          onUpdated?.(event.data);
          break;
        case "deleted":
          console.log(
            "🔄 useRealtimeEntity: Calling onDeleted",
            event.entity_id,
          );
          onDeleted?.(event.entity_id || "");
          break;
        default:
          console.log(
            "🔄 useRealtimeEntity: Unknown event type",
            event.event_type,
          );
      }
    },
    [entityType, onCreated, onUpdated, onDeleted],
  );

  const result = useRealtime({
    entityType,
    onEvent: handleEvent,
  });

  return result;
}
