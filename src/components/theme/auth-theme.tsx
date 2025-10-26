"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function AuthTheme() {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className=" ">
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium  cursor-pointer">
        <Switch
          name="auth-theme"
          checked={isDark}
          onCheckedChange={toggleTheme}
          className="peer data-[state=checked]:bg-input/50 data-[state=unchecked]:bg-input/50 absolute inset-0 h-[inherit] w-auto [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="peer-data-[state=unchecked]: /70 pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center">
          <SunIcon size={16} aria-hidden="true" />
        </span>
        <span className="peer-data-[state=checked]: /70 pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center">
          <MoonIcon size={16} aria-hidden="true" />
        </span>
      </div>
      <Label htmlFor="auth-theme" className="sr-only">
        Theme toggle
      </Label>
    </div>
  );
}
