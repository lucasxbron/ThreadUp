"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/user.types";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/contexts/FollowContext";
import { apiClient } from "@/utils/api";

interface SuggestedUser extends User {
  interactionScore: number;
  mutualFollowers?: number;
  isFollowing: boolean;
}

interface SuggestionsResponse {
  suggestions: SuggestedUser[];
}

export const SuggestionsCard: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { getFollowState, toggleFollow, updateFollowState } = useFollow();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadSuggestions();
    }
  }, [isAuthenticated, user]);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      console.log("Loading suggestions...");
      const response = await apiClient.getSuggestions();

      console.log("Suggestions response:", response);

      if (response.data) {
        const suggestionsData = response.data as SuggestionsResponse;
        console.log("Suggestions data:", suggestionsData);

        // Initialize global follow states for all suggestions
        suggestionsData.suggestions?.forEach((suggestion) => {
          updateFollowState(
            suggestion._id,
            suggestion.isFollowing,
            suggestion.followersCount || 0
          );
        });

        setSuggestions(suggestionsData.suggestions || []);
      }
    } catch (error) {
      console.error("Error loading suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!isAuthenticated || !user) {
      return;
    }

    // Get current follower count from global state or fallback to suggestion data
    const globalState = getFollowState(userId);
    const suggestion = suggestions.find((s) => s._id === userId);
    const currentFollowerCount =
      globalState?.followersCount ?? suggestion?.followersCount ?? 0;

    const success = await toggleFollow(userId, currentFollowerCount);

    if (success) {
      // Update local suggestions state to reflect new follow status
      const updatedState = getFollowState(userId);
      if (updatedState) {
        setSuggestions((prevSuggestions) =>
          prevSuggestions.map((suggestion) =>
            suggestion._id === userId
              ? { ...suggestion, isFollowing: updatedState.isFollowing }
              : suggestion
          )
        );
      }

      // Refresh suggestions after a delay
      setTimeout(() => {
        loadSuggestions();
      }, 1000);
    }
  };

  // Get user initials for avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  // Get suggestion reason based on interaction score
  const getSuggestionReason = (interactionScore: number) => {
    if (interactionScore >= 10) {
      return { text: "Follows you", color: "var(--color-green-600, #16a34a)" };
    } else if (interactionScore >= 5) {
      return {
        text: "Often likes your posts",
        color: "var(--color-primary, #3b82f6)",
      };
    } else if (interactionScore > 0) {
      return {
        text: "Liked your posts",
        color: "var(--color-primary, #3b82f6)",
      };
    } else {
      return {
        text: "Suggested for you",
        color: "var(--color-muted-foreground, #64748b)",
      };
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div
      className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border"
      style={{
        backgroundColor: "var(--color-card, #ffffff)",
        borderColor: "var(--color-border, #e2e8f0)",
        width: "280px",
      }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            className="font-semibold text-lg"
            style={{ color: "var(--color-card-foreground, #0f172a)" }}
          >
            Suggestions for you
          </h3>
          {!loading && suggestions.length > 0 && (
            <button
              onClick={loadSuggestions}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--color-primary, #3b82f6)" }}
              title="Refresh suggestions"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-full animate-pulse"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div className="flex-1">
                  <div
                    className="h-4 rounded animate-pulse mb-1"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                  <div
                    className="h-3 rounded animate-pulse w-20"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                  <div
                    className="h-3 rounded animate-pulse w-16 mt-1"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                </div>
                <div
                  className="w-16 h-8 rounded animate-pulse"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
              </div>
            ))}
          </div>
        ) : suggestions.length === 0 ? (
          /* Empty State */
          <div className="text-center py-8">
            <svg
              className="w-12 h-12 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p
              className="text-sm font-medium mb-2"
              style={{ color: "var(--color-card-foreground, #0f172a)" }}
            >
              No suggestions available
            </p>
            <p
              className="text-xs"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              Start interacting with other users' posts to get personalized
              suggestions!
            </p>
          </div>
        ) : (
          /* Suggestions List */
          <div className="space-y-3">
            {suggestions.map((suggestion) => {
              const reason = getSuggestionReason(suggestion.interactionScore);
              const globalState = getFollowState(suggestion._id);
              const isFollowing =
                globalState?.isFollowing ?? suggestion.isFollowing;
              const isLoading = globalState?.isLoading ?? false;

              return (
                <div
                  key={suggestion._id}
                  className="flex items-center space-x-3"
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--color-card, #ffffff)",
                        }}
                      >
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color: "var(--color-card-foreground, #0f172a)",
                          }}
                        >
                          {getInitials(
                            suggestion.firstName,
                            suggestion.lastName
                          )}
                        </span>
                      </div>
                    </div>
                    {/* Indicator for followers */}
                    {suggestion.interactionScore >= 10 && (
                      <div
                        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                        style={{
                          backgroundColor: "var(--color-green-500, #22c55e)",
                          borderColor: "var(--color-card, #ffffff)",
                        }}
                        title="This user follows you"
                      ></div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: "var(--color-card-foreground, #0f172a)" }}
                    >
                      {getFullName(suggestion.firstName, suggestion.lastName)}
                    </p>
                    <p
                      className="text-xs truncate"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      @{suggestion.username}
                    </p>
                    {/* Show interaction hint */}
                    <p
                      className="text-xs truncate"
                      style={{ color: reason.color }}
                    >
                      {reason.text}
                    </p>
                  </div>

                  {/* Follow Button */}
                  <button
                    onClick={() => handleFollow(suggestion._id)}
                    disabled={isLoading}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      isFollowing ? "cursor-default" : "hover:scale-105"
                    }`}
                    style={{
                      minWidth: "64px",
                      backgroundColor: isFollowing
                        ? "var(--color-secondary, #f1f5f9)"
                        : "var(--color-primary, #3b82f6)",
                      color: isFollowing
                        ? "var(--color-secondary-foreground, #1f2937)"
                        : "white",
                    }}
                    onMouseEnter={(e) => {
                      if (!isFollowing) {
                        // Hover effect for "Follow" button (darker blue)
                        e.currentTarget.style.backgroundColor =
                          "var(--color-primary-600, #2563eb)";
                      } else {
                        // Hover effect for "Following" button (darker gray)
                        e.currentTarget.style.backgroundColor =
                          "var(--color-secondary-400, #e2e8f0)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isFollowing) {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-primary, #3b82f6)";
                      }
                    }}
                  >
                    {isLoading ? (
                      <div
                        className="animate-spin rounded-full h-3 w-3 border border-t-transparent mx-auto"
                        style={{
                          borderColor: isFollowing
                            ? "var(--color-secondary-foreground, #1f2937)"
                            : "white",
                        }}
                      ></div>
                    ) : isFollowing ? (
                      "Following"
                    ) : (
                      "Follow"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* See All Link */}
        {suggestions.length > 0 && (
          <div
            className="mt-4 pt-3 border-t"
            style={{ borderColor: "var(--color-border, #e2e8f0)" }}
          >
            <button
              className="text-sm font-medium w-full text-center hover:opacity-80 transition-opacity flex items-center justify-center space-x-1"
              style={{ color: "var(--color-primary, #3b82f6)" }}
              onClick={() => {
                // Future: Navigate to full suggestions page
                console.log("Navigate to full suggestions page");
              }}
            >
              <span>See all suggestions</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {process.env.NODE_ENV === "development" && suggestions.length > 0 && (
          <div
            className="mt-4 pt-3 border-t text-xs"
            style={{
              borderColor: "var(--color-border, #e2e8f0)",
              color: "var(--color-muted-foreground, #64748b)",
            }}
          >
            <details>
              <summary className="cursor-pointer hover:opacity-80">
                Debug Info
              </summary>
              <div className="mt-2 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <div key={suggestion._id}>
                    {index + 1}. {suggestion.firstName} - Score:{" "}
                    {suggestion.interactionScore}
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};
