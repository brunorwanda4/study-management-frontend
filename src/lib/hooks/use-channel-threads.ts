import { researchGroupChannelsApi } from "@/lib/api";
import { chatUrl } from "@/lib/axios";
import type { ResearchGroupThread } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";

type UseChannelThreadsReturn = {
  socket: Socket | null;
  isConnected: boolean;
  threads: ResearchGroupThread[];
  setThreads: React.Dispatch<React.SetStateAction<ResearchGroupThread[]>>;
  isLoading: boolean;
  sendMessage: (content: string) => void;
  isTyping: boolean;
  typingUsers: string[];
  startTyping: () => void;
  stopTyping: () => void;
};

export function useChannelThreads(
  groupId: string,
  channelId: string,
): UseChannelThreadsReturn {
  const { profile } = useAuth();
  const [threads, setThreads] = useState<ResearchGroupThread[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  if (!profile) {
    throw new Error("User profile is required for useChannelThreads");
  }

  const socket = useMemo(() => {
    return io(`${chatUrl}/chat`, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });
  }, []);

  useEffect(() => {
    // Connection events
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("joinRoom", {
        room: channelId,
        userId: profile.id,
        roomType: "channel",
      });
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Listen for new messages
    const handleNewMessage = (thread: ResearchGroupThread) => {
      // if the same sender ignores the message
      if (thread.member.user.id === profile.id) return;
      console.log("newMessage received on client", thread);
      setThreads((prev) => [thread, ...prev]);
    };

    // Listen for typing indicators
    const handleTyping = (data: {
      userId: string;
      username: string;
      isTyping: boolean;
    }) => {
      if (data.userId === profile.id) return;

      setTypingUsers((prev) => {
        if (data.isTyping) {
          return prev.includes(data.username) ? prev : [...prev, data.username];
        } else {
          return prev.filter((user) => user !== data.username);
        }
      });
    };

    const handleStopTyping = (data: { userId: string; username: string }) => {
      if (data.userId === profile.id) return;
      setTypingUsers((prev) => prev.filter((user) => user !== data.username));
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getThreads = useCallback(async () => {
    const res = await researchGroupChannelsApi.getAllThreads(
      groupId,
      channelId,
    );
    setThreads(res.data.data);
    setIsLoading(false);
  }, [groupId, channelId]);

  // Fetch threads only once on mount
  useEffect(() => {
    getThreads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Send message via socket (optimistic update)
  const sendMessage = useCallback(
    (content: string) => {
      if (!profile) return;
      const now = new Date();
      const member = profile?.researchGroupMembers.find(
        (m) => m.researchGroupId === groupId,
      );
      const memberId = member?.id;
      if (!memberId) {
        console.error("Member ID not found");
        return;
      }

      const optimisticThread: ResearchGroupThread = {
        id: `optimistic-${now.getTime()}`,
        title: `A thread by ${profile.firstName} ${profile.lastName} on ${now.toLocaleDateString("en-US")}`,
        content,
        memberId,
        member: {
          id: memberId,
          user: profile,
        },
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        _count: { groupReply: 0 },
      };
      setThreads((prev) => [optimisticThread, ...prev]);
      // Emit to server
      socket?.emit("sendMessage", {
        channelId,
        memberId,
        message: content,
        userId: profile.id,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groupId, channelId],
  );

  // Typing indicator functions
  const startTyping = useCallback(() => {
    if (!socket || !profile) return;

    setIsTyping(true);
    socket.emit("typing", {
      room: channelId,
      userId: profile.id,
      username: `${profile.firstName} ${profile.lastName}`,
      isTyping: true,
      roomType: "channel",
    });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [socket, profile, channelId]);

  const stopTyping = useCallback(() => {
    if (!socket || !profile) return;

    setIsTyping(false);
    socket.emit("stopTyping", {
      room: channelId,
      userId: profile.id,
      username: `${profile.firstName} ${profile.lastName}`,
      roomType: "channel",
    });

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  }, [socket, profile, channelId]);

  // Auto-stop typing after 3 seconds of inactivity
  useEffect(() => {
    if (isTyping) {
      typingTimeoutRef.current = setTimeout(() => {
        stopTyping();
      }, 3000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isTyping, stopTyping]);

  return {
    socket,
    isConnected,
    threads,
    setThreads,
    isLoading,
    sendMessage,
    isTyping,
    typingUsers,
    startTyping,
    stopTyping,
  };
}
