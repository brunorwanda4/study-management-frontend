"use client";

import MessageInput from "@/components/common/form/message-input/message-input";

const MessageFooter = () => {
  return (
    <div className=" px-2">
      <MessageInput
        classname=" min-h-10 "
        className="rounded-b-none border-b-0"
      />
    </div>
  );
};

export default MessageFooter;
