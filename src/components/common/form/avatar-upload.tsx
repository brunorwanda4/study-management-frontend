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
  maxSize?: number; // Default: 2MB
}

export function UploadAvatar({
  value,
  onChange,
  disabled = false,
  className,
  maxSize = 2 * 1024 * 1024,
  avatarProps,
  description,
}: UploadAvatarProps) {
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // dialog state for cropping
  const [editorOpen, setEditorOpen] = useState(false);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);

  const triggerUpload = () => {
    // clear input to allow selecting same file again
    if (inputRef.current) inputRef.current.value = "";
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");

    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("Please choose a valid image file.");
      return;
    }

    // Validate size
    if (file.size > maxSize) {
      setError(
        `Image must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB.`,
      );
      return;
    }

    // Read file as data URL and open cropper dialog
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result?.toString() || "";
      setPendingSrc(dataUrl);
      setEditorOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Convert blob returned by cropper to data URL then call onChange
  const handleEditorComplete = (blob: Blob | null) => {
    onChange("");
    if (!blob) {
      // user cancelled or no result
      setPendingSrc(null);
      setEditorOpen(false);
      return;
    }

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result?.toString() || "";
      onChange(dataUrl);
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
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer">
          <MyAvatar src={value || undefined} {...avatarProps} />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="default"
                size="xs"
                disabled={disabled}
                library="daisy"
                className={cn("absolute -bottom-2", value && " z-20 left-0")}
              >
                <LuPencil /> Change
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-1 flex flex-col gap-1 w-40">
              <Button
                type="button"
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
                  type="button"
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
        </div>

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

      <p className="text-xs text-neutral">
        Recommended: Square image, max {(maxSize / (1024 * 1024)).toFixed(1)}MB.
      </p>

      {description && <p className="text-xs text-neutral">{description}</p>}

      {/* Image editor dialog opens after selecting a file */}
      {pendingSrc && (
        <ImageEditorDialog
          open={editorOpen}
          onOpenChange={(open) => {
            setEditorOpen(open);
            if (!open) setPendingSrc(null);
          }}
          src={pendingSrc}
          onComplete={handleEditorComplete}
          initialAspectRatio={1} // square avatar by default
        />
      )}
    </div>
  );
}
