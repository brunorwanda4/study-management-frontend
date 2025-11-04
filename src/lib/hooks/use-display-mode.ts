"use client";

import { useCallback, useEffect, useState } from "react";

export type DisplayMode = "card" | "table";
const DISPLAY_KEY = "displayMode";

export function useDisplayMode() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("card");

  // Load saved mode on mount
  useEffect(() => {
    const saved = localStorage.getItem(DISPLAY_KEY);
    if (saved === "table" || saved === "card") {
      setDisplayMode(saved);
    }
  }, []);

  // Handle mode change
  const changeDisplayMode = useCallback((mode: DisplayMode) => {
    setDisplayMode(mode);
    localStorage.setItem(DISPLAY_KEY, mode);
    // Dispatch a custom event so other components update immediately
    window.dispatchEvent(new Event("displayModeChange"));
  }, []);

  // Listen for changes in localStorage or custom events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === DISPLAY_KEY &&
        (e.newValue === "card" || e.newValue === "table")
      ) {
        setDisplayMode(e.newValue);
      }
    };

    const handleCustom = () => {
      const saved = localStorage.getItem(DISPLAY_KEY);
      if (saved === "card" || saved === "table") {
        setDisplayMode(saved);
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("displayModeChange", handleCustom);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("displayModeChange", handleCustom);
    };
  }, []);

  return { displayMode, changeDisplayMode };
}
