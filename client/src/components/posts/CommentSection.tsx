"use client";

import React, { useState, useEffect } from "react";
import { apiClient } from "@/utils/api";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Comment } from "@/types/post.types";

interface CommentSectionProps {
  postId: string;
}

interface CommentsResponse {
  comments: Comment[];
}

interface CommentResponse {
  comment: Comment;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    setLoading(true);
    const response = await apiClient.getComments(postId);

    if (response.data) {
      const commentsData = response.data as CommentsResponse;
      setComments(commentsData.comments || []);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setSubmitting(true);
    const response = await apiClient.createComment(postId, newComment.trim());

    if (response.data) {
      const commentData = response.data as CommentResponse;
      setComments((prev) => [commentData.comment, ...prev]);
      setNewComment("");
    }

    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    const response = await apiClient.deleteComment(commentId);

    if (response.data || response.message) {
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return "now";
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

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
      {/* Comment form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-2 sm:space-x-3"
      >
        <div className="relative flex-shrink-0">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--color-card, #ffffff)" }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "var(--color-card-foreground, #0f172a)" }}
              >
                {user?.firstName && user?.lastName
                  ? getInitials(user.firstName, user.lastName)
                  : user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-xs sm:text-sm placeholder-gray-500 dark:placeholder-gray-400"
            style={{ color: "var(--color-card-foreground, #0f172a)" }}
            maxLength={200}
          />
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={!newComment.trim() || submitting}
            loading={submitting}
            className="font-semibold px-1 sm:px-2 text-xs sm:text-sm"
            style={{ color: "var(--color-primary, #3b82f6)" }}
          >
            Post
          </Button>
        </div>
      </form>

      {/* Comments list*/}
      {loading ? (
        <div className="flex justify-center py-3 sm:py-4">
          <div
            className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-t-transparent"
            style={{ borderColor: "var(--color-muted-foreground, #64748b)" }}
          ></div>
        </div>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start space-x-2 sm:space-x-3 group"
            >
              <div className="relative flex-shrink-0">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full p-0.5">
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-card, #ffffff)" }}
                  >
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "var(--color-card-foreground, #0f172a)" }}
                    >
                      {getInitials(
                        comment.authorId.firstName,
                        comment.authorId.lastName
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm">
                  <span
                    className="font-semibold mr-1 sm:mr-2 whitespace-nowrap"
                    style={{ color: "var(--color-card-foreground, #0f172a)" }}
                  >
                    {getFullName(
                      comment.authorId.firstName,
                      comment.authorId.lastName
                    )}
                  </span>
                  <span
                    className="break-words"
                    style={{ color: "var(--color-card-foreground, #0f172a)" }}
                  >
                    {comment.text}
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 mt-1">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {formatDate(comment.createdAt)}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    @{comment.authorId.username}
                  </span>
                  <button
                    className="text-xs font-semibold hover:opacity-75 transition-opacity duration-200"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    Like
                  </button>
                  <button
                    className="text-xs font-semibold hover:opacity-75 transition-opacity duration-200"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    Reply
                  </button>
                  {user?._id === comment.authorId._id && (
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p
              className="text-center text-xs sm:text-sm py-3 sm:py-4"
              style={{ color: "var(--color-muted-foreground, #64748b)" }}
            >
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
