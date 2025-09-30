"use client";

import { RealtimeProvider } from "@/lib/providers/RealtimeProvider";

type WithId = { id?: string; _id?: string };

interface Props<T extends WithId> {
  channel: string;
  initialData: T[];
  children: React.ReactNode;
}

export default function RealtimeClientBoundary<T extends WithId>({
  channel,
  initialData,
  children,
}: Props<T>) {
  return (
    <RealtimeProvider<T> channel={channel} initialData={initialData}>
      {/* 👇 This whole subtree is now forced to be client-side */}
      {children}
    </RealtimeProvider>
  );
}
