"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fileToBase64 } from "@/lib/helpers/file-to-base-64";
import { useFileUpload } from "@/lib/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import {
  AlertCircleIcon,
  ImageUpIcon,
  Link as LinkIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";

interface Props {
  value: string | null;
  className?: string;
  disabled?: boolean;
  maxSizeMB?: number; // default 2MB
  onChange: (value: string | null) => void;
  classname?: string;
  Classname?: string;
}

export default function UploadImage({
  value,
  className,
  disabled,
  maxSizeMB = 2,
  onChange,
  classname,
  Classname,
}: Props) {
  const maxSize = maxSizeMB * 1024 * 1024;

  const [
    { files, isDragging, errors: validationErrors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const [uploadedUrl, setUploadedUrl] = useState<string | null>(value || null);
  const [urlInput, setUrlInput] = useState("");
  const [isUrl, setIsUrl] = useState(false);

  // when a new file is selected, preview it + send base64 to backend
  useEffect(() => {
    const fileToUpload = files[0]?.file;
    if (fileToUpload instanceof File) {
      const objectUrl = URL.createObjectURL(fileToUpload);
      setUploadedUrl(objectUrl);

      // ✅ convert blob -> base64 before sending to backend
      fileToBase64(fileToUpload).then((base64) => {
        onChange(base64);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(() => {
    if (value !== uploadedUrl) {
      setUploadedUrl(value || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleRemoveImage = () => {
    setUploadedUrl(null);
    onChange(null);
    if (files.length > 0) {
      removeFile(files[0].id);
    }
  };

  const displayUrl = uploadedUrl || files[0]?.preview || null;
  const allErrors = validationErrors;

  const handleIsUrl = () => {
    setIsUrl((state) => !state);
    if (displayUrl) setIsUrl(false);
  };

  useEffect(() => {
    if (displayUrl) {
      setIsUrl(false);
    }
  }, [displayUrl]);

  return (
    <div
      className={cn(
        "flex size-60 w-full max-w-lg flex-col gap-4 rounded-xl shadow-md",
        className,
      )}
    >
      <div className={cn("relative", className)}>
        <div
          role="button"
          tabIndex={0}
          onClick={!disabled && !displayUrl ? openFileDialog : undefined}
          onKeyDown={(e) =>
            e.key === "Enter" && !displayUrl && openFileDialog()
          }
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className={cn(
            isUrl
              ? "min-h-0"
              : "border-input card data-[dragging=true]:border-primary relative flex min-h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out",
            { "bg-base-200 card border-solid": displayUrl },
            { "hover:border-neutral card bg-base-100": !displayUrl },
            disabled
              ? "bg-base-300 card border-base-300 cursor-not-allowed border-solid hover:border-none"
              : "",
            Classname,
          )}
          aria-disabled={disabled}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={disabled}
          />

          {displayUrl ? (
            <Image
              src={displayUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              fill
              className={cn("object-cover", classname)}
            />
          ) : (
            <>
              {!isUrl && !displayUrl && (
                <div className="flex flex-col items-center justify-center text-center">
                  <ImageUpIcon
                    className={cn(
                      "mb-4 size-12 text-gray-400",
                      disabled ? "text-neutral" : "",
                    )}
                  />
                  <p className="mb-1.5 text-lg font-semibold text-gray-700">
                    Drop your image here
                  </p>
                  <p
                    className={cn(
                      "text-sm text-gray-500",
                      disabled ? "text-neutral" : "",
                    )}
                  >
                    or{" "}
                    <span
                      className={cn(
                        "text-base-content font-medium",
                        disabled ? "text-neutral" : "",
                      )}
                    >
                      click to browse
                    </span>
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-xs text-gray-400",
                      disabled ? "text-neutral" : "",
                    )}
                  >
                    Max file size: {maxSizeMB}MB
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {!displayUrl && (
          <Button
            type="button"
            className={cn("absolute top-2 right-4")}
            variant="ghost"
            shape="circle"
            library="daisy"
            onClick={handleIsUrl}
          >
            {!isUrl ? <LinkIcon size={20} /> : <FaRegImage size={20} />}
          </Button>
        )}

        {displayUrl && (
          <button
            type="button"
            className="focus-visible:ring-ring/50 absolute top-3 right-3 z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2"
            onClick={handleRemoveImage}
            aria-label="Remove image"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </div>

      {/* URL input */}
      {isUrl && !displayUrl && (
        <div className="grid h-full w-full place-content-center">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or paste an image URL"
              className="w-86 flex-grow"
              aria-label="Image URL"
            />
            <Button
              type="button"
              variant={!urlInput ? "outline" : "info"}
              size="sm"
              onClick={() => {
                if (urlInput) {
                  setUploadedUrl(urlInput);
                  onChange(urlInput); // already a normal URL
                  setUrlInput("");
                }
              }}
              disabled={!urlInput}
              aria-label="Upload from URL"
              library="daisy"
              shape="circle"
            >
              <LinkIcon size={20} />
            </Button>
          </div>
        </div>
      )}

      {/* Errors */}
      {allErrors.length > 0 && (
        <div
          className="bg-destructive/10 text-destructive flex items-center gap-2 rounded-md p-3 text-sm font-medium"
          role="alert"
        >
          <AlertCircleIcon className="size-5 shrink-0" />
          <span>{allErrors[0]}</span>
        </div>
      )}
    </div>
  );
}
