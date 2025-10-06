"use client";

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-3 py-2 border rounded-lg shadow-sm placeholder-muted-foreground/60 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          resize-none
          ${
            error
              ? "border-destructive text-destructive placeholder-destructive/50 focus:border-destructive focus:ring-destructive"
              : "border-border bg-input text-foreground"
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};
