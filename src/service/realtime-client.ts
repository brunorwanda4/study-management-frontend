// realtime-client.ts
interface RealtimeEvent {
  event_type: string;
  entity_type: string;
  entity_id?: string;
  data: any;
  timestamp: string;
}

type EventCallback = (event: RealtimeEvent) => void;
type EventUnsubscribe = () => void;

class RealtimeClient {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, EventCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private baseUrl: string;
  private isBrowser: boolean;
  private isConnecting = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  // Add connection state tracking
  private connectionState: "disconnected" | "connecting" | "connected" =
    "disconnected";

  // Connection limiting
  private static MAX_CONCURRENT_CONNECTIONS = 3;
  private static activeConnections = 0;

  constructor(baseUrl: string = "http://127.0.0.1:4646") {
    this.baseUrl = baseUrl;
    this.isBrowser = typeof window !== "undefined";

    // Add beforeunload handler to clean up connections
    if (this.isBrowser) {
      window.addEventListener("beforeunload", () => {
        this.cleanup();
      });
    }
  }

  async connect(): Promise<void> {
    if (!this.isBrowser) {
      throw new Error("EventSource not available in SSR");
    }

    if (this.isConnecting) {
      console.log("🔄 useRealtime: Already connecting, skipping...");
      return;
    }

    if (this.connectionState === "connected") {
      console.log("🔄 useRealtime: Already connected, skipping...");
      return;
    }

    // Check connection limits
    if (
      RealtimeClient.activeConnections >=
      RealtimeClient.MAX_CONCURRENT_CONNECTIONS
    ) {
      throw new Error("Too many concurrent real-time connections");
    }

    this.isConnecting = true;
    this.connectionState = "connecting";
    RealtimeClient.activeConnections++;

    return new Promise((resolve, reject) => {
      try {
        // Clean up any existing connection first
        this.cleanup();

        console.log("🔄 useRealtime: Creating new EventSource connection");
        this.eventSource = new EventSource(`${this.baseUrl}/events/stream`);

        const onOpen = () => {
          console.log("✅ useRealtime: Connected to real-time event stream");
          this.connectionState = "connected";
          this.isConnecting = false;
          this.reconnectAttempts = 0;

          // Remove event listeners to prevent memory leaks
          this.eventSource!.removeEventListener("open", onOpen);
          this.eventSource!.removeEventListener("error", onError);

          resolve();
        };

        const onError = (error: Event) => {
          console.error("❌ useRealtime: EventSource connection error:", error);
          this.isConnecting = false;
          this.connectionState = "disconnected";
          RealtimeClient.activeConnections = Math.max(
            0,
            RealtimeClient.activeConnections - 1,
          );

          // Remove event listeners
          this.eventSource!.removeEventListener("open", onOpen);
          this.eventSource!.removeEventListener("error", onError);

          this.handleReconnection();
          reject(error);
        };

        this.eventSource.addEventListener("open", onOpen);
        this.eventSource.addEventListener("error", onError);

        this.eventSource.onmessage = (event) => {
          try {
            const data: RealtimeEvent = JSON.parse(event.data);
            this.handleEvent(data);
          } catch (error) {
            console.error("Error parsing real-time event:", error);
          }
        };

        // Set a connection timeout
        const timeoutId = setTimeout(() => {
          if (this.isConnecting) {
            console.error("❌ useRealtime: Connection timeout");
            this.isConnecting = false;
            this.connectionState = "disconnected";
            RealtimeClient.activeConnections = Math.max(
              0,
              RealtimeClient.activeConnections - 1,
            );

            this.cleanup();
            reject(new Error("Connection timeout"));
          }
        }, 10000);

        // Cleanup timeout on success
        this.eventSource.addEventListener(
          "open",
          () => {
            clearTimeout(timeoutId);
          },
          { once: true },
        );
      } catch (error) {
        this.isConnecting = false;
        this.connectionState = "disconnected";
        RealtimeClient.activeConnections = Math.max(
          0,
          RealtimeClient.activeConnections - 1,
        );
        reject(error);
      }
    });
  }

  /**
   * Improved subscribe method with connection pooling
   */
  subscribe(entityType: string, callback: EventCallback): EventUnsubscribe {
    if (!this.callbacks.has(entityType)) {
      this.callbacks.set(entityType, []);
    }

    const callbacks = this.callbacks.get(entityType)!;

    // Check if callback already exists to prevent duplicates
    if (callbacks.includes(callback)) {
      console.warn("🔄 useRealtime: Callback already subscribed, skipping...");
      return () => this.unsubscribe(entityType, callback);
    }

    callbacks.push(callback);

    console.log(
      `✅ Subscribed to ${entityType}, total callbacks: ${callbacks.length}, total entities: ${this.callbacks.size}`,
    );

    // Auto-connect if not connected, but only if we have callbacks
    if (this.isBrowser && !this.eventSource && this.shouldConnect()) {
      // Use setTimeout to avoid immediate connection during render
      setTimeout(() => {
        if (this.shouldConnect()) {
          this.connect().catch((error) => {
            console.warn("🔄 useRealtime: Auto-connect failed:", error);
          });
        }
      }, 500);
    }

    return () => {
      this.unsubscribe(entityType, callback);
    };
  }

  subscribeToAll(callback: EventCallback): EventUnsubscribe {
    return this.subscribe("*", callback);
  }

  unsubscribe(entityType: string, callback: EventCallback): void {
    const callbacks = this.callbacks.get(entityType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
        console.log(
          `🔄 useRealtime: Unsubscribed from ${entityType}, remaining callbacks: ${callbacks.length}`,
        );

        // If no more callbacks for this entity type, remove the entry
        if (callbacks.length === 0) {
          this.callbacks.delete(entityType);
        }
      }
    }

    // Disconnect if no more subscribers
    if (this.callbacks.size === 0) {
      setTimeout(() => {
        if (this.callbacks.size === 0) {
          this.disconnect();
        }
      }, 5000);
    }
  }

  unsubscribeAll(entityType: string): void {
    const callbacks = this.callbacks.get(entityType);
    if (callbacks) {
      console.log(
        `🔄 useRealtime: Unsubscribing all callbacks for ${entityType}, count: ${callbacks.length}`,
      );
    }
    this.callbacks.delete(entityType);

    // Disconnect if no more subscribers
    if (this.callbacks.size === 0) {
      setTimeout(() => {
        if (this.callbacks.size === 0) {
          this.disconnect();
        }
      }, 5000);
    }
  }

  /**
   * Determine if we should attempt connection - FIXED
   */
  private shouldConnect(): boolean {
    const hasSubscribers = this.callbacks.size > 0;
    const notConnected = !this.isConnected() && !this.isConnecting;
    const shouldConnect = hasSubscribers && notConnected;

    console.log(
      `🔌 Connection check: subscribers=${hasSubscribers}, connected=${this.isConnected()}, connecting=${this.isConnecting} => shouldConnect=${shouldConnect}`,
    );

    return shouldConnect;
  }

  /**
   * Handle incoming events - ADDED BETTER LOGGING
   */
  private handleEvent(event: RealtimeEvent) {
    console.log(
      `📨 Incoming event: ${event.entity_type}::${event.event_type}`,
      {
        entity_id: event.entity_id,
        data_type: typeof event.data,
        has_data: !!event.data,
      },
    );

    // Call all global callbacks
    const globalCallbacks = this.callbacks.get("*") || [];
    globalCallbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in global callback:", error);
      }
    });

    // Call entity-specific callbacks
    const entityCallbacks = this.callbacks.get(event.entity_type) || [];
    console.log(
      `📢 Delivering to ${globalCallbacks.length} global and ${entityCallbacks.length} entity callbacks`,
    );

    entityCallbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error(`Error in ${event.entity_type} callback:`, error);
      }
    });
  }

  private handleReconnection() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(
        "🔔 useRealtime: Max reconnection attempts reached, giving up",
      );
      this.reconnectAttempts = 0;
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    console.log(
      `🔄 useRealtime: Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`,
    );

    // Clear any existing timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      if (this.shouldConnect()) {
        this.connect().catch((error) => {
          console.warn("🔄 useRealtime: Reconnection attempt failed:", error);
        });
      } else {
        console.log(
          "🔄 useRealtime: No need to reconnect, no active subscribers",
        );
        this.reconnectAttempts = 0;
      }
    }, delay);
  }

  private cleanup() {
    console.log("🔄 useRealtime: Cleaning up resources");

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.isConnecting = false;
    this.connectionState = "disconnected";
  }

  disconnect() {
    console.log("🔄 useRealtime: Manual disconnect called");
    this.cleanup();
    this.reconnectAttempts = 0;

    // Update connection count
    if (RealtimeClient.activeConnections > 0) {
      RealtimeClient.activeConnections--;
    }
  }

  /**
   * Check if connected (SSR-safe) - FIXED
   */
  isConnected(): boolean {
    // Always return false during SSR
    if (!this.isBrowser) {
      return false;
    }

    const isOpen = this.eventSource?.readyState === EventSource.OPEN;
    const isConnected = this.connectionState === "connected" && isOpen;

    return isConnected;
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected(),
      isConnecting: this.isConnecting,
      connectionState: this.connectionState,
      reconnectAttempts: this.reconnectAttempts,
      activeSubscribers: this.callbacks.size,
      totalCallbacks: Array.from(this.callbacks.values()).reduce(
        (sum, cbs) => sum + cbs.length,
        0,
      ),
      globalConnections: RealtimeClient.activeConnections,
    };
  }

  async refresh(): Promise<void> {
    console.log("🔄 useRealtime: Refreshing connection");
    this.disconnect();

    // Small delay before reconnecting
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (this.shouldConnect()) {
      return this.connect();
    }
  }

  getSubscribedEntities(): string[] {
    return Array.from(this.callbacks.keys());
  }
}

// Create a singleton instance
export const realtimeClient = new RealtimeClient();

// Export for debugging
if (typeof window !== "undefined") {
  (window as any).realtimeClient = realtimeClient;
}
