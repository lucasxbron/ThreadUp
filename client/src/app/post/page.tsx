"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/posts/PostCard";
import { apiClient } from "@/utils/api";
import { Post } from "@/types/post.types";

function PostPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Get post ID from query parameter
  const postId = searchParams?.get("id");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && postId) {
      loadPost();
    } else if (mounted && !postId) {
      setError("No post ID provided");
      setLoading(false);
    }
  }, [mounted, postId]);

  const loadPost = async () => {
    if (!postId) {
      setError("Invalid post ID");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.getPostById(postId);

      if (response.data) {
        setPost(response.data);
      } else {
        setError(response.error || "Post not found");
      }
    } catch {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handlePostDeleted = () => {
    router.push("/");
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 transition-colors duration-300">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-pulse">
              <div
                className="rounded-xl p-6 shadow-sm border"
                style={{
                  backgroundColor: "var(--color-card, #ffffff)",
                  borderColor: "var(--color-border, #e2e8f0)",
                }}
              >
                <div className="flex space-x-3 mb-4">
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
                <div
                  className="h-20 w-full rounded mb-4"
                  style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
                ></div>
                <div className="flex space-x-4">
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
          </div>
        </main>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center transition-colors duration-300">
          <div className="text-center space-y-4">
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
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
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-foreground, #0f172a)" }}
            >
              Post Not Found
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              {error ||
                "The post you&apos;re looking for doesn&apos;t exist or has been deleted."}
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: "var(--color-primary, #3b82f6)",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary-600, #2563eb)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary, #3b82f6)";
              }}
            >
              Go Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <PostCard
            post={post}
            onPostUpdate={handlePostDeleted}
            onFollowUpdate={(userId, newFollowingStatus, newFollowerCount) => {
              if (post.authorId._id === userId) {
                setPost((prev) =>
                  prev
                    ? {
                        ...prev,
                        following: newFollowingStatus,
                        authorId: {
                          ...prev.authorId,
                          followersCount: newFollowerCount,
                        },
                      }
                    : null
                );
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}

// Loading fallback component
function PostPageFallback() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="animate-pulse">
            <div
              className="rounded-xl p-6 shadow-sm border"
              style={{
                backgroundColor: "var(--color-card, #ffffff)",
                borderColor: "var(--color-border, #e2e8f0)",
              }}
            >
              <div className="flex space-x-3 mb-4">
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
              <div
                className="h-20 w-full rounded mb-4"
                style={{ backgroundColor: "var(--color-muted, #f1f5f9)" }}
              ></div>
              <div className="flex space-x-4">
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
        </div>
      </main>
    </div>
  );
}

export default function PostPage() {
  return (
    <Suspense fallback={<PostPageFallback />}>
      <PostPageContent />
    </Suspense>
  );
}
