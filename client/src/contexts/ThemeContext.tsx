"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initTheme = () => {
      try {
        const savedTheme = localStorage.getItem("theme") as
          | "light"
          | "dark"
          | null;
        // Default to dark mode, only use light if explicitly saved
        const initialTheme = savedTheme || "dark";

        setTheme(initialTheme);

        // Apply theme to document - ALWAYS start with clean slate
        document.documentElement.classList.remove("light", "dark");
        if (initialTheme === "dark") {
          document.documentElement.classList.add("dark");
        }
        // Don't add "dark" class - let it be the default

        // console.log("Theme initialized:", initialTheme);
      } catch (error) {
        console.error("Theme initialization error:", error);
        // Fallback to dark mode
        setTheme("dark");
        document.documentElement.classList.remove("light", "dark");
      }

      setMounted(true);
    };

    initTheme();
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    try {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
      // Dark mode = no class (default)

      // console.log("Theme toggled to:", newTheme);
    } catch (error) {
      console.error("Theme toggle error:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
