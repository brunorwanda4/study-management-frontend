"use client";

import { useRealtimeImproved } from "@/lib/hooks/useRealtimeImproved";
import { WithId } from "@/lib/mode/with-id";
import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useReducer } from "react";

type RealtimeAction<T extends WithId> =
  | { type: "add"; payload: T }
  | { type: "update"; payload: T }
  | { type: "delete"; payload: string }
  | { type: "set"; payload: T[] };

function realtimeReducer<T extends WithId>(
  state: T[],
  action: RealtimeAction<T>,
): T[] {
  console.log("🔄 RealtimeReducer action:", action.type, action.payload);

  switch (action.type) {
    case "set":
      return action.payload;
    case "add": {
      // FIX: Better ID comparison logic
      const newItem = action.payload;
      const newItemId = newItem.id || newItem._id;

      const exists = state.some((item) => {
        const itemId = item.id || item._id;
        return itemId === newItemId;
      });

      if (exists) {
        console.log("🔄 Item already exists, skipping add:", newItemId);
        return state;
      }

      console.log("🆕 Adding new item:", newItemId);
      return [...state, newItem];
    }
    case "update": {
      const updatedItem = action.payload;
      const updatedItemId = updatedItem.id || updatedItem._id;

      console.log("🔄 Updating item:", updatedItemId);
      return state.map((item) => {
        const itemId = item.id || item._id;
        return itemId === updatedItemId ? updatedItem : item;
      });
    }
    case "delete": {
      const deletedId = action.payload;
      console.log("🗑️ Deleting item:", deletedId);
      return state.filter((item) => {
        const itemId = item.id || item._id;
        return itemId !== deletedId;
      });
    }
    default:
      return state;
  }
}

type RealtimeContextType<T extends WithId> = {
  data: T[];
  isConnected: boolean;
  // Add methods to manually update state if needed
  addItem: (item: T) => void;
  updateItem: (item: T) => void;
  deleteItem: (id: string) => void;
};

const RealtimeContext = createContext<RealtimeContextType<any> | null>(null);

export function RealtimeProvider<T extends WithId>({
  channel,
  initialData,
  children,
  className,
}: {
  className?: string;
  channel: string;
  initialData: T[];
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(realtimeReducer<T>, initialData);

  // FIX: Add manual state update methods
  const addItem = (item: T) => {
    dispatch({ type: "add", payload: item });
  };

  const updateItem = (item: T) => {
    dispatch({ type: "update", payload: item });
  };

  const deleteItem = (id: string) => {
    dispatch({ type: "delete", payload: id });
  };

  const { isConnected } = useRealtimeImproved<T>(
    channel,
    (created) => {
      console.log("🆕 RealtimeProvider: Handling created event", created);
      // FIX: Check if the created object has proper structure
      if (created && (created.id || created._id)) {
        dispatch({ type: "add", payload: created });
      } else {
        console.error("❌ Invalid created object:", created);
      }
    },
    (updated) => {
      console.log("🔄 RealtimeProvider: Handling updated event", updated);
      if (updated && (updated.id || updated._id)) {
        dispatch({ type: "update", payload: updated });
      } else {
        console.error("❌ Invalid updated object:", updated);
      }
    },
    (deletedId) => {
      console.log("🗑️ RealtimeProvider: Handling deleted event", deletedId);
      if (deletedId) {
        dispatch({ type: "delete", payload: deletedId });
      } else {
        console.error("❌ Invalid deleted ID:", deletedId);
      }
    },
  );

  // Log state changes for debugging
  useEffect(() => {
    console.log("📊 RealtimeProvider state updated:", {
      channel,
      itemCount: state.length,
      isConnected,
      items: state.map((item) => ({
        id: item.id,
        _id: item._id,
        name: (item as any).name || "unnamed",
      })),
    });
  }, [state, channel, isConnected]);

  return (
    <RealtimeContext.Provider
      value={{
        data: state,
        isConnected,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      <section className={cn("space-y-4", className)}>{children}</section>
    </RealtimeContext.Provider>
  );
}

export function useRealtimeData<T extends WithId>() {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtimeData must be inside RealtimeProvider");
  return ctx as RealtimeContextType<T>;
}
