"use client";

import React, { useState, useEffect } from 'react';
import { Comment } from '@/types/post.types';
import { apiClient } from '@/utils/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

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
            className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-xs sm:text-sm placeholder-gray-500 dark:placeholder-gray-400 py-2 sm:py-1"
            style={{ color: "var(--color-card-foreground, #0f172a)" }}
            maxLength={200}
          />
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
                
                {/* Action buttons */}
                <div className="flex items-center space-x-1 mt-1">
                  <span
                    className="text-xs px-1 py-0.5"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    {formatDate(comment.createdAt)}
                  </span>
                  <span
                    className="text-xs px-1 py-0.5"
                    style={{ color: "var(--color-muted-foreground, #64748b)" }}
                  >
                    @{comment.authorId.username}
                  </span>
                  
                  {/* Like button */}
                  <button
                    onClick={() => handleCommentLike(comment._id)}
                    disabled={!isAuthenticated || likingComments.has(comment._id)}
                    className={`flex items-center space-x-1 px-2 py-1.5 sm:px-1 sm:py-0.5 rounded-md transition-all duration-200 ${
                      isAuthenticated 
                        ? 'hover:scale-105 active:scale-95' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    style={{ 
                      minHeight: '32px',
                      minWidth: '32px'
                    }}
                    onMouseEnter={(e) => {
                      if (isAuthenticated) {
                        e.currentTarget.style.backgroundColor = 'var(--color-secondary, #f1f5f9)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <svg 
                      className={`w-5 h-5 sm:w-4 sm:h-4 transition-colors duration-200 ${
                        comment.liked ? 'text-red-500 fill-current' : ''
                      }`}
                      fill={comment.liked ? 'currentColor' : 'none'}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ 
                        color: comment.liked ? '#ef4444' : 'var(--color-muted-foreground, #64748b)',
                        strokeWidth: comment.liked ? 0 : 2
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {comment.likeCount > 0 && (
                      <span
                        className="text-xs font-semibold"
                        style={{ 
                          color: comment.liked ? '#ef4444' : 'var(--color-muted-foreground, #64748b)'
                        }}
                      >
                        {comment.likeCount}
                      </span>
                    )}
                    {likingComments.has(comment._id) && (
                      <div 
                        className="animate-spin rounded-full h-2 w-2 border border-t-transparent ml-1"
                        style={{ borderColor: 'var(--color-muted-foreground, #64748b)' }}
                      ></div>
                    )}
                  </button>

                  {/* Reply button */}
                  <button
                    className="text-xs font-semibold px-2 py-1.5 sm:px-1 sm:py-0.5 rounded-md transition-all duration-200 active:scale-95"
                    style={{ 
                      color: "var(--color-muted-foreground, #64748b)",
                      minHeight: '32px',
                      minWidth: '40px'
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
                    Reply
                  </button>

                  {/* Delete button (only for comment author) */}
                  {user?._id === comment.authorId._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs font-semibold px-2 py-1.5 sm:px-1 sm:py-0.5 rounded-md opacity-70 group-hover:opacity-100 transition-all duration-200 active:scale-95"
                      style={{
                        color: "var(--color-muted-foreground, #64748b)",
                        minHeight: '32px',
                        minWidth: '40px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.color = 'var(--color-destructive, #ef4444)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--color-muted-foreground, #64748b)';
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