"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ChangeEvent, useId, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";

const MessageFooter = () => {
  const id = useId();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const defaultRows = 1;
  const maxRows = 4; // You can set a max number of rows

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";

    const style = window.getComputedStyle(textarea);
    const borderHeight =
      parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth);
    const paddingHeight =
      parseInt(style.paddingTop) + parseInt(style.paddingBottom);

    const lineHeight = parseInt(style.lineHeight);
    const maxHeight = maxRows
      ? lineHeight * maxRows + borderHeight + paddingHeight
      : Infinity;

    const newHeight = Math.min(textarea.scrollHeight + borderHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };
  return (
    <footer className=" bottom-0 absolute w-full border-t border-t-base-300 bg-base-200">
      <div className=" flex w-full py-4 space-x-2 px-4 items-end">
        <Button variant="ghost" size="md" library="daisy" shape="circle">
          <BsEmojiSmile size={20} />
        </Button>
        <Button variant="ghost" size="md" library="daisy" shape="circle">
          <GrAttachment size={20} />
        </Button>
        <div className=" w-full">
          <Label htmlFor={id} className=" sr-only">
            Message
          </Label>
          <Textarea
            id={id}
            placeholder="Type message"
            ref={textareaRef}
            onChange={handleInput}
            rows={defaultRows}
            className="resize-none min-h-0 max-h-40 overflow-y-auto scrollbar-hide w-full"
          />
        </div>
        <Button variant="ghost" size="md" library="daisy" shape="circle">
          <VscSend size={20} />
        </Button>
      </div>
    </footer>
  );
};

export default MessageFooter;
