// lib/hooks/useRealtimeImproved.ts
import { realtimeClient } from "@/service/realtime-client";
import { useEffect, useRef, useState } from "react";

export function useRealtimeImproved<T>(
  entityType: string,
  onCreated?: (entity: T) => void,
  onUpdated?: (entity: T) => void,
  onDeleted?: (entityId: string) => void,
) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    setError(null);

    const handleEvent = (event: any) => {
      if (!mountedRef.current) return;

      console.log("📨 Realtime event received:", {
        event_type: event.event_type,
        entity_type: event.entity_type,
        entity_id: event.entity_id,
        data: event.data,
      });

      // FIX: Check if this event is for our entity type
      if (event.entity_type !== entityType) {
        console.log(
          `🔄 Skipping event for entity type: ${event.entity_type}, expected: ${entityType}`,
        );
        return;
      }

      switch (event.event_type) {
        case "created":
          console.log("🆕 Created event data:", event.data);
          onCreated?.(event.data);
          break;
        case "updated":
          console.log("🔄 Updated event data:", event.data);
          onUpdated?.(event.data);
          break;
        case "deleted":
          console.log("🗑️ Deleted event ID:", event.entity_id);
          onDeleted?.(event.entity_id);
          break;
        default:
          console.log("❓ Unknown event type:", event.event_type);
      }
    };

    // Subscribe to events - FIX: Use the correct entity type
    unsubscribeRef.current = realtimeClient.subscribe(entityType, handleEvent);

    console.log(`✅ Subscribed to entity type: ${entityType}`);

    // Set up connection state listener
    const checkConnection = () => {
      if (mountedRef.current) {
        const connected = realtimeClient.isConnected();
        setIsConnected(connected);
        if (!connected) {
          console.log("🔌 Connection lost, attempting to reconnect...");
        }
      }
    };

    // Check connection status periodically
    const connectionInterval = setInterval(checkConnection, 3000);

    // Initial connection attempt
    const attemptConnection = async () => {
      if (!realtimeClient.isConnected() && mountedRef.current) {
        try {
          console.log("🔄 Attempting to connect to real-time server...");
          await realtimeClient.connect();
          if (mountedRef.current) {
            setIsConnected(true);
            setError(null);
            console.log("✅ Connected to real-time server");
          }
        } catch (err) {
          if (mountedRef.current) {
            const errorMessage =
              err instanceof Error ? err.message : "Connection failed";
            setError(errorMessage);
            setIsConnected(false);
            console.error("❌ Connection failed:", errorMessage);
          }
        }
      }
    };

    // Try to connect immediately
    attemptConnection();

    // Also try again after a delay in case of race conditions
    const connectionTimer = setTimeout(attemptConnection, 2000);

    return () => {
      mountedRef.current = false;
      clearTimeout(connectionTimer);
      clearInterval(connectionInterval);

      if (unsubscribeRef.current) {
        console.log(`❌ Unsubscribing from entity type: ${entityType}`);
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [entityType, onCreated, onUpdated, onDeleted]);

  const connect = async () => {
    try {
      setError(null);
      await realtimeClient.connect();
      setIsConnected(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Connection failed";
      setError(errorMessage);
      setIsConnected(false);
      throw err;
    }
  };

  const disconnect = () => {
    realtimeClient.disconnect();
    setIsConnected(false);
    setError(null);
  };

  return {
    isConnected,
    error,
    connect,
    disconnect,
  };
}
