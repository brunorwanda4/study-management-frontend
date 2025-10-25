// components/ui/custom-toast.tsx
"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Toast, // The base shadcn/ui Toast component
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";
import { ToastType } from "@/lib/context/toast/ToastContext";

// Define OUR component's props independently
export interface CustomToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPause?: () => void; // Optional pause handler
  onResume?: () => void; // Optional resume handler
  type: ToastType;
  title: React.ReactNode; // Keep this flexible
  description?: React.ReactNode; // Keep this flexible
  action?: React.ReactNode;
  progress: number;
  toastDuration: number;
  // Add any other props you might need to pass directly to the underlying Toast, if any
  // For example, if you needed to control the variant dynamically:
  variant?: "default" | "destructive";
}

// Helper function remains the same
const getToastStyle = (type: ToastType) => {
  switch (type) {
    case "success":
      return {
        Icon: CircleCheckIcon,
        iconClass: "text-emerald-500",
        progressClass: "bg-emerald-500",
      };
    case "error":
      return {
        Icon: XCircleIcon,
        iconClass: "text-red-500",
        progressClass: "bg-red-500",
      };
    case "warning":
      return {
        Icon: AlertTriangleIcon,
        iconClass: "text-yellow-500",
        progressClass: "bg-yellow-500",
      };
    case "info":
      return {
        Icon: InfoIcon,
        iconClass: "text-blue-500",
        progressClass: "bg-blue-500",
      };
    case "default":
    default:
      return {
        Icon: InfoIcon,
        iconClass: "text-foreground",
        progressClass: "bg-foreground",
      };
  }
};

// Destructure props based on the NEW CustomToastProps interface
export function CustomToast({
  open,
  onOpenChange,
  onPause,
  onResume,
  type,
  title,
  description,
  action,
  progress,
  toastDuration,
  variant,
}: // variant, // Example if you added variant prop
CustomToastProps) {
  const { Icon, iconClass, progressClass } = getToastStyle(type);

  return (
    // Pass only the props the base <Toast> expects
    <Toast
      open={open}
      onOpenChange={onOpenChange}
      onPause={onPause}
      onResume={onResume}
      variant={variant || (type === "error" ? "destructive" : "default")} // Example: map type to variant if needed
      // duration={toastDuration} // Pass duration if shadcn/ui <Toast> uses it directly (check its API)
      // Usually, we handle duration externally with the timer,
      // but passing it might be useful for accessibility/screen readers.
    >
      <div className="flex w-full justify-between gap-3">
        {Icon && (
          <Icon
            className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`}
            aria-hidden="true"
          />
        )}

        <div className="flex grow flex-col gap-2">
          <div className="space-y-1">
            {/* Use our ReactNode title directly with ToastTitle */}
            <ToastTitle>{title}</ToastTitle>
            {description && (
              /* Use our ReactNode description directly with ToastDescription */
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>

        <ToastClose asChild>
          <Button
            variant="ghost"
            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
            aria-label="Close notification"
          >
            <XIcon
              size={16}
              className="opacity-60 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Button>
        </ToastClose>
      </div>

      {toastDuration > 0 && progress > 0 && (
        <div className="contents" aria-hidden="true">
          <div
            className={`pointer-events-none absolute bottom-0 left-0 h-1 w-full ${progressClass}`}
            style={{
              width: `${(progress / toastDuration) * 100}%`,
              transition:
                progress === toastDuration ? "none" : "width 100ms linear",
            }}
          />
        </div>
      )}
    </Toast>
  );
}
