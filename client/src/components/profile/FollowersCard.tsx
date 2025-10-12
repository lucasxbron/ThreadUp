"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/user.types";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/contexts/FollowContext";
import { apiClient } from "@/utils/api";
import { Avatar } from "@/components/ui/Avatar";
import { AllFollowsModal } from "./AllFollowsModal";

interface FollowerUser {
  user: User & { isFollowing: boolean };
  followedAt: string;
}

interface FollowingUser {
  user: User & { isFollowing: boolean };
  followedAt: string;
}

interface FollowersResponse {
  followers: FollowerUser[];
  pagination: {
    totalFollowers: number;
    hasNext: boolean;
  };
}

interface FollowingResponse {
  following: FollowingUser[];
  pagination: {
    totalFollowing: number;
    hasNext: boolean;
  };
}

export const FollowersCard: React.FC = () => {
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showAllModal, setShowAllModal] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<
    "followers" | "following"
  >("followers");

  const { user, isAuthenticated } = useAuth();
  const { getFollowState, toggleFollow, updateFollowState } = useFollow();

  useEffect(() => {
    if (isAuthenticated && user) {
      loadFollowData();
    }
  }, [isAuthenticated, user]);

  const loadFollowData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [followersResponse, followingResponse] = await Promise.all([
        apiClient.getFollowers(user._id, 1, 5),
        apiClient.getFollowing(user._id, 1, 5),
      ]);

      if (followersResponse.data) {
        const followersData = followersResponse.data as FollowersResponse;
        setFollowers(followersData.followers || []);
        setFollowersCount(followersData.pagination?.totalFollowers || 0);

        // Simple: Use server data with no force update (preserve existing states)
        followersData.followers?.forEach((follower) => {
          updateFollowState(
            follower.user._id,
            follower.user.isFollowing,
            follower.user.followersCount || 0,
            false // Don't force - preserve SuggestionsCard states
          );
        });
      }

      if (followingResponse.data) {
        const followingData = followingResponse.data as FollowingResponse;
        setFollowing(followingData.following || []);
        setFollowingCount(followingData.pagination?.totalFollowing || 0);

        // Force update for following
        followingData.following?.forEach((followingUser) => {
          updateFollowState(
            followingUser.user._id,
            true,
            followingUser.user.followersCount || 0,
            true
          );
        });
      }
    } catch (error) {
      console.error("Error loading follow data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    if (!isAuthenticated || !user || !userId || userId === "undefined") {
      console.warn("Invalid follow attempt:", {
        isAuthenticated,
        user: !!user,
        userId,
      });
      return;
    }

    // Additional validation
    if (userId === user._id) {
      console.warn("User attempted to follow themselves");
      return;
    }

    // Always use global state as source of truth
    const globalState = getFollowState(userId);
    const currentFollowerCount = globalState?.followersCount ?? 0;

    const success = await toggleFollow(userId, currentFollowerCount);

    if (success) {
      // Refresh the data to get updated counts and relationships
      setTimeout(() => {
        loadFollowData();
      }, 500);
    }
  };

  // Get full name
  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const handleShowAllFollowers = () => {
    setModalInitialTab("followers");
    setShowAllModal(true);
  };

  const handleShowAllFollowing = () => {
    setModalInitialTab("following");
    setShowAllModal(true);
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
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
              Connections
            </h3>
            {/* Show reload button when not loading AND (have followers OR following OR neither but still want to allow refresh) */}
            {!loading && (
              <button
                onClick={loadFollowData}
                className="text-xs opacity-60 hover:opacity-100 transition-opacity"
                style={{ color: "var(--color-primary, #3b82f6)" }}
                title="Refresh connections"
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
            <div className="space-y-4">
              {/* Followers Section */}
              <div>
                <div
                  className="h-4 w-20 rounded animate-pulse mb-3"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div className="space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-full animate-pulse"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                        }}
                      ></div>
                      <div className="flex-1">
                        <div
                          className="h-3 rounded animate-pulse mb-1"
                          style={{
                            backgroundColor: "var(--color-muted, #f1f5f9)",
                          }}
                        ></div>
                        <div
                          className="h-2 rounded animate-pulse w-16"
                          style={{
                            backgroundColor: "var(--color-muted, #f1f5f9)",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Following Section */}
              <div>
                <div
                  className="h-4 w-20 rounded animate-pulse mb-3"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div className="space-y-2">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div
                        className="w-8 h-8 rounded-full animate-pulse"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                        }}
                      ></div>
                      <div className="flex-1">
                        <div
                          className="h-3 rounded animate-pulse mb-1"
                          style={{
                            backgroundColor: "var(--color-muted, #f1f5f9)",
                          }}
                        ></div>
                        <div
                          className="h-2 rounded animate-pulse w-16"
                          style={{
                            backgroundColor: "var(--color-muted, #f1f5f9)",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Followers Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className="font-medium text-sm"
                    style={{ color: "var(--color-card-foreground, #0f172a)" }}
                  >
                    Followers ({followersCount})
                  </h4>
                  {followersCount > 0 && (
                    <button
                      onClick={handleShowAllFollowers}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "var(--color-primary, #3b82f6)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary-600, #2563eb)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary, #3b82f6)";
                      }}
                    >
                      See all
                    </button>
                  )}
                </div>

                {followers.length === 0 ? (
                  <div className="text-center py-4">
                    <p
                      className="text-xs"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      No followers yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {followers
                      .slice(0, 3)
                      .map((follower) => {
                        // Validate follower data
                        if (
                          !follower?.user?._id ||
                          follower.user._id === "undefined"
                        ) {
                          console.warn("Invalid follower data:", follower);
                          return null; // Skip rendering this item
                        }

                        // Use ONLY global state, not server state
                        const globalState = getFollowState(follower.user._id);
                        const isFollowingThem =
                          globalState?.isFollowing ?? false;
                        const isLoading = globalState?.isLoading ?? false;

                        return (
                          <div
                            key={follower.user._id}
                            className="flex items-center space-x-2"
                          >
                            <div className="flex-shrink-0">
                              <Avatar
                                user={{
                                  firstName: follower.user.firstName,
                                  lastName: follower.user.lastName,
                                  avatarUrl: follower.user.avatarUrl,
                                }}
                                size="sm"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <p
                                className="text-xs font-medium truncate"
                                style={{
                                  color:
                                    "var(--color-card-foreground, #0f172a)",
                                }}
                              >
                                {getFullName(
                                  follower.user.firstName,
                                  follower.user.lastName
                                )}
                              </p>
                              <p
                                className="text-xs truncate"
                                style={{
                                  color:
                                    "var(--color-muted-foreground, #64748b)",
                                }}
                              >
                                @{follower.user.username}
                              </p>
                            </div>

                            <button
                              onClick={() => handleFollow(follower.user._id)}
                              disabled={isLoading}
                              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                                isFollowingThem
                                  ? "cursor-default"
                                  : "hover:scale-105"
                              }`}
                              style={{
                                minWidth: "64px",
                                backgroundColor: isFollowingThem
                                  ? "var(--color-secondary, #f1f5f9)"
                                  : "var(--color-primary, #3b82f6)",
                                color: isFollowingThem
                                  ? "var(--color-secondary-foreground, #1f2937)"
                                  : "white",
                              }}
                              onMouseEnter={(e) => {
                                if (!isFollowingThem) {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-primary-600, #2563eb)";
                                } else {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-secondary-400, #e2e8f0)";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isFollowingThem) {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-primary, #3b82f6)";
                                } else {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-secondary, #f1f5f9)";
                                }
                              }}
                            >
                              {isLoading ? (
                                <div
                                  className="animate-spin rounded-full h-3 w-3 border border-t-transparent mx-auto"
                                  style={{
                                    borderColor: isFollowingThem
                                      ? "var(--color-secondary-foreground, #1f2937)"
                                      : "white",
                                  }}
                                ></div>
                              ) : isFollowingThem ? (
                                "Following"
                              ) : (
                                "Follow"
                              )}
                            </button>
                          </div>
                        );
                      })
                      .filter(Boolean)}{" "}
                    {/* Filter out null items */}
                  </div>
                )}
              </div>

              {/* Following Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4
                    className="font-medium text-sm"
                    style={{ color: "var(--color-card-foreground, #0f172a)" }}
                  >
                    Following ({followingCount})
                  </h4>
                  {followingCount > 0 && (
                    <button
                      onClick={handleShowAllFollowing}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "var(--color-primary, #3b82f6)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary-600, #2563eb)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color =
                          "var(--color-primary, #3b82f6)";
                      }}
                    >
                      See all
                    </button>
                  )}
                </div>

                {following.length === 0 ? (
                  <div className="text-center py-4">
                    <p
                      className="text-xs"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Not following anyone yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {following.slice(0, 3).map((followingUser) => (
                      <div
                        key={followingUser.user._id}
                        className="flex items-center space-x-2"
                      >
                        <div className="flex-shrink-0">
                          <Avatar
                            user={{
                              firstName: followingUser.user.firstName,
                              lastName: followingUser.user.lastName,
                              avatarUrl: followingUser.user.avatarUrl,
                            }}
                            size="sm"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p
                            className="text-xs font-medium truncate"
                            style={{
                              color: "var(--color-card-foreground, #0f172a)",
                            }}
                          >
                            {getFullName(
                              followingUser.user.firstName,
                              followingUser.user.lastName
                            )}
                          </p>
                          <p
                            className="text-xs truncate"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            @{followingUser.user.username}
                          </p>
                        </div>

                        <button
                          onClick={() => handleFollow(followingUser.user._id)}
                          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 cursor-default hover:scale-105"
                          style={{
                            minWidth: "64px",
                            backgroundColor: "var(--color-secondary, #f1f5f9)",
                            color: "var(--color-secondary-foreground, #1f2937)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--color-secondary-400, #e2e8f0)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "var(--color-secondary, #f1f5f9)";
                          }}
                        >
                          Following
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Follows Modal */}
      <AllFollowsModal
        isOpen={showAllModal}
        onClose={() => setShowAllModal(false)}
        initialTab={modalInitialTab}
        userId={user._id}
      />
    </>
  );
};
