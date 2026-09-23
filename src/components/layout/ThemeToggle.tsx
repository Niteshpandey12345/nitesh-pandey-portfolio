"use client";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--c-border)] bg-[var(--c-bg-soft)] text-[var(--c-text)] transition-colors hover:border-[var(--c-accent)] ${className ?? ""}`}
    >
      {theme === "light" ? <HiOutlineMoon /> : <HiOutlineSun />}
    </button>
  );
}