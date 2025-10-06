"use client";

import React from "react";

interface AvatarProps {
  user: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  } | null; // Allow null users
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick?: () => void;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  user,
  size = "md",
  onClick,
  className = "",
}) => {
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-20 h-20",
  };

  const paddingSizes = {
    xs: "p-0.5",
    sm: "p-0.5",
    md: "p-0.5",
    lg: "p-1",
    xl: "p-1.5",
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-2xl",
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  // Handle null user case
  if (!user) {
    return (
      <div
        className={`${
          sizes[size]
        } bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full ${
          paddingSizes[size]
        } flex-shrink-0 ${
          onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
        } ${className}`}
        onClick={onClick}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-card, #ffffff)" }}
        >
          <span
            className={`${textSizes[size]} font-bold`}
            style={{ color: "var(--color-card-foreground, #0f172a)" }}
          >
            ??
          </span>
        </div>
      </div>
    );
  }

  // If user has profile picture, show it without colored ring
  if (user.avatarUrl) {
    return (
      <div
        className={`${sizes[size]} flex-shrink-0 ${
          onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
        } ${className}`}
        onClick={onClick}
      >
        <img
          src={user.avatarUrl}
          alt={getFullName(user.firstName, user.lastName)}
          className="w-full h-full rounded-full object-cover"
          style={{ backgroundColor: "var(--color-card, #ffffff)" }}
          onError={(e) => {
            console.error("Failed to load avatar image:", user.avatarUrl);
          }}
        />
      </div>
    );
  }

  // If no profile picture, show initials with the gradient
  return (
    <div
      className={`${
        sizes[size]
      } bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full ${
        paddingSizes[size]
      } flex-shrink-0 ${
        onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--color-card, #ffffff)" }}
      >
        <span
          className={`${textSizes[size]} font-bold`}
          style={{ color: "var(--color-card-foreground, #0f172a)" }}
        >
          {getInitials(user.firstName, user.lastName)}
        </span>
      </div>
    </div>
  );
};
