"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Added tooltip imports
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type React from "react";

interface SmartPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  maxVisible?: number;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  showNextPrev?: boolean;
  className?: string;
}

const SmartPagination: React.FC<SmartPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  loading = false,
  maxVisible = 10,
  variant = "outline",
  size = "sm",
  showNextPrev = true,
  className,
}) => {
  if (totalPages <= 1) return null;

  // --- Calculate content area size ---
  // This is the number of slots available for page numbers and ellipsis
  // V_content = maxVisible - (slots for prev/next arrows)
  const V_content = maxVisible - (showNextPrev ? 2 : 0);

  // --- Check if all pages fit in the content area ---
  // This is the condition from the user: show only pages, no arrows or ellipsis.
  const showAllPagesWithoutExtras = totalPages <= V_content;

  // --- Smart Page Range Builder ---
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const N = totalPages;

    // 1. Case: Total pages is small. Show all pages. (e.g., total=2, max=7)
    // This checks if totalPages fits in the content area (maxVisible - arrow slots)
    if (showAllPagesWithoutExtras) {
      for (let i = 1; i <= N; i++) pages.push(i);
      return pages;
    }

    // 2. Case: Total pages is large (N > V_content). Use centered double ellipsis strategy.

    // W_page_count is the number of pages in the central window,
    // after accounting for Page 1, Page N, and *two* ellipses.
    // V_content - 2 (for 1 and N) - 2 (for ... ... ) = W_page_count
    const W_page_count = V_content - 4;

    // Safety check if there's no room for a stable window (e.g., V_content < 5)
    if (W_page_count < 1) {
      pages.push(1);
      if (N > 2) pages.push("...");
      pages.push(N);
      return pages;
    }

    // Determine the central window based on the current page
    const halfWindow = Math.floor(W_page_count / 2);
    let startPage = currentPage - halfWindow;
    let endPage = currentPage + (W_page_count - 1 - halfWindow);

    // Apply Boundary Constraints (must stay within [2, N-1] range)
    startPage = Math.max(2, startPage);
    endPage = Math.min(N - 1, endPage);

    // Re-adjust window size if boundary was hit (to keep stable width and absorb one gap)
    if (startPage === 2) {
      // Hit start boundary, extend window to the right (absorb start gap)
      endPage = Math.min(N - 1, 2 + W_page_count - 1);
    } else if (endPage === N - 1) {
      // Hit end boundary, shift window to the left (absorb end gap)
      startPage = Math.max(2, N - 1 - W_page_count + 1);
    }

    pages.push(1); // Always push 1

    // Add start ellipsis if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add central pages (from the calculated stable window)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add end ellipsis if needed
    if (endPage < N - 1) {
      pages.push("...");
    }

    pages.push(N); // Always push N

    return pages;
  };

  const handleClick = (page: number) => {
    if (!loading && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = generatePageNumbers();

  // Helper to get pages for tooltip
  const getHiddenPages = (index: number): { key: string; pages: number[] } => {
    const prevPage = pages[index - 1] as number; // Will be a number
    const nextPage = pages[index + 1] as number; // Will be a number
    const hidden: number[] = [];
    for (let i = prevPage + 1; i < nextPage; i++) {
      hidden.push(i);
    }
    return {
      key: `ellipsis-${index}`,
      pages: hidden,
    };
  };

  // --- Arrow visibility logic ---
  // We show arrows ONLY if:
  // 1. showNextPrev is true
  // 2. We are NOT in the "showAllPagesWithoutExtras" mode
  // 3. We are on the correct page (e.g., not page 1 for prev)
  const shouldShowPrev =
    !showAllPagesWithoutExtras && showNextPrev && currentPage > 1;
  const shouldShowNext =
    !showAllPagesWithoutExtras && showNextPrev && currentPage < totalPages;

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex items-center justify-center gap-0 select-none",
          className,
        )}
      >
        {/* Previous Button */}
        {shouldShowPrev && (
          <Button
            size={size}
            variant={variant}
            onClick={() => handleClick(currentPage - 1)}
            library="daisy"
            disabled={loading}
            className="rounded-r-none border border-base-content/50 bg-base-100 hover:bg-base-200"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        )}
        {/* Page Buttons */}
        {pages.map((p, i) => {
          const isFirstButton = i === 0;
          const isLastButton = i === pages.length - 1;

          // Conditionally apply rounded corners to first/last page buttons
          // if the prev/next arrows are hidden (either by page number OR by showAllPages)
          const firstPageButtonClasses =
            isFirstButton && !shouldShowPrev
              ? "rounded-l-md border-l"
              : " border-x";
          const lastPageButtonClasses =
            isLastButton && !shouldShowNext ? "rounded-r-md " : "border-x";

          return typeof p === "number" ? (
            <Button
              key={p}
              size={size}
              onClick={() => handleClick(p)}
              disabled={loading}
              variant={p === currentPage ? "primary" : "outline"}
              library="daisy"
              className={cn(
                "rounded-none border border-base-content/50 border-l-0",
                firstPageButtonClasses,
                lastPageButtonClasses,
                // p === currentPage &&
                //   "bg-primary text-primary-content hover:bg-primary",
              )}
            >
              {p}
            </Button>
          ) : (
            // --- Tooltip for "..." ---
            <Tooltip key={`ellipsis-${i}`}>
              <TooltipTrigger asChild>
                {/* <span
                  className={cn(
                    "flex items-center justify-center px-3 border border-base-content/50 border-l-0 bg-base-100 text-muted-foreground",
                    size === "sm" && "h-9",
                    size === "md" && "h-10",
                    size === "lg" && "h-11",
                    lastPageButtonClasses, // Apply rounding if it's the last item
                  )}
                >
                  {p}
                </span> */}
                <Button
                  variant={"outline"}
                  size={size}
                  className={cn(
                    "flex items-center justify-center border border-base-content/50 border-l-0 text-muted-foreground rounded-none border-y",
                    // size === "sm" && "h-9",
                    // size === "md" && "h-10",
                    // size === "lg" && "h-11",
                    lastPageButtonClasses, // Apply rounding if it's the last item
                  )}
                  type="button"
                >
                  {p}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex flex-wrap gap-1 max-w-xs max-h-52 overflow-y-auto">
                  {getHiddenPages(i).pages.map((hiddenPage) => (
                    <Button
                      key={hiddenPage}
                      library="daisy"
                      size="sm"
                      variant="ghost"
                      className="h-auto px-2 py-1"
                      onClick={() => handleClick(hiddenPage)}
                    >
                      {hiddenPage}
                    </Button>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {shouldShowNext && (
          <Button
            size={size}
            variant={variant}
            library="daisy"
            onClick={() => handleClick(currentPage + 1)}
            disabled={loading}
            className="rounded-l-none border border-base-content/50 bg-base-100 hover:bg-base-200 border-l-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
    </TooltipProvider>
  );
};

export default SmartPagination;
