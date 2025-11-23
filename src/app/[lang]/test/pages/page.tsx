"use client";

import MessageInput from "@/components/common/form/message-input/message-input";
import { useEffect, useRef, useState } from "react";

export const dynamic = "force-dynamic";

interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
}

const ChatDemoPage = () => {
  const [inputValue, setInputValue] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! Try sending a message with <b>bold</b> text or an emoji 😄.`,
      sender: "them",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const plainText = inputValue.replace(/<[^>]*>/g, "").trim();
    if (!plainText && !inputValue.includes("img")) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: inputValue,
        sender: "me",
        timestamp: new Date(),
      },
    ]);

    setInputValue("");
  };

  return (
    <div className="min-h-screen bg-base-200 grid place-content-center">
      <div className="  bg-base-100 corner-notch border-error size-60 border-2 rounded-[100px] justify-center items-center flex">
        Hello bruno
      </div>
    </div>
  );
};

export default ChatDemoPage;

// return (
//   <div className="flex flex-col h-screen bg-base-200">
//     {/* Header */}
//     <header className="flex-none p-4 border-b border-base-300 bg-base-100 shadow">
//       <h1 className="font-bold text-lg">Rich Chat Message Demo</h1>
//     </header>

//     {/* Messages */}
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {messages.map((msg) => (
//         <div
//           key={msg.id}
//           className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}
//         >
//           <div
//             className={`chat-bubble max-w-[75%] prose prose-sm dark:prose-invert break-words ${
//               msg.sender === "me"
//                 ? "chat-bubble-primary"
//                 : "chat-bubble-secondary"
//             }`}
//           >
//             <div
//               className=" "
//               dangerouslySetInnerHTML={{ __html: msg.text }}
//             />
//           </div>

//           <div className="chat-footer opacity-70 text-xs">
//             {msg.timestamp.toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </div>
//         </div>
//       ))}

//       <div ref={bottomRef} />
//     </div>

//     {/* Input area */}
//     <div className="flex-none p-4">
//       <div className="max-w-4xl mx-auto">
//         <MessageInput
//           value={inputValue}
//           onChange={setInputValue}
//           // enabledTools={[]}
//           onSend={handleSendMessage}
//           // className="w-full  rounded-xl"
//           placeholder="Type a message..."
//         />
//       </div>
//     </div>
//   </div>
// );
