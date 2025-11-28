"use client";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AtSign,
  Bold,
  Check,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Plus,
  SendHorizontal,
  Smile,
  Strikethrough,
  Type,
  Underline as UnderlineIcon,
} from "lucide-react";

export type EditorTool = "emoji" | "toolbar" | "metion" | "files" | "send";

interface MessageInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  enabledTools?: EditorTool[];
  mentionableUsers?: { id: string; name: string; status?: string }[];
}

const ToolbarButton = ({
  icon: Icon,
  isActive,
  onClick,
  label,
}: {
  icon: React.ElementType;
  isActive?: boolean;
  onClick: () => void;
  label: string;
}) => (
  <Button
    variant="ghost"
    size="sm"
    library="daisy"
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
    type="button"
    className={cn(
      isActive
        ? "bg-base-content/10"
        : "text-muted-foreground hover:text-foreground",
    )}
    title={label}
    aria-label={label}
  >
    <Icon size={16} />
  </Button>
);

export default function MessageInput({
  value = "",
  onChange,
  onSend,
  disabled = false,
  className,
  placeholder = "Message #general",
  enabledTools = ["toolbar", "emoji", "files", "metion", "send"],
  mentionableUsers = [
    { id: "1", name: "Alice", status: "online" },
    { id: "2", name: "Bob", status: "away" },
    { id: "3", name: "Charlie", status: "offline" },
    { id: "4", name: "David", status: "online" },
    { id: "5", name: "Eve", status: "busy" },
  ],
}: MessageInputProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);

  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  const editorRef = useRef<HTMLDivElement>(null);
  const emojiTriggerRef = useRef<HTMLDivElement>(null);
  const userTriggerRef = useRef<HTMLDivElement>(null);
  const pickerContainerRef = useRef<HTMLDivElement>(null);

  // Single click-outside handler for both popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiTriggerRef.current &&
        !emojiTriggerRef.current.contains(event.target as Node) &&
        pickerContainerRef.current &&
        !pickerContainerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }

      if (
        showUserPicker &&
        userTriggerRef.current &&
        !userTriggerRef.current.contains(event.target as Node)
      ) {
        setShowUserPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker, showUserPicker]);

  // Keep editor content in sync when `value` prop changes from parent
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    // only update if external value differs from current DOM to avoid clobbering user edits
    if (value !== el.innerHTML) {
      el.innerHTML = value || "";
    }
  }, [value]);

  // --- Core editor helpers ---
  const checkActiveStyles = () => {
    const styles: string[] = [];
    try {
      if (document.queryCommandState("bold")) styles.push("bold");
      if (document.queryCommandState("italic")) styles.push("italic");
      if (document.queryCommandState("underline")) styles.push("underline");
      if (document.queryCommandState("strikeThrough")) styles.push("strike");
      if (document.queryCommandState("insertUnorderedList"))
        styles.push("list");
      if (document.queryCommandState("insertOrderedList"))
        styles.push("orderedList");
    } catch (e) {
      // execCommand / queryCommandState can throw in some environments — ignore
    }
    setActiveStyles(styles);
  };

  // executeCommand now also triggers handleInput so parent gets updated
  const executeCommand = (command: string, valueArg: string | null = null) => {
    try {
      document.execCommand(command, false, valueArg ?? "");
    } catch (e) {
      // ignore; execCommand is deprecated but widely supported — consider a modern RichText library
    }
    editorRef.current?.focus();
    checkActiveStyles();
    handleInput(); // ensure parent sees the new content
  };

  const handleInput = () => {
    const content = editorRef.current?.innerHTML || "";
    onChange?.(content);

    // detect @ trigger
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const node = range.startContainer;
      const offset = range.startOffset;
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        const charBefore = node.textContent.charAt(offset - 1);
        if (charBefore === "@") {
          setShowUserPicker(true);
        }
      }
    }

    checkActiveStyles();
  };

  const insertEmoji = (emojiData: any) => {
    // emoji-mart v5 returns object with {native} for native char
    if (emojiData?.native) {
      executeCommand("insertText", emojiData.native);
      setShowEmojiPicker(false);
    } else if (typeof emojiData === "string") {
      executeCommand("insertText", emojiData);
      setShowEmojiPicker(false);
    }
  };

  // --- Link handling ---
  const openLinkDialog = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      // clone the range so it doesn't change
      setSavedRange(range.cloneRange());
      setLinkText(range.toString());
    } else {
      setSavedRange(null);
      setLinkText("");
    }
    setLinkUrl("");
    setShowLinkDialog(true);
  };

  const confirmLink = () => {
    if (!linkUrl) {
      setShowLinkDialog(false);
      return;
    }

    if (savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(savedRange);
    } else {
      editorRef.current?.focus();
    }

    const display = linkText || linkUrl;
    const safeHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline; color: #2563eb;">${display}</a>&nbsp;`;
    try {
      document.execCommand("insertHTML", false, safeHtml);
    } catch {
      // fallback: insert plain text link if execCommand fails
      document.execCommand("insertText", false, display + " ");
    }
    setShowLinkDialog(false);
    setLinkText("");
    setLinkUrl("");
    handleInput();
  };

  // --- Keyboard behavior ---
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isUnordered = document.queryCommandState("insertUnorderedList");
    const isOrdered = document.queryCommandState("insertOrderedList");
    const isListActive = isUnordered || isOrdered;

    // --- ENTER KEY ---
    if (e.key === "Enter" && isListActive) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const li = range.startContainer.parentElement?.closest("li");

      // If user presses Enter on empty <li> → exit list
      if (li && li.textContent?.trim() === "") {
        e.preventDefault();
        document.execCommand("insertParagraph");
        document.execCommand("outdent"); // exit list
        checkActiveStyles();
        return;
      }

      // Let browser naturally create a new <li>
      return;
    }

    // --- BACKSPACE BEHAVIOR ---
    if (e.key === "Backspace" && isListActive) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const li = range.startContainer.parentElement?.closest("li");

      // Backspace inside an empty list item → exit list
      if (li && li.textContent === "") {
        e.preventDefault();
        document.execCommand("outdent");
        checkActiveStyles();
        return;
      }
    }

    // --- SEND MESSAGE ---
    if (e.key === "Enter" && !e.shiftKey && !isListActive) {
      e.preventDefault();
      onSend?.();
    }
  };

  // --- Mention insertion ---
  const insertMention = (name: string) => {
    const html = `<span style="color: #2563eb; font-weight:600; background-color: rgba(37,99,235,0.08); padding:1px 4px; border-radius:4px;" contenteditable="false">@${name}</span>&nbsp;`;
    try {
      document.execCommand("insertHTML", false, html);
    } catch {
      document.execCommand("insertText", false, `@${name} `);
    }
    setShowUserPicker(false);
    handleInput();
  };

  const toggleList = (type: "ul" | "ol") => {
    if (type === "ul") {
      document.execCommand("insertUnorderedList");
    } else {
      document.execCommand("insertOrderedList");
    }

    editorRef.current?.focus();
    checkActiveStyles();
    handleInput();
  };

  return (
    <div
      className={cn(
        "flex w-full flex-col border-sm bg-base-100 transition-all focus-within:ring-1 focus-within:ring-primary/20 relative card",
        className,
      )}
    >
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-1 border-b border-base-content/50 p-2 bg-muted/30 animate-in slide-in-from-top-1 fade-in duration-200">
          <ToolbarButton
            icon={Bold}
            isActive={activeStyles.includes("bold")}
            onClick={() => executeCommand("bold")}
            label="Bold"
          />
          <ToolbarButton
            icon={Italic}
            isActive={activeStyles.includes("italic")}
            onClick={() => executeCommand("italic")}
            label="Italic"
          />
          <ToolbarButton
            icon={UnderlineIcon}
            isActive={activeStyles.includes("underline")}
            onClick={() => executeCommand("underline")}
            label="Underline"
          />
          <ToolbarButton
            icon={Strikethrough}
            isActive={activeStyles.includes("strike")}
            onClick={() => executeCommand("strikeThrough")}
            label="Strikethrough"
          />

          <div className="mx-1 h-4 w-px bg-border" />
          <ToolbarButton
            icon={LinkIcon}
            isActive={false}
            onClick={openLinkDialog}
            label="Link"
          />
          <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Link</DialogTitle>
                <DialogDescription>
                  Create a link to a web page or file.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="link-text" className="text-xs">
                    Text (Optional)
                  </Label>
                  <Input
                    id="link-text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="h-8 text-sm"
                    placeholder="Clickable text"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="link-url" className="text-xs">
                    URL
                  </Label>
                  <Input
                    id="link-url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="h-8 text-sm"
                    placeholder="https://example.com"
                    autoFocus
                  />
                </div>
                <DialogFooter className="flex justify-end gap-2">
                  <DialogClose>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLinkDialog(false)}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button size="sm" onClick={confirmLink}>
                    Insert
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          <ToolbarButton
            isActive={activeStyles.includes("list")}
            onClick={() => toggleList("ul")}
            icon={List}
            label="Bullet List"
          />
          <ToolbarButton
            icon={ListOrdered}
            isActive={activeStyles.includes("orderedList")}
            onClick={() => toggleList("ol")}
            label="Ordered List"
          />
        </div>
      )}

      <div
        className="relative flex-1 min-h-[80px] max-h-[400px] overflow-y-auto cursor-text p-3"
        onClick={() => editorRef.current?.focus()}
      >
        {/* placeholder */}
        {!value &&
          (!editorRef.current ||
            editorRef.current.innerText.trim().length === 0) && (
            <div className="absolute top-3 left-3 text-muted-foreground pointer-events-none select-none opacity-50">
              {placeholder}
            </div>
          )}

        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onKeyUp={checkActiveStyles}
          onMouseUp={checkActiveStyles}
          onKeyDown={handleKeyDown}
          role="textbox"
          aria-multiline="true"
          className="outline-none prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:pl-1 whitespace-pre-wrap break-words"
        />
      </div>

      <div className="flex items-center justify-between p-2 bg-transparent mt-auto relative border-t border-transparent">
        <div className="flex items-center gap-1">
          {enabledTools.includes("files") && (
            <Button
              variant="ghost"
              size="sm"
              className=" rounded-full bg-muted/40 text-base-content"
              library="daisy"
              type="button"
            >
              <Plus size={18} />
            </Button>
          )}

          {enabledTools.includes("emoji") && (
            <div className="relative" ref={emojiTriggerRef}>
              <Button
                variant="ghost"
                size="sm"
                library="daisy"
                className={cn(showEmojiPicker && "bg-accent")}
                onClick={() => setShowEmojiPicker((s) => !s)}
                aria-expanded={showEmojiPicker}
                aria-haspopup="dialog"
              >
                <Smile size={20} />
              </Button>

              {showEmojiPicker && (
                <div
                  ref={pickerContainerRef}
                  className="absolute bottom-12 left-0 z-50 rounded-xl shadow-1xl border bg-background overflow-hidden animate-in fade-in"
                >
                  {/* React Picker; pass `data` for offline support */}
                  <Picker
                    data={data}
                    onEmojiSelect={insertEmoji}
                    theme="auto"
                    previewPosition="none"
                    skinTonePosition="preview"
                    searchPosition="static"
                    // do not style the picker aggressively; let it inherit
                  />
                </div>
              )}
            </div>
          )}

          {enabledTools.includes("toolbar") && (
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2  font-medium transition-colors hover:bg-muted",
                showToolbar && "bg-accent",
              )}
              onClick={() => setShowToolbar((s) => !s)}
            >
              <Type size={16} className="mr-1" />
              <span className="text-xs font-bold">Aa</span>
            </Button>
          )}

          {enabledTools.includes("metion") && (
            <div className="relative" ref={userTriggerRef}>
              <Popover open={showUserPicker} onOpenChange={setShowUserPicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 text-muted-foreground",
                      showUserPicker && "bg-accent text-accent-foreground",
                    )}
                    onClick={() => setShowUserPicker((s) => !s)}
                    aria-expanded={showUserPicker}
                  >
                    <AtSign size={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Mention someone
                  </span>
                  <div className="max-h-[200px] overflow-y-auto p-1">
                    {mentionableUsers?.map((user) => (
                      <button
                        type="button"
                        key={user.id}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground text-left transition-colors group"
                        onClick={() => insertMention(user.name)}
                      >
                        <div className="relative">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                            {user.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span
                            className={cn(
                              "absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-background rounded-full",
                              user.status === "online"
                                ? "bg-green-500"
                                : user.status === "busy"
                                  ? "bg-red-500"
                                  : "bg-gray-400",
                            )}
                          />
                        </div>
                        <span className="flex-1 font-medium">{user.name}</span>
                        <Check
                          size={14}
                          className="invisible group-hover:visible text-primary"
                        />
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>

        {enabledTools.includes("send") && (
          <Button
            onClick={onSend}
            variant={value ? "primary" : "ghost"}
            aria-label="Send message"
            library="daisy"
          >
            <SendHorizontal size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}
