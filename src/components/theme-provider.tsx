"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme" // This instructs next‑themes to update document.documentElement.dataset.theme
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
