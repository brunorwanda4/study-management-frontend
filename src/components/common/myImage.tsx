"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { RefObject, SyntheticEvent, useEffect, useState } from "react";

const TINY_TRANSPARENT_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

interface MyImageProps {
  src: string;
  alt?: string;
  className?: string;
  classname?: string;
  role?: "ICON" | "AVATAR";
  fallbackSrc?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  onClick?: () => void;
  width?: number | string;
  height?: number | string;
  useSkeleton?: boolean;
  draggable?: boolean;
  loading?: "lazy" | "eager";
  original?: boolean;
  ref?: RefObject<HTMLImageElement | null>;
}

/**
 * Generates a small blurry version of an image for placeholder.
 * Uses an offscreen <canvas> to downscale it.
 */
async function generateLowQualityPreview(src: string): Promise<string> {
  try {
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = src;
    await new Promise((res, rej) => {
      img.onload = res;
      img.onerror = rej;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    const scale = 0.03; // 3% of original size
    const w = Math.max(8, img.width * scale);
    const h = Math.max(8, img.height * scale);

    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.3); // Very low quality
  } catch {
    return TINY_TRANSPARENT_GIF;
  }
}

const MyImage = ({
  src: initialSrc,
  alt = "Default alt text",
  className,
  classname,
  role,
  draggable,
  useSkeleton = false,
  fallbackSrc = "/icons/photo.svg",
  priority = false,
  quality = 75,
  onClick,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width,
  height,
  loading = "lazy",
  original = false,
  ref,
}: MyImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [previewSrc, setPreviewSrc] = useState<string>(TINY_TRANSPARENT_GIF);
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "failedInitial" | "failedFallback"
  >("loading");

  // Whenever the source changes, regenerate preview
  useEffect(() => {
    let active = true;

    setImageStatus("loading");
    setCurrentSrc(initialSrc);

    // Generate auto low-quality preview
    generateLowQualityPreview(initialSrc)
      .then((blurred) => {
        if (active) setPreviewSrc(blurred);
      })
      .catch(() => setPreviewSrc(TINY_TRANSPARENT_GIF));

    return () => {
      active = false;
    };
  }, [initialSrc]);

  const handleLoadingComplete = () => setImageStatus("loaded");

  const handleError = (_e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc === fallbackSrc) {
      setImageStatus("failedFallback");
    } else {
      setCurrentSrc(fallbackSrc);
      setImageStatus("failedInitial");
    }
  };

  const showSkeleton =
    imageStatus === "loading" || imageStatus === "failedInitial";
  const showImage = imageStatus === "loaded";
  const showPermanentFailurePlaceholder = imageStatus === "failedFallback";

  const imageElement = !showPermanentFailurePlaceholder ? (
    <NextImage
      key={currentSrc}
      src={currentSrc}
      draggable={draggable}
      onClick={onClick}
      ref={ref}
      alt={alt}
      className={cn(
        "object-cover transition-all duration-700 ease-in-out",
        showImage ? "blur-0 opacity-100" : "opacity-60 blur-md",
        role === "AVATAR" && "mask mask-squircle size-8",
        classname,
      )}
      {...(width && height
        ? { width: Number(width), height: Number(height) }
        : { fill: true })}
      sizes={original ? undefined : sizes}
      placeholder="blur"
      blurDataURL={previewSrc} // ✅ Auto-generated low-quality preview
      quality={original ? undefined : quality}
      priority={priority}
      loading={priority ? undefined : loading}
      onLoad={handleLoadingComplete}
      onError={handleError}
      unoptimized={original}
    />
  ) : null;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        role === "ICON" ? "size-4" : "size-32",
        className,
      )}
    >
      {showSkeleton && (
        <div
          className={cn(
            "absolute inset-0",
            role === "AVATAR" && "mask mask-squircle",
            useSkeleton ? "skeleton" : "bg-muted",
          )}
          aria-hidden="true"
        />
      )}

      {imageElement}

      {showPermanentFailurePlaceholder && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center p-2 text-gray-500 dark:text-gray-400",
            role === "AVATAR" && "mask mask-squircle",
          )}
          role="img"
          aria-label={alt || "Image not available"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40%"
            height="40%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default MyImage;
