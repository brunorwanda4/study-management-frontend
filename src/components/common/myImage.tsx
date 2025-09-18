"use client";

import { cn } from "@/lib/utils"; // Assuming this is your utility for classnames
import NextImage from "next/image"; // Renamed to avoid conflict with component name
import { SyntheticEvent, useEffect, useState } from "react";

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

  /** ✅ Added width/height props */
  width?: number | string;
  height?: number | string;
  useSkeleton?: boolean;
  draggable?: boolean;
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

  /** ✅ Destructure width/height props */
  width,
  height,
}: MyImageProps) => {
  const [currentAttemptSrc, setCurrentAttemptSrc] = useState(initialSrc);
  const [imageStatus, setImageStatus] = useState<
    "loading" | "loaded" | "failedInitial" | "failedFallback"
  >("loading");

  useEffect(() => {
    setCurrentAttemptSrc(initialSrc);
    setImageStatus("loading");
  }, [initialSrc]);

  const handleLoadingComplete = () => setImageStatus("loaded");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleError = (_e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (imageStatus === "loading" && currentAttemptSrc === initialSrc) {
      if (initialSrc === fallbackSrc) {
        setImageStatus("failedFallback");
      } else {
        setCurrentAttemptSrc(fallbackSrc);
        setImageStatus("failedInitial");
      }
    } else if (
      imageStatus === "failedInitial" &&
      currentAttemptSrc === fallbackSrc
    ) {
      setImageStatus("failedFallback");
    }
  };

  const showSkeleton =
    imageStatus === "loading" || imageStatus === "failedInitial";
  const showImage = imageStatus === "loaded";
  const showPermanentFailurePlaceholder = imageStatus === "failedFallback";

  const imageElement = !showPermanentFailurePlaceholder ? (
    <NextImage
      key={currentAttemptSrc}
      src={currentAttemptSrc}
      draggable
      onClick={onClick}
      alt={alt}
      className={cn(
        "object-cover transition-opacity duration-300 ease-in-out",
        showImage ? "opacity-100" : "opacity-0",
        role === "AVATAR" && "mask mask-squircle size-8",
        classname,
      )}
      /** ✅ Allow width/height OR fallback to `fill` */
      {...(width && height
        ? { width: Number(width), height: Number(height) }
        : { fill: true })}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={TINY_TRANSPARENT_GIF}
      quality={quality}
      priority={priority}
      onLoad={handleLoadingComplete}
      onError={handleError}
      unoptimized={
        currentAttemptSrc.startsWith("data:") ||
        currentAttemptSrc === TINY_TRANSPARENT_GIF
      }
    />
  ) : null;

  return (
    <div
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
