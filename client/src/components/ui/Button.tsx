"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  // Use explicit colors for both light and dark modes
  const variants = {
    primary:
      "!bg-[#3b82f6] hover:!bg-[#2563eb] active:!bg-[#1d4ed8] !text-white focus:ring-primary shadow-md hover:shadow-lg dark:!bg-[#1877F2] dark:hover:!bg-[#0c63d4] dark:active:!bg-[#0854b3]",
    secondary:
      "!bg-[#e5e7eb] hover:!bg-[#d1d5db] active:!bg-[#9ca3af] !text-[#1f2937] focus:ring-gray-300 shadow-md hover:shadow-lg dark:bg-white/20 dark:hover:bg-white/30 dark:active:bg-white/40 dark:text-white dark:focus:ring-white/30",
    outline:
      "border-2 !border-[#3b82f6] bg-transparent hover:bg-primary/20 active:bg-primary/30 !text-[#3b82f6] hover:text-primary-600 focus:ring-primary dark:border-[#1877F2] dark:text-[#1877F2]",
    ghost:
      "hover:bg-gray-200/40 !text-[#3b82f6] hover:!text-[#2563eb] focus:ring-primary dark:hover:bg-white/10 dark:text-[#1877F2] dark:hover:text-white",
    danger:
      "bg-destructive hover:bg-destructive-600 active:bg-destructive-700 text-white focus:ring-destructive shadow-md hover:shadow-lg",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
