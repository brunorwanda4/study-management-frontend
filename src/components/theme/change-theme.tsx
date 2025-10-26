"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // If "themes" is not provided by next-themes, define your DaisyUI themes here:
  const daisyThemes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "retro",
    "cyberpunk",
    "valentine",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
  ];

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <select
      className="select select-bordered"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {daisyThemes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
