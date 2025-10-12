"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { apiClient } from "@/utils/api";

interface FollowState {
  [userId: string]: {
    isFollowing: boolean;
    followersCount: number;
    isLoading: boolean;
  };
}

interface FollowContextType {
  followStates: FollowState;
  toggleFollow: (
    userId: string,
    currentFollowersCount: number
  ) => Promise<boolean>;
  updateFollowState: (
    userId: string,
    isFollowing: boolean,
    followersCount: number,
    forceUpdate?: boolean
  ) => void; // ADD forceUpdate parameter
  getFollowState: (userId: string) => {
    isFollowing: boolean;
    followersCount: number;
    isLoading: boolean;
  } | null;
}

const FollowContext = createContext<FollowContextType | undefined>(undefined);

export const FollowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [followStates, setFollowStates] = useState<FollowState>({});

  const updateFollowState = useCallback(
    (
      userId: string,
      isFollowing: boolean,
      followersCount: number,
      forceUpdate: boolean = false
    ) => {
      setFollowStates((prev) => {
        const existingState = prev[userId];

        // Don't override existing state unless forced to update
        if (existingState && !forceUpdate) {
          return {
            ...prev,
            [userId]: {
              ...existingState,
              followersCount,
              isLoading: false,
            },
          };
        }

        // Create new state or force update existing state
        return {
          ...prev,
          [userId]: {
            isFollowing,
            followersCount,
            isLoading: false,
          },
        };
      });
    },
    []
  );

  const getFollowState = useCallback(
    (userId: string) => {
      return followStates[userId] || null;
    },
    [followStates]
  );

  const toggleFollow = useCallback(
    async (userId: string, currentFollowersCount: number): Promise<boolean> => {
      // Enhanced validation
      if (!userId || userId === "undefined" || typeof userId !== "string") {
        console.error("Invalid userId provided to toggleFollow:", userId);
        return false;
      }

      if (userId.length !== 24) {
        console.error("Invalid ObjectId format:", userId);
        return false;
      }

      // Set loading state
      setFollowStates((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isLoading: true,
        },
      }));

      try {
        const response = await apiClient.toggleFollow(userId);

        if (response.data) {
          const newFollowingStatus = response.data.following;
          const newFollowerCount = newFollowingStatus
            ? currentFollowersCount + 1
            : Math.max(0, currentFollowersCount - 1);

          // Update global state
          setFollowStates((prev) => ({
            ...prev,
            [userId]: {
              isFollowing: newFollowingStatus,
              followersCount: newFollowerCount,
              isLoading: false,
            },
          }));

          return true;
        }

        return false;
      } catch (error) {
        console.error("Error toggling follow:", error);

        // Reset loading state on error
        setFollowStates((prev) => ({
          ...prev,
          [userId]: {
            ...prev[userId],
            isLoading: false,
          },
        }));

        return false;
      }
    },
    []
  );

  return (
    <FollowContext.Provider
      value={{
        followStates,
        toggleFollow,
        updateFollowState,
        getFollowState,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === undefined) {
    throw new Error("useFollow must be used within a FollowProvider");
  }
  return context;
};
