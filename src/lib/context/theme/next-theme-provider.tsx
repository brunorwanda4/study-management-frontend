"use client"

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes"

export function NextThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
