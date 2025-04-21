"use client";

import { useContext } from "react";
// import { cn } from "@/lib/utils";
import { ThemeContext } from "./themeProviders";
import { NextThemeProvider } from "./next-theme-provider";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const ClientThemeWrapper = ({ children }: Props) => {
  const { theme } = useContext(ThemeContext)!;

  if (!theme) {
    return null;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main data-theme={theme} className="">{children}</main>
    </NextThemeProvider>
  );
};
