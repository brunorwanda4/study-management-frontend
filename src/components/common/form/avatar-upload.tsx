"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { LuPencil } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ImageEditorDialog from "../dialog/image-editor-dialog";
import type { MyAvatarProps } from "../image/my-avatar";
import MyAvatar from "../image/my-avatar";

export interface UploadAvatarProps {
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;

  avatarProps?: MyAvatarProps;
  description?: string;
  className?: string;
  maxSize?: number;
}

export function UploadAvatar({
  value,
  onChange,
  disabled = false,
  className,
  maxSize = 2 * 1024 * 1024,
  avatarProps,
}: UploadAvatarProps) {
  const [error, setError] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [editorOpen, setEditorOpen] = useState(false);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);

  // Open the file selector
  const triggerUpload = () => {
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.click();
    setPopoverOpen(false);
    setError("");
  };

  // When selecting a file
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    if (file.size > maxSize) {
      setError(
        `Image must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB.`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result?.toString() || "";
      setPendingSrc(dataUrl);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);

    // CLOSE POPOVER after choosing upload
    setPopoverOpen(false);
  };

  const handleEditorComplete = (blob: Blob | null) => {
    if (!blob) {
      setPendingSrc(null);
      setEditorOpen(false);
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result?.toString() || "";
      onChange(dataUrl); // Replace old image
      setPendingSrc(null);
      setEditorOpen(false);
    };
    fr.onerror = () => {
      setError("Failed to read cropped image.");
      setPendingSrc(null);
      setEditorOpen(false);
    };
    fr.readAsDataURL(blob);
  };

  const handleRemove = () => {
    onChange("");
    setError("");
    setPopoverOpen(false);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-4">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div
              className="relative cursor-pointer"
              onClick={() => setPopoverOpen((prev) => !prev)}
            >
              <MyAvatar src={value || undefined} {...avatarProps} />

              <Button
                type="button"
                size="xs"
                variant="default"
                library="daisy"
                disabled={disabled}
                className={cn(
                  "absolute -bottom-2 left-0 z-20 flex items-center gap-1",
                )}
              >
                <LuPencil /> Change
              </Button>
            </div>
          </PopoverTrigger>

          <PopoverContent className="p-1 flex flex-col gap-1 w-40">
            <Button
              variant="ghost"
              size="sm"
              disabled={disabled}
              library="daisy"
              onClick={triggerUpload}
              className="w-full justify-start"
            >
              Upload photo
            </Button>

            {value && (
              <Button
                variant="ghost"
                size="sm"
                disabled={disabled}
                library="daisy"
                onClick={handleRemove}
                className="w-full justify-start"
              >
                Remove photo
              </Button>
            )}
          </PopoverContent>
        </Popover>

        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          disabled={disabled}
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <p className="text-xs text-base-content/50">
        Recommended: Square image, max {(maxSize / (1024 * 1024)).toFixed(1)}MB.
      </p>

      {pendingSrc && (
        <ImageEditorDialog
          open={editorOpen}
          onOpenChange={(open) => {
            setEditorOpen(open);
            if (!open) setPendingSrc(null);
          }}
          src={pendingSrc}
          onComplete={handleEditorComplete}
          initialAspectRatio={1}
        />
      )}
    </div>
  );
}
