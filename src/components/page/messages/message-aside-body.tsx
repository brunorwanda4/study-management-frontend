"use client";
import MessageUserCard from "@/components/cards/message-user-card";
import type { Locale } from "@/i18n";
import { useSearchParams } from "next/navigation"; // For Next.js 13+ App Router
import { useEffect, useState } from "react";

interface Props {
  lang: Locale;
}

const MessageAsideBody = ({ lang }: Props) => {
  const searchParams = useSearchParams(); // React hook for reading query params
  const [messageType, setMessageType] = useState<string | null>(null);

  useEffect(() => {
    setMessageType(searchParams.get("type"));
  }, [searchParams]); // Triggers re-render when the search params change

  return (
    <div className="p-2">
      {messageType === "friends" ? (
        <div className="space-y-1">
          <MessageUserCard lang={lang} />
          <MessageUserCard lang={lang} />
          <MessageUserCard lang={lang} />
        </div>
      ) : (
        <div className="space-y-1">
          <MessageUserCard lang={lang} />
        </div>
      )}
    </div>
  );
};

export default MessageAsideBody;
