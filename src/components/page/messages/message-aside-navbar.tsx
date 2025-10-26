"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type MessageTypes = "friends" | "requests";

const MessagesAsideNavbar = () => {
  const [choose, setChoose] = useState<MessageTypes>(() => {
    const storedChoice = localStorage.getItem("chooseMessages") as MessageTypes;
    if (storedChoice) return storedChoice;
    const params = new URLSearchParams(window.location.search);
    return (params.get("type") as MessageTypes) || "friends";
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("type", choose);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`,
    );

    localStorage.setItem("typeMessages", choose);
  }, [choose]);
  const handleChangeMessages = (choice: MessageTypes) => {
    setChoose(choice);
  };
  const messageType = new URLSearchParams(window.location.search).get("type");
  return (
    <nav className=" border-b border-b-base-300 px-2 flex  space-x-4">
      <div
        className={cn(
          "h-8 pt-1 ",
          messageType === "requests" && "border-b-2 border-b-info",
        )}
      >
        <button type="button" onClick={() => handleChangeMessages("friends")}>
          Friends
        </button>
      </div>
      <div
        className={cn(
          "h-8 pt-1 ",
          messageType === "friends" && "border-b-2 border-b-info",
        )}
      >
        <button type="button" onClick={() => handleChangeMessages("requests")}>
          Requests
        </button>
      </div>
    </nav>
  );
};

export default MessagesAsideNavbar;
