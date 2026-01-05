"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import * as React from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-bg-secondary animate-pulse" />
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-secondary text-foreground hover:bg-bg-tertiary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={t("toggle")}
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-border bg-glass backdrop-blur-xl shadow-lg animate-scale-in origin-top-right overflow-hidden z-50">
          <div className="p-1 flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => {
                setTheme("light");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                theme === "light"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-bg-tertiary hover:text-foreground"
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>{t("light")}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-bg-tertiary hover:text-foreground"
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>{t("dark")}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("system");
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                theme === "system"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-bg-tertiary hover:text-foreground"
              }`}
            >
              <Monitor className="h-4 w-4" />
              <span>{t("system")}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  ); // Fixed: Added closing parenthesis
}
