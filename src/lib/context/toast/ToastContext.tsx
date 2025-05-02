// app/providers/ToastManager.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import {
  ToastProvider as ShadcnToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useProgressTimer } from "@/hooks/useProgressTimer";
import { CustomToast } from "@/components/myComponents/custom-toast";
import { v4 as uuidv4 } from "uuid"; // npm i uuid

export type ToastType = "success" | "error" | "warning" | "info" | "default";

export interface ShowToastProps {
  id?: string;
  type?: ToastType;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  action?: ReactNode;
}

interface ToastContextType {
  showToast: (props: ShowToastProps) => void;
  dismissToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const DEFAULT_DURATION = 5000;

export const ToastManager: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toastProps, setToastProps] = useState<ShowToastProps | null>(null);
  const [open, setOpen] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(DEFAULT_DURATION);

  const dismissTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDismiss = useCallback(() => {
    setOpen(false);
    dismissTimeout.current = setTimeout(() => {
      setToastProps(null);
    }, 300); // match your animation time
  }, []);

  useEffect(() => {
    return () => {
      if (dismissTimeout.current) {
        clearTimeout(dismissTimeout.current);
      }
    };
  }, []);

  const { progress, start, pause, resume } = useProgressTimer({
    duration: currentDuration,
    onComplete: handleDismiss,
  });

  const showToast = useCallback((props: ShowToastProps) => {
    const newDuration = props.duration ?? DEFAULT_DURATION;
    const id = props.id ?? uuidv4();
    setCurrentDuration(newDuration); // Ensure duration is updated first
    setToastProps({ ...props, id, type: props.type || "default" });
    setOpen(true);
  }, []);

  useEffect(() => {
    if (open) {
      start();
    }
  }, [open, start]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) {
        handleDismiss();
      }
    },
    [handleDismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismissToast: handleDismiss }}>
      <ShadcnToastProvider swipeDirection="left">
        {children}
        {toastProps && (
          <CustomToast
            key={toastProps.id}
            open={open}
            onOpenChange={handleOpenChange}
            onPause={pause}
            onResume={resume}
            progress={progress}
            toastDuration={currentDuration}
            type={toastProps.type || "default"}
            title={toastProps.title}
            description={toastProps.description}
            action={toastProps.action}
          />
        )}
        <ToastViewport className="sm:right-auto sm:left-0" />
      </ShadcnToastProvider>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastManager");
  }
  return context;
};
