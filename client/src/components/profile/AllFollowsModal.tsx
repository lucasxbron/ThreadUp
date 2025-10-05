"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useFollow } from "@/contexts/FollowContext";
import { apiClient } from "@/utils/api";
import { User } from "@/types/user.types";
import { Avatar } from "@/components/ui/Avatar";

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
    currentPage: number;
    totalPages: number;
    totalFollowers: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface FollowingResponse {
  following: FollowingUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalFollowing: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface AllFollowsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: "followers" | "following";
  userId: string;
}

export const AllFollowsModal: React.FC<AllFollowsModalProps> = ({
  isOpen,
  onClose,
  initialTab,
  userId,
}) => {
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    initialTab
  );
  const [followers, setFollowers] = useState<FollowerUser[]>([]);
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isChangingTab, setIsChangingTab] = useState(false);

  const { user, isAuthenticated } = useAuth();
  const { getFollowState, toggleFollow, updateFollowState } = useFollow();

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setPage(1);
      setIsReady(true);
      loadFollowData(initialTab, 1);
    } else {
      setIsReady(false);
    }
  }, [isOpen, initialTab, userId]);

  const loadFollowData = async (
    tab: "followers" | "following",
    pageNum: number
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        tab === "followers"
          ? await apiClient.getFollowers(userId, pageNum, 20)
          : await apiClient.getFollowing(userId, pageNum, 20);

      if (response.data) {
        const data = response.data as FollowersResponse | FollowingResponse;

        if (tab === "followers") {
          const followersData = data as FollowersResponse;
          setFollowers(followersData.followers || []);
          setTotalCount(followersData.pagination?.totalFollowers || 0);

          // Use server data, don't force update
          followersData.followers?.forEach((follower) => {
            updateFollowState(
              follower.user._id,
              follower.user.isFollowing,
              follower.user.followersCount || 0,
              false // Preserve existing states
            );
          });
        } else {
          const followingData = data as FollowingResponse;
          setFollowing(followingData.following || []);
          setTotalCount(followingData.pagination?.totalFollowing || 0);

          // Force update for following
          followingData.following?.forEach((followingUser) => {
            updateFollowState(
              followingUser.user._id,
              true, // We follow them
              followingUser.user.followersCount || 0,
              true // Force update
            );
          });
        }

        setTotalPages(data.pagination?.totalPages || 1);
        setHasNext(data.pagination?.hasNext || false);
        setPage(pageNum);
      } else {
        setError("Failed to load data");
      }
    } catch (error) {
      console.error("Error loading follow data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
      // Add small delay before clearing transition state to prevent quick size changes
      setTimeout(() => {
        setIsChangingTab(false);
      }, 150);
    }
  };

  const handleFollow = async (targetUserId: string) => {
    if (!isAuthenticated || !user) {
      return;
    }

    const globalState = getFollowState(targetUserId);
    const currentFollowerCount = globalState?.followersCount ?? 0;

    const success = await toggleFollow(targetUserId, currentFollowerCount);

    if (success) {
      setTimeout(() => {
        loadFollowData(activeTab, page);
      }, 500);
    }
  };

  const handleTabChange = (tab: "followers" | "following") => {
    if (tab === activeTab || isChangingTab) return;

    setIsChangingTab(true);
    setActiveTab(tab);
    setPage(1);
    loadFollowData(tab, 1);
  };

  const loadNextPage = () => {
    if (hasNext && page < totalPages) {
      loadFollowData(activeTab, page + 1);
    }
  };

  const loadPrevPage = () => {
    if (page > 1) {
      loadFollowData(activeTab, page - 1);
    }
  };

  const getFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          date.getFullYear() !== new Date().getFullYear()
            ? "numeric"
            : undefined,
      });
    }
  };

  const handleClose = () => {
    setFollowers([]);
    setFollowing([]);
    setError("");
    setPage(1);
    setIsChangingTab(false);
    onClose();
  };

  const currentData = activeTab === "followers" ? followers : following;
  const isOwnProfile = user?._id === userId;

  if (!isReady) return null;

  const showLoadingState = loading || isChangingTab;

  // Calculate content-aware minimum height
  const calculateMinHeight = () => {
    if (showLoadingState) {
      // During loading, show skeleton for 6 items + stats + padding
      return "400px";
    }

    if (error || currentData.length === 0) {
      // Empty/error states are smaller
      return "280px";
    }

    // For actual data, be more content aware
    const itemCount = currentData.length;
    const baseHeight = 120; // Stats + padding
    const itemHeight = 72; // Each user item
    const paginationHeight = totalPages > 1 ? 60 : 0;
    const maxContentHeight = 384; // max-h-96 = 384px

    const contentHeight = Math.min(itemCount * itemHeight, maxContentHeight);
    return `${baseHeight + contentHeight + paginationHeight}px`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleTabChange("followers")}
            disabled={isChangingTab}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 ${
              activeTab === "followers"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{
              backgroundColor:
                activeTab === "followers"
                  ? "var(--color-primary, #3b82f6)"
                  : "transparent",
              color:
                activeTab === "followers"
                  ? "white"
                  : "var(--color-foreground, #0f172a)",
            }}
          >
            Followers
          </button>
          <button
            onClick={() => handleTabChange("following")}
            disabled={isChangingTab}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 ${
              activeTab === "following"
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            style={{
              backgroundColor:
                activeTab === "following"
                  ? "var(--color-primary, #3b82f6)"
                  : "transparent",
              color:
                activeTab === "following"
                  ? "white"
                  : "var(--color-foreground, #0f172a)",
            }}
          >
            Following
          </button>
        </div>
      }
      size="lg"
    >
      {/* Content-aware height container with smooth transition */}
      <div
        style={{
          minHeight: calculateMinHeight(),
          transition: isChangingTab ? "none" : "min-height 200ms ease-in-out",
        }}
      >
        <div className="space-y-4">
          {/* Stats */}
          <div className="text-center py-2">
            <p
              className="text-lg font-semibold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              {showLoadingState
                ? "Loading..."
                : `${totalCount} ${
                    activeTab === "followers" ? "Followers" : "Following"
                  }`}
            </p>
          </div>

          {/* Content area with smooth opacity transition */}
          <div
            style={{
              opacity: isChangingTab ? 0.6 : 1,
              transition: "opacity 200ms ease-in-out",
            }}
          >
            {/* Loading State */}
            {showLoadingState ? (
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 p-3 rounded-lg animate-pulse"
                  >
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                    ></div>
                    <div className="flex-1 space-y-2">
                      <div
                        className="h-4 w-32 rounded"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                        }}
                      ></div>
                      <div
                        className="h-3 w-24 rounded"
                        style={{
                          backgroundColor: "var(--color-muted, #f1f5f9)",
                        }}
                      ></div>
                    </div>
                    <div
                      className="w-20 h-8 rounded"
                      style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              /* Error State */
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "var(--color-destructive, #ef4444)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  Failed to load {activeTab}
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  {error}
                </p>
                <button
                  onClick={() => loadFollowData(activeTab, page)}
                  className="px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "var(--color-primary, #3b82f6)",
                    color: "white",
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : currentData.length === 0 ? (
              /* Empty State */
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "var(--color-secondary, #f1f5f9)" }}
                >
                  <svg
                    className="w-8 h-8"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--color-foreground, #0f172a)" }}
                >
                  No {activeTab} yet
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-muted-foreground, #64748b)" }}
                >
                  {activeTab === "followers"
                    ? isOwnProfile
                      ? "When people follow you, they'll appear here"
                      : "This user doesn't have any followers yet"
                    : isOwnProfile
                    ? "Start following other users to see them here"
                    : "This user isn't following anyone yet"}
                </p>
              </div>
            ) : (
              /* Users List */
              <div className="max-h-96 overflow-y-auto space-y-3">
                {currentData.map((item) => {
                  const targetUser = item.user;
                  const globalState = getFollowState(targetUser._id);
                  const isFollowing =
                    activeTab === "following"
                      ? true
                      : globalState?.isFollowing ?? false;
                  const isLoadingFollow = globalState?.isLoading ?? false;
                  const isCurrentUser = user?._id === targetUser._id;

                  return (
                    <div
                      key={targetUser._id}
                      className="flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200"
                      style={{
                        backgroundColor: "var(--color-secondary, #f1f5f9)",
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
                      <div className="flex-shrink-0">
                        <Avatar
                          user={{
                            firstName: targetUser.firstName,
                            lastName: targetUser.lastName,
                            avatarUrl: targetUser.avatarUrl,
                          }}
                          size="lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4
                            className="font-medium text-sm truncate"
                            style={{
                              color: "var(--color-card-foreground, #0f172a)",
                            }}
                          >
                            {getFullName(
                              targetUser.firstName,
                              targetUser.lastName
                            )}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className="text-xs"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            @{targetUser.username}
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            •
                          </span>
                          <span
                            className="text-xs"
                            style={{
                              color: "var(--color-muted-foreground, #64748b)",
                            }}
                          >
                            {formatDate(item.followedAt)}
                          </span>
                        </div>
                      </div>

                      {!isCurrentUser && (
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => handleFollow(targetUser._id)}
                            disabled={isLoadingFollow}
                            className="px-4 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
                            style={{
                              backgroundColor: isFollowing
                                ? "var(--color-secondary, #f1f5f9)"
                                : "var(--color-primary, #3b82f6)",
                              color: isFollowing
                                ? "var(--color-secondary-foreground, #1f2937)"
                                : "white",
                              border: isFollowing
                                ? "1px solid var(--color-border, #e2e8f0)"
                                : "none",
                            }}
                            onMouseEnter={(e) => {
                              if (!isLoadingFollow) {
                                if (isFollowing) {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(239, 68, 68, 0.1)";
                                  e.currentTarget.style.color =
                                    "var(--color-destructive, #ef4444)";
                                  e.currentTarget.style.borderColor =
                                    "var(--color-destructive, #ef4444)";
                                  e.currentTarget.textContent = "Unfollow";
                                } else {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-primary-600, #2563eb)";
                                }
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isLoadingFollow) {
                                if (isFollowing) {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-secondary, #f1f5f9)";
                                  e.currentTarget.style.color =
                                    "var(--color-secondary-foreground, #1f2937)";
                                  e.currentTarget.style.borderColor =
                                    "var(--color-border, #e2e8f0)";
                                  e.currentTarget.textContent = "Following";
                                } else {
                                  e.currentTarget.style.backgroundColor =
                                    "var(--color-primary, #3b82f6)";
                                }
                              }
                            }}
                          >
                            {isLoadingFollow ? (
                              <div
                                className="w-4 h-4 animate-spin rounded-full border border-t-transparent"
                                style={{
                                  borderColor: isFollowing
                                    ? "var(--color-muted-foreground, #64748b)"
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
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && !showLoadingState && !error && (
            <div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: "var(--color-border, #e2e8f0)" }}
            >
              <button
                onClick={loadPrevPage}
                disabled={page === 1}
                className="px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    page === 1
                      ? "var(--color-muted, #f1f5f9)"
                      : "var(--color-primary, #3b82f6)",
                  color:
                    page === 1
                      ? "var(--color-muted-foreground, #64748b)"
                      : "white",
                }}
              >
                Previous
              </button>

              <span
                className="text-sm"
                style={{ color: "var(--color-muted-foreground, #64748b)" }}
              >
                Page {page} of {totalPages}
              </span>

              <button
                onClick={loadNextPage}
                disabled={!hasNext}
                className="px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: !hasNext
                    ? "var(--color-muted, #f1f5f9)"
                    : "var(--color-primary, #3b82f6)",
                  color: !hasNext
                    ? "var(--color-muted-foreground, #64748b)"
                    : "white",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
