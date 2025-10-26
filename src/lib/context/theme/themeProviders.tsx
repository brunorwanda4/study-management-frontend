"use client";

import { createContext, type ReactNode, useEffect, useState } from "react";

export const ThemeContext = createContext<{
  theme: string;
  changeTheme: (theme: string) => void;
} | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");
  const [isMounted, setIsMounted] = useState(false);

  // const theme =

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the component mounts

    // Access localStorage only on the client
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") || "dark";
      setTheme(storedTheme);
    }
  }, []);

  const changeTheme = (theme: string) => {
    if (typeof window !== "undefined") {
      if (theme !== localStorage.getItem("theme")) {
        localStorage.setItem("theme", theme);
        setTheme(theme);
      }
    }
  };

  if (!isMounted) {
    // Simplified loading state to avoid complex rendering logic
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="line items-center justify-center flex flex-col gap-3">
          <span className="loading loading-spinner loading-lg text-info" />
        </div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
