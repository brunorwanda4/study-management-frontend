"use client";

import { cn } from "@/lib/utils"; // Assuming this is your utility for classnames
import NextImage from "next/image"; // Renamed to avoid conflict with component name
import { useState, useEffect, SyntheticEvent } from "react";

// A very small, transparent base64 encoded GIF.
// Using this for blurDataURL ensures the fastest possible placeholder generation
// and avoids issues if the actual image src is problematic for blur generation.
const TINY_TRANSPARENT_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

interface MyImageProps {
  src: string;
  alt?: string;
  className?: string; // For the wrapper div's styling and size
  classname?: string; // For the <NextImage /> component itself
  role?: "ICON" | "AVATAR";
  fallbackSrc?: string; // Custom fallback image source
  priority?: boolean; // Passed to NextImage
  quality?: number; // Passed to NextImage
  sizes?: string; // Passed to NextImage, crucial for `fill`
}

const MyImage = ({
  src: initialSrc,
  alt = "Default alt text",
  className,
  classname,
  role,
  // Default fallback. Ensure this file exists in your public folder, e.g., public/images/image-off-placeholder.svg
  fallbackSrc = "/images/image-off-placeholder.svg",
  priority = false,
  quality = 75,
  // Sensible default sizes. Adjust these based on your common image display sizes.
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: MyImageProps) => {
  // `currentAttemptSrc` is the URL that NextImage is currently trying to load.
  // It will be `initialSrc` first, then `fallbackSrc` if `initialSrc` fails.
  const [currentAttemptSrc, setCurrentAttemptSrc] = useState(initialSrc);

  // `imageStatus` tracks the loading lifecycle:
  // 'loading': Actively trying to load `currentAttemptSrc`.
  // 'loaded': `currentAttemptSrc` loaded successfully.
  // 'failedInitial': `initialSrc` failed; `currentAttemptSrc` is now `fallbackSrc` (and is loading or has failed).
  // 'failedFallback': Both `initialSrc` and `fallbackSrc` have failed.
  const [
    imageStatus,
    setImageStatus,
  ] = useState<"loading" | "loaded" | "failedInitial" | "failedFallback">(
    "loading"
  );

  // This effect resets the component's state when the `initialSrc` prop changes.
  // This is important if the MyImage component is reused with different images on the same page.
  useEffect(() => {
    setCurrentAttemptSrc(initialSrc);
    setImageStatus("loading");
  }, [initialSrc]);

  const handleLoadingComplete = () => {
    setImageStatus("loaded");
  };

  // The `_e` parameter is prefixed with an underscore to indicate it's intentionally unused,
  // satisfying the ESLint rule @typescript-eslint/no-unused-vars.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleError = (_e: SyntheticEvent<HTMLImageElement, Event>) => {
    if (imageStatus === "loading" && currentAttemptSrc === initialSrc) {
      // `initialSrc` failed.
      if (initialSrc === fallbackSrc) {
        // If initialSrc is the same as fallbackSrc, it means the only option failed.
        setImageStatus("failedFallback");
      } else {
        // Try `fallbackSrc`.
        setCurrentAttemptSrc(fallbackSrc);
        // The status 'failedInitial' implies that the fallback is now being attempted.
        // The <NextImage key={currentAttemptSrc}> will re-trigger its loading cycle.
        setImageStatus("failedInitial");
      }
    } else if (imageStatus === "failedInitial" && currentAttemptSrc === fallbackSrc) {
      // `fallbackSrc` also failed (it was attempted after initialSrc failed).
      setImageStatus("failedFallback");
    }
    // If status is already 'loaded' or 'failedFallback', errors are generally ignored,
    // though ideally they shouldn't occur if the image is already loaded or permanently failed.
  };

  // Determine visibility of different states
  // Skeleton is shown when initially loading OR when the fallback is being attempted.
  const showSkeleton = imageStatus === "loading" || imageStatus === "failedInitial";
  const showImage = imageStatus === "loaded";
  const showPermanentFailurePlaceholder = imageStatus === "failedFallback";

  // The NextImage component is only rendered if we haven't hit a permanent failure.
  // The `key` prop is essential: it forces React to create a new NextImage instance
  // when `currentAttemptSrc` changes (e.g., from initial to fallback). This ensures
  // that `onLoadingComplete` and `onError` are correctly triggered for the new source.
  const imageElement = !showPermanentFailurePlaceholder ? (
    <NextImage
      key={currentAttemptSrc} // Crucial for re-triggering load/error logic
      src={currentAttemptSrc}
      alt={alt}
      className={cn(
        "object-cover transition-opacity duration-300 ease-in-out",
        showImage ? "opacity-100" : "opacity-0", // Image fades in once loaded
        role === "AVATAR" && "mask mask-squircle", // DaisyUI mask example
        classname
      )}
      fill // Makes the image fill the parent div; parent must have position relative/absolute/fixed
      sizes={sizes} // Crucial for performance with `fill`
      placeholder="blur"
      blurDataURL={TINY_TRANSPARENT_GIF} // Fast, reliable, generic blur
      quality={quality}
      priority={priority}
      onLoadingComplete={handleLoadingComplete}
      onError={handleError}
      // Don't attempt to optimize data URLs or our tiny placeholder GIF.
      // Also, don't optimize if the fallback is a data URL (though less common).
      unoptimized={
        currentAttemptSrc.startsWith("data:") ||
        currentAttemptSrc === TINY_TRANSPARENT_GIF
      }
    />
  ) : null;

  return (
    <div
      className={cn(
        "relative overflow-hidden", // Default background, visible during skeleton/error
        // Default sizes, can be overridden by `className` prop on MyImage
        role === "ICON" ? "size-4" : "size-32",
        className // User-provided classes for the wrapper (can override size)
      )}
    >
      {showSkeleton && (
        <div
          className={cn(
            "absolute inset-0 skeleton",
            role === "AVATAR" && "mask mask-squircle skeleton"
          )}
          aria-hidden="true"
        />
      )}

      {imageElement}

      {showPermanentFailurePlaceholder && (
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-2",
            role === "AVATAR" && "mask mask-squircle"
          )}
          role="img" // Semantically it's still an image, just a fallback representation
          aria-label={alt || "Image not available"} // Accessibility for error state
        >
          {/* Placeholder Icon (e.g., ImageOff from lucide-react or similar) */}
          {/* Using an inline SVG for simplicity, ensure it's accessible */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40%" // Relative size to the container
            height="40%" // Relative size to the container
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true" // Icon is decorative, aria-label on parent is primary
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
          {/* Optional: text below icon, could be configured via props if needed */}
          {/* <span className="mt-1 text-xs text-center">Not Found</span> */}
        </div>
      )}
    </div>
  );
};

export default MyImage;

// == IMPORTANT ==
// 1. Create the fallback image: `public/images/image-off-placeholder.svg`.
//    You can use an SVG like this (example from lucide-react 'ImageOff'):
/*
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
     <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
     <line x1="2" x2="22" y1="2" y2="22"/>
   </svg>
*/
// 2. Ensure your `cn` utility and Tailwind CSS (or your chosen styling solution for `mask`, `animate-pulse`, etc.) are correctly set up.
// 3. Adjust default `sizes` prop based on your application's layout for best performance.
// 4. The parent of this component needs to define its dimensions if you want the image to fill a specific area,
//    as `fill` on `NextImage` makes it expand to the size of its positioned parent.
//    The `className` on `MyImage` can be used to set these dimensions on the wrapper div.
