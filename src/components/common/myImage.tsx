"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { RefObject, SyntheticEvent, useEffect, useState } from "react";

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

// 🧠 In-memory cache for instant reuse (real image URLs)
const loadedImages = new Set<string>();

const MyImage = ({
  src: initialSrc,
  alt = "Image",
  className,
  classname,
  role,
  draggable,
  useSkeleton = true,
  fallbackSrc = "/icons/photo.svg",
  priority = false,
  quality = 85,
  onClick,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width,
  height,
  loading = "lazy",
  original = false,
  ref,
}: MyImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(initialSrc);
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "failedInitial" | "failedFallback"
  >(loadedImages.has(initialSrc) ? "loaded" : "loading");

  // Prefetch image manually (real image)
  useEffect(() => {
    let active = true;
    if (loadedImages.has(initialSrc)) {
      setImageStatus("loaded");
      return;
    }

    const img = new Image();
    img.src = initialSrc;
    img.decoding = "async";
    img.loading = "eager";
    img.onload = () => {
      if (active) {
        loadedImages.add(initialSrc);
        setImageStatus("loaded");
      }
    };
    img.onerror = () => {
      if (active) {
        setCurrentSrc(fallbackSrc);
        setImageStatus("failedInitial");
      }
    };

    return () => {
      active = false;
    };
  }, [initialSrc, fallbackSrc]);

  const showSkeleton = imageStatus === "loading";
  const showPermanentFailurePlaceholder = imageStatus === "failedFallback";

  const handleError = (_e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc === fallbackSrc) {
      setImageStatus("failedFallback");
    } else {
      setCurrentSrc(fallbackSrc);
      setImageStatus("failedInitial");
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        role === "ICON" ? "size-4" : "size-32",
        className,
      )}
    >
      {/* Skeleton only while loading */}
      {showSkeleton && (
        <div
          className={cn(
            "bg-muted/40 dark:bg-muted/20 absolute inset-0 animate-pulse",
            role === "AVATAR" && "mask mask-squircle",
            useSkeleton && "backdrop-blur-sm",
          )}
          aria-hidden="true"
        />
      )}

      {!showPermanentFailurePlaceholder && (
        <NextImage
          key={currentSrc}
          src={currentSrc}
          draggable={draggable}
          onClick={onClick}
          ref={ref}
          alt={alt}
          className={cn(
            "object-cover transition-all duration-300 ease-in-out",
            imageStatus === "loaded"
              ? "blur-0 opacity-100"
              : "scale-105 opacity-0 blur-sm",
            role === "AVATAR" && "mask mask-squircle size-8",
            classname,
          )}
          {...(width && height
            ? { width: Number(width), height: Number(height) }
            : { fill: true })}
          sizes={original ? undefined : sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : loading}
          onError={handleError}
          unoptimized={original ? true : false}
        />
      )}

      {/* Fallback placeholder if all fails */}
      {showPermanentFailurePlaceholder && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400",
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
