"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ChangeEvent, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  imageClassName?: string;
  defaultImage?: string;
  maxSize?: number; // in bytes (default 2MB)
}

export function ImageUpload({
  value,
  onChange,
  disabled = false,
  className = "",
  imageClassName = "h-24 w-24 rounded border object-cover",
  defaultImage = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg",
  maxSize = 2 * 1024 * 1024, // 2MB default
}: ImageUploadProps) {
  const [error, setError] = useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Check if the file is an image
      if (!file.type.includes("image")) {
        return setError("Please select an image file (JPEG, PNG, etc.)");
      }

      // Check file size
      if (file.size > maxSize) {
        return setError(`Image must be less than ${maxSize / (1024 * 1024)}MB`);
      }

      // Client-side processing only
      fileReader.onload = (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        onChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center gap-4">
        <label htmlFor="image-upload" className="cursor-pointer">
          <Image
            src={value || defaultImage}
            width={96}
            height={96}
            className={cn("object-contain", imageClassName)}
            alt="Class image preview"
          />
        </label>

        <div className="flex flex-col gap-2">
          <Input
            id="image-upload"
            disabled={disabled}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("image-upload")?.click()}
            disabled={disabled}
          >
            {value ? "Change Image" : "Upload Image"}
          </Button>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Recommended: Square image, max {maxSize / (1024 * 1024)}MB
      </p>
    </div>
  );
}
