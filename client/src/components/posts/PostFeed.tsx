"use client";

import React, { useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { CreatePost } from "./CreatePost";
import { FeedFilter, FeedFilterType } from "./FeedFilter";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api";
import { Post } from "@/types/post.types";

interface PostsResponse {
  posts: Post[];
  filter: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<FeedFilterType>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);

  const { isAuthenticated } = useAuth();

  const POSTS_PER_PAGE = 15; // Show 15 posts initially, then load more

  useEffect(() => {
    loadPosts(true); // Reset posts when filter changes
  }, [activeFilter]);

  // Listen for refresh events from header create post modal
  useEffect(() => {
    const handleRefresh = () => {
      loadPosts(true); // Reset posts when refreshing
    };

    window.addEventListener("refreshPosts", handleRefresh);
    return () => window.removeEventListener("refreshPosts", handleRefresh);
  }, [activeFilter]);

  const loadPosts = async (reset: boolean = false) => {
    const isInitialLoad = reset || currentPage === 1;

    if (isInitialLoad) {
      setLoading(true);
      setPosts([]);
      setCurrentPage(1);
    } else {
      setLoadingMore(true);
    }

    setError("");

    const pageToLoad = reset ? 1 : currentPage;
    const response = await apiClient.getFilteredPosts(
      activeFilter,
      pageToLoad,
      POSTS_PER_PAGE
    );

    if (response.data) {
      const postsData = response.data as PostsResponse;
      const newPosts = postsData.posts || [];

      if (reset) {
        setPosts(newPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }

      // Update pagination state
      setHasMorePosts(postsData.pagination?.hasNext ?? false);
      setTotalPosts(postsData.pagination?.totalPosts ?? 0);

      if (!reset) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        setCurrentPage(2); // Next page to load
      }
    } else if (response.error) {
      setError(response.error);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  const handleFilterChange = (filter: FeedFilterType) => {
    setActiveFilter(filter);
  };

  const handlePostUpdate = () => {
    loadPosts(true); // Reset and reload posts
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMorePosts) {
      loadPosts(false);
    }
  };

  const handleFollowUpdate = (
    userId: string,
    newFollowingStatus: boolean,
    newFollowerCount: number
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.authorId._id === userId) {
          return {
            ...post,
            following: newFollowingStatus,
            authorId: {
              ...post.authorId,
              followersCount: newFollowerCount,
            },
          };
        }
        return post;
      })
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
        {/* Feed Filter Skeleton */}
        <div
          className="rounded-lg md:rounded-xl p-4 shadow-sm border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div
                className="h-6 w-16 rounded"
                style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
              ></div>
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-20 rounded"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                ))}
              </div>
            </div>
            <div
              className="h-4 w-3/4 rounded"
              style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
            ></div>
          </div>
        </div>

        {/* Create post skeleton */}
        {isAuthenticated && (
          <div
            className="rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <div className="animate-pulse flex space-x-2 md:space-x-3">
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
                style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
              ></div>
              <div className="flex-1 space-y-2">
                <div
                  className="h-3 md:h-4 rounded w-3/4"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Post skeletons */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg md:rounded-xl p-3 md:p-4 shadow-sm border"
            style={{
              backgroundColor: "var(--color-card, #ffffff)",
              borderColor: "var(--color-border, #e2e8f0)",
            }}
          >
            <div className="animate-pulse">
              <div className="flex space-x-2 md:space-x-3 mb-3 md:mb-4">
                <div
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div className="flex-1 space-y-2">
                  <div
                    className="h-4 w-3/4 rounded"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                  <div
                    className="h-3 w-1/2 rounded"
                    style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mb-3 md:mb-4">
                <div
                  className="h-4 w-full rounded"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div
                  className="h-4 w-3/4 rounded"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
              </div>
              <div
                className="h-32 md:h-40 rounded-lg mb-3 md:mb-4"
                style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
              ></div>
              <div className="flex space-x-3 md:space-x-4">
                <div
                  className="h-8 w-16 rounded"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div
                  className="h-8 w-16 rounded"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div
                  className="h-8 w-16 rounded"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div
          className="rounded-lg md:rounded-xl p-4 md:p-6 border"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderColor: "rgba(239, 68, 68, 0.3)",
          }}
        >
          <div className="flex flex-col sm:flex-row">
            <svg
              className="w-5 h-5 mb-2 sm:mb-0 sm:mr-3 flex-shrink-0 sm:mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: "var(--color-destructive, #ef4444)" }}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <h3
                className="text-sm font-medium mb-1"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                Error Loading Posts
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-destructive, #ef4444)" }}
              >
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      {/* Feed Filter */}
      <FeedFilter
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Create Post - Only show for authenticated users */}
      {isAuthenticated && <CreatePost onPostCreated={handlePostUpdate} />}

      {posts.length === 0 ? (
        <div
          className="rounded-lg md:rounded-xl p-8 md:p-12 text-center shadow-sm border"
          style={{
            backgroundColor: "var(--color-card, #ffffff)",
            borderColor: "var(--color-border, #e2e8f0)",
          }}
        >
          <svg
            className="mx-auto h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
          <h3
            className="text-base md:text-lg font-medium mb-2"
            style={{ color: "var(--color-foreground, #0f172a)" }}
          >
            {activeFilter === "following"
              ? "No posts from followed users"
              : "No posts yet"}
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-muted-foreground, #64748b)" }}
          >
            {activeFilter === "following"
              ? "Follow some users to see their posts here!"
              : activeFilter === "trending"
              ? "No trending posts at the moment. Check back later!"
              : "Be the first to share something with the community!"}
          </p>
        </div>
      ) : (
        <>
          {/* Posts List */}
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostUpdate={handlePostUpdate}
              onFollowUpdate={handleFollowUpdate}
            />
          ))}

          {/* Load More Button */}
          {hasMorePosts && (
            <div className="flex justify-center py-6">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  backgroundColor: loadingMore
                    ? "var(--color-muted, #f1f5f9)"
                    : "var(--color-primary, #3b82f6)",
                  color: loadingMore
                    ? "var(--color-muted-foreground, #64748b)"
                    : "white",
                  border: "none",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  if (!loadingMore) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary-600, #2563eb)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(59, 130, 246, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loadingMore) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-primary, #3b82f6)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px rgba(0, 0, 0, 0.1)";
                  }
                }}
              >
                {loadingMore ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 animate-spin"
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
                    <span>Loading more posts...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Load more posts</span>
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
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          )}

          {/* End of posts indicator */}
          {!hasMorePosts && posts.length > 0 && (
            <div className="text-center py-8">
              <div
                className="inline-flex items-center px-4 py-2 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--color-secondary, #f1f5f9)",
                  color: "var(--color-muted-foreground, #64748b)",
                  border: "1px solid var(--color-border, #e2e8f0)",
                }}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                You&apos;ve seen all {totalPosts} posts
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
