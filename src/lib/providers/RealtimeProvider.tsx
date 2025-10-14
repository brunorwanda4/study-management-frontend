"use client";

import { useRealtimeImproved } from "@/lib/hooks/useRealtimeImproved";
import { WithId } from "@/lib/mode/with-id";
import { cn } from "@/lib/utils";
import { createContext, useContext, useReducer } from "react";

type ChannelName = string;

type RealtimeAction<T extends WithId> =
  | { type: "set"; channel: ChannelName; payload: T[] }
  | { type: "add"; channel: ChannelName; payload: T }
  | { type: "update"; channel: ChannelName; payload: T }
  | { type: "delete"; channel: ChannelName; payload: string };

type RealtimeState<T extends WithId> = Record<ChannelName, T[]>;

function realtimeReducer<T extends WithId>(
  state: RealtimeState<T>,
  action: RealtimeAction<T>,
): RealtimeState<T> {
  const current = state[action.channel] || [];

  switch (action.type) {
    case "set":
      return { ...state, [action.channel]: action.payload };
    case "add": {
      const newItem = action.payload;
      const id = newItem.id || newItem._id;
      if (current.some((i) => (i.id || i._id) === id)) return state;
      return { ...state, [action.channel]: [...current, newItem] };
    }
    case "update": {
      const item = action.payload;
      const id = item.id || item._id;
      return {
        ...state,
        [action.channel]: current.map((i) =>
          (i.id || i._id) === id ? item : i,
        ),
      };
    }
    case "delete": {
      const id = action.payload;
      return {
        ...state,
        [action.channel]: current.filter((i) => (i.id || i._id) !== id),
      };
    }
    default:
      return state;
  }
}

type ChannelConfig<T extends WithId> = {
  name: ChannelName;
  initialData: T[];
  enabled?: boolean; // ✅ allow disabling realtime for this channel
};

type RealtimeContextType<T extends WithId> = {
  state: RealtimeState<T>;
  isConnected: Record<ChannelName, boolean>;
  addItem: (channel: ChannelName, item: T) => void;
  updateItem: (channel: ChannelName, item: T) => void;
  deleteItem: (channel: ChannelName, id: string) => void;
};

const RealtimeContext = createContext<RealtimeContextType<any> | null>(null);

type RealtimeProviderProps<T extends WithId> =
  | {
      /** Single-channel mode */
      channel: string;
      initialData: T[];
      className?: string;
      children: React.ReactNode;
      enabled?: boolean;
    }
  | {
      /** Multi-channel mode */
      channels: ChannelConfig<T>[];
      className?: string;
      children: React.ReactNode;
    };

export function RealtimeProvider<T extends WithId>(
  props: RealtimeProviderProps<T>,
) {
  const channels =
    "channel" in props
      ? [
          {
            name: props.channel,
            initialData: props.initialData,
            enabled: props.enabled ?? true,
          },
        ]
      : props.channels;

  const { className, children } = props;

  const initialState = Object.fromEntries(
    channels.map((c) => [c.name, c.initialData]),
  ) as RealtimeState<T>;

  const [state, dispatch] = useReducer(realtimeReducer<T>, initialState);
  const connectionMap: Record<string, boolean> = {};

  channels.forEach(({ name, enabled = true }) => {
    if (!enabled) {
      connectionMap[name] = false;
      return; // ✅ skip realtime hook
    }

    const { isConnected } = useRealtimeImproved<T>(
      name,
      (created) => dispatch({ type: "add", channel: name, payload: created }),
      (updated) =>
        dispatch({ type: "update", channel: name, payload: updated }),
      (deletedId) =>
        dispatch({ type: "delete", channel: name, payload: deletedId }),
    );
    connectionMap[name] = isConnected;
  });

  const addItem = (channel: ChannelName, item: T) =>
    dispatch({ type: "add", channel, payload: item });
  const updateItem = (channel: ChannelName, item: T) =>
    dispatch({ type: "update", channel, payload: item });
  const deleteItem = (channel: ChannelName, id: string) =>
    dispatch({ type: "delete", channel, payload: id });

  return (
    <RealtimeContext.Provider
      value={{
        state,
        isConnected: connectionMap,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      <section className={cn("space-y-4", className)}>{children}</section>
    </RealtimeContext.Provider>
  );
}

// ✅ Updated hook: now supports optional `enabled` param
export function useRealtimeData<T extends WithId>(
  channel: string,
  enabled: boolean = true, // default true
) {
  const ctx = useContext(RealtimeContext);
  if (!ctx) throw new Error("useRealtimeData must be inside RealtimeProvider");

  const data = ctx.state[channel] || [];
  const connected = enabled ? (ctx.isConnected[channel] ?? false) : false;

  return {
    data: data as T[],
    isConnected: connected,
    addItem: (item: T) => ctx.addItem(channel, item),
    updateItem: (item: T) => ctx.updateItem(channel, item),
    deleteItem: (id: string) => ctx.deleteItem(channel, id),
  };
}
