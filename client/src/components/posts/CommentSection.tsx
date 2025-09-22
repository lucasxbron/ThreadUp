"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/utils/api';
import { Button } from '@/components/ui/Button';
import { EmojiPicker } from '@/components/ui/EmojiPicker';
import { Comment } from '@/types/post.types';

interface CommentSectionProps {
  postId: string;
}

interface CommentsResponse {
  comments: Comment[];
}

interface CommentResponse {
  comment: Comment;
}

interface CommentLikeResponse {
  liked: boolean;
  likeCount: number;
  likedAt?: string;
  unlikedAt?: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [likingComments, setLikingComments] = useState<Set<string>>(new Set());
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const { user, isAuthenticated } = useAuth();

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

  const handleEmojiSelect = (emoji: string) => {
    const input = commentInputRef.current;
    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const newText = newComment.slice(0, start) + emoji + newComment.slice(end);
      setNewComment(newText);
      
      setTimeout(() => {
        input.selectionStart = input.selectionEnd = start + emoji.length;
        input.focus();
      }, 0);
    } else {
      setNewComment(prev => prev + emoji);
    }
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

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    const response = await apiClient.deleteComment(commentId);

    if (response.data || response.message) {
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    }
  };

  const handleCommentLike = async (commentId: string) => {
    if (!isAuthenticated || !user || likingComments.has(commentId)) {
      return;
    }

    setLikingComments(prev => new Set([...prev, commentId]));

    try {
      const response = await apiClient.toggleCommentLike(commentId);
      
      if (response.data) {
        const likeData = response.data as CommentLikeResponse;
        
        setComments(prevComments => 
          prevComments.map(comment => 
            comment._id === commentId 
              ? { 
                  ...comment, 
                  liked: likeData.liked,
                  likeCount: likeData.likeCount 
                }
              : comment
          )
        );
      }
    } catch {
      // Silently handle errors
    } finally {
      setLikingComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
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
      {/* Comment form with emoji button */}
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
                {user && getInitials(user.firstName, user.lastName)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center space-x-1 relative">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-xs sm:text-sm placeholder-gray-500 dark:placeholder-gray-400 py-2 sm:py-1 pr-8"
            style={{ color: "var(--color-card-foreground, #0f172a)" }}
            maxLength={200}
          />
          
          {/* Emoji Button */}
          <button
            ref={emojiButtonRef}
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1 rounded transition-all duration-200 hover:scale-110"
            style={{
              color: 'var(--color-muted-foreground, #64748b)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
              e.currentTarget.style.color = 'var(--color-foreground, #0f172a)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={!newComment.trim() || submitting}
            loading={submitting}
            className="font-semibold px-2 sm:px-3 py-2 text-xs sm:text-sm min-h-[36px] sm:min-h-[32px]"
            style={{ color: "var(--color-primary, #3b82f6)" }}
          >
            Post
          </Button>
        </div>
      </form>

      {/* Emoji Picker */}
      <EmojiPicker
        isOpen={showEmojiPicker}
        onClose={() => setShowEmojiPicker(false)}
        onEmojiSelect={handleEmojiSelect}
        triggerRef={emojiButtonRef}
      />

      {/* Comments list*/}
      {loading ? (
        <div className="flex justify-center py-4 sm:py-6">
          <div
            className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-2 border-t-transparent"
            style={{ borderColor: "var(--color-muted-foreground, #64748b)" }}
          ></div>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
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
                      {getInitials(comment.authorId.firstName, comment.authorId.lastName)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm">
                  <span
                    className="font-medium mr-2"
                    style={{ color: "var(--color-card-foreground, #0f172a)" }}
                  >
                    {getFullName(comment.authorId.firstName, comment.authorId.lastName)}
                  </span>
                  <span
                    className="mr-2"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    @{comment.authorId.username}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    · {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p
                  className="mt-1 text-xs sm:text-sm break-words"
                  style={{ color: "var(--color-card-foreground, #0f172a)" }}
                >
                  {comment.text}
                </p>
                
                {/* Comment Actions */}
                <div className="flex items-center space-x-1 mt-1">
                  {/* Like Button */}
                  <button
                    onClick={() => handleCommentLike(comment._id)}
                    disabled={!isAuthenticated || likingComments.has(comment._id)}
                    className={`flex items-center space-x-1 px-2 py-1 rounded transition-all duration-200 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 ${
                      comment.liked ? "text-red-600" : ""
                    }`}
                    style={{
                      color: comment.liked
                        ? "var(--color-destructive, #ef4444)"
                        : "var(--color-muted-foreground, #64748b)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!comment.liked) {
                        e.currentTarget.style.color = "var(--color-destructive, #ef4444)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!comment.liked) {
                        e.currentTarget.style.color = "var(--color-muted-foreground, #64748b)";
                      }
                    }}
                  >
                    {likingComments.has(comment._id) ? (
                      <div
                        className="animate-spin rounded-full h-3 w-3 border border-t-transparent"
                        style={{ borderColor: "currentColor" }}
                      ></div>
                    ) : (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill={comment.liked ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    )}
                    {comment.likeCount > 0 && (
                      <span className="text-xs">{comment.likeCount}</span>
                    )}
                  </button>

                  {/* Delete Button (only for comment author) */}
                  {user?._id === comment.authorId._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900/20"
                      style={{ color: "var(--color-muted-foreground, #64748b)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--color-destructive, #ef4444)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-muted-foreground, #64748b)";
                      }}
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {comments.length === 0 && (
            <p
              className="text-center text-sm py-4 sm:py-6"
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